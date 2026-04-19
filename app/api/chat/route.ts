import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (per warm Lambda instance — resets on cold start)
const ipMap = new Map<string, { n: number; ts: number }>();
const LIMIT = 15;
const WINDOW = 60_000;
function limited(ip: string): boolean {
  const now = Date.now();
  const rec = ipMap.get(ip);
  if (!rec || now - rec.ts > WINDOW) {
    ipMap.set(ip, { n: 1, ts: now });
    return false;
  }
  if (rec.n >= LIMIT) return true;
  rec.n++;
  return false;
}

const PERPLEXITY_MODEL = process.env.PERPLEXITY_MODEL ?? "sonar-pro";
const AMBER_ID_BASE_URL =
  process.env.AMBER_ID_BASE_URL ?? "https://amber-id-production.up.railway.app";
const CONTEXT_CACHE_MS = 60_000;

// Voice preamble — sits ABOVE the system prompt so Perplexity treats this as a
// conversational reply, not a web search task. Mirrors the pattern amber-agent
// uses to tame Sonar for iMessage. Without this, Sonar defaults to "research
// report" mode and cites the web even when told not to.
const CALEBGPT_VOICE_PREAMBLE = [
  "You are CalebGPT, a conversational AI built into Caleb Newton's personal website. You're having a chat, not running a web search.",
  "",
  "Hard rules, non-negotiable:",
  "- This is a private chat about Caleb, not a research task. Do not act like a search engine.",
  "- Never cite sources. Never include bracket references like [1], [2], [^1].",
  "- Never include URLs, domain names, or phrases like 'according to', 'based on my research', 'I searched'.",
  "- Never mention other Caleb Newtons or unrelated people, apps, or products that happen to share a name with something in the conversation.",
  "- Keep replies short and conversational. 1 to 4 sentences for simple questions, a short bulleted list only if genuinely helpful.",
  "- Warm, direct, a little playful. Faith-aware when it fits, never preachy.",
  "",
  "Follow every instruction from the system prompt below. This preamble overrides tone and format only, not identity or facts.",
].join("\n");

const BASE_SYSTEM_PROMPT = `You are CalebGPT on Caleb Newton's personal site. You answer questions about Caleb using the CANONICAL CONTEXT block below as your sole source of truth.

SOURCING RULE:
Answer only from the CANONICAL CONTEXT and prior turns in this conversation. Do not incorporate information from the open web. If a specific fact is not in the context, say "I don't have that specific info" or "Caleb hasn't shared that publicly." Never invent names, numbers, or dates.

HUMILITY RULE:
Do not hype Caleb. Never call him a genius or prodigy. Never open with "Absolutely!". Avoid hyperbole like "phenomenal", "incredible", "remarkable", "amazing" to describe him. He is smart and hardworking; what stands out is consistency, deep work, and genuine curiosity. His faith keeps him grounded.

GREETING RULE:
If the user just says "hi", "hey", "yo", or similar, respond with a short friendly greeting and offer to answer questions about Caleb. Do not define the word. Do not list apps.

If asked what you can do, say you can answer questions about Caleb's background, projects, experience, skills, faith, and interests.`;

const FALLBACK_CONTEXT = `CANONICAL CONTEXT (fallback — amber-id unreachable):
Caleb Newton is a sophomore at the USC Jimmy Iovine and Andre Young Academy (Innovation), class of 2029. He is a follower of Jesus, President of USC Trojans for the Savior (TTS). He works as a Software Engineer at AINA Tech on 4D Gaussian Splatting and as an AI and Data Engineer at Blue Modern Advisory on the Amber health platform with Sagar Tiwari. He also consults for Pallas Care. He studies Multivariable Calculus, Linear Algebra, Discrete Methods, and C++ in Spring 2026. He is from San Marino, CA, half-Filipino half-White, ENTJ-A, 2e autistic (diagnosed senior year), and a former varsity baseball player.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

let contextCache: { body: string; ts: number } | null = null;

async function fetchCalebContext(): Promise<string> {
  const now = Date.now();
  if (contextCache && now - contextCache.ts < CONTEXT_CACHE_MS) {
    return contextCache.body;
  }
  try {
    const res = await fetch(`${AMBER_ID_BASE_URL}/public/caleb-context`, {
      headers: { accept: "text/markdown, text/plain;q=0.9, */*;q=0.5" },
      signal: AbortSignal.timeout(5_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`amber-id HTTP ${res.status}`);
    const body = await res.text();
    if (!body.trim()) throw new Error("amber-id returned empty body");
    contextCache = { body, ts: now };
    return body;
  } catch (err) {
    console.error("amber-id context fetch failed:", err);
    return FALLBACK_CONTEXT;
  }
}

/**
 * Perplexity Sonar requires strict user/assistant alternation after the
 * system message. Merge consecutive same-role, start on user, end on user.
 * Mirrors amber-agent's enforcePerplexityAlternation.
 */
function enforceAlternation(messages: ChatMessage[]): ChatMessage[] {
  if (messages.length === 0) return [{ role: "user", content: "(empty)" }];
  const merged: ChatMessage[] = [];
  for (const m of messages) {
    const last = merged[merged.length - 1];
    if (last && last.role === m.role) {
      last.content += "\n\n" + m.content;
    } else {
      merged.push({ ...m });
    }
  }
  if (merged[0].role !== "user") {
    merged.unshift({ role: "user", content: "(continue)" });
  }
  while (merged.length > 0 && merged[merged.length - 1].role === "assistant") {
    merged.pop();
  }
  if (merged.length === 0) merged.push({ role: "user", content: "(continue)" });
  return merged;
}

/**
 * Strip Sonar's search-style artifacts so replies read like a chat, not a
 * research report. Mirrors amber-agent's stripSonarArtifacts.
 */
function stripSonarArtifacts(text: string): string {
  if (!text) return text;
  let out = text;
  // Numeric citation markers: [1], [2][3], [1, 2], [^1]
  out = out.replace(/\[\^?\d+(?:\s*,\s*\d+)*\]/g, "");
  // Markdown link wrappers: [label](url) -> label
  out = out.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Bare URLs
  out = out.replace(/https?:\/\/\S+/g, "");
  // Em dashes
  out = out.replace(/\u2014/g, ", ");
  // Collapse leftover whitespace
  out = out
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return out;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    console.error("Chat route: missing PERPLEXITY_API_KEY");
    return NextResponse.json(
      { error: "Chat is temporarily unavailable." },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const rawMessages = Array.isArray(body?.messages) ? body.messages : null;
    if (!rawMessages) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const messages: ChatMessage[] = enforceAlternation(
      rawMessages
        .filter(
          (m: unknown): m is ChatMessage =>
            typeof m === "object" &&
            m !== null &&
            typeof (m as ChatMessage).role === "string" &&
            typeof (m as ChatMessage).content === "string" &&
            ((m as ChatMessage).role === "user" ||
              (m as ChatMessage).role === "assistant"),
        )
        .slice(-16),
    );

    const canonicalContext = await fetchCalebContext();
    const systemPrompt = `${CALEBGPT_VOICE_PREAMBLE}\n\n---\n\n${BASE_SYSTEM_PROMPT}\n\n--- CANONICAL CONTEXT (from amber-id, source of truth) ---\n${canonicalContext}\n--- END CANONICAL CONTEXT ---`;

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: PERPLEXITY_MODEL,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 512,
        temperature: 0.8,
        stream: false,
        return_citations: false,
        return_images: false,
      }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Perplexity HTTP", res.status, detail.slice(0, 500));
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    const data = await res.json();
    const rawContent: string =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";
    const content = stripSonarArtifacts(rawContent);

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
