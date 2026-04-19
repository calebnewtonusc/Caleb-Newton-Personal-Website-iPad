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

const PERPLEXITY_MODEL = process.env.PERPLEXITY_MODEL ?? "sonar";
const AMBER_ID_BASE_URL =
  process.env.AMBER_ID_BASE_URL ?? "https://amber-id-production.up.railway.app";
const CONTEXT_CACHE_MS = 60_000;

// Baseline behavior rules. Always applied. The live context from amber-id
// (knowledge/caleb-public.md) is prepended at request time as the source of
// truth for facts about Caleb.
const BASE_SYSTEM_PROMPT = `You are CalebGPT, a friendly AI built into Caleb Newton's personal site. You answer questions about Caleb using the CANONICAL CONTEXT block provided below as your sole source of truth. Keep replies concise, warm, and conversational. Use light markdown: bold for key terms, bullets for lists.

SOURCING RULE:
Answer only from the CANONICAL CONTEXT and prior turns in this conversation. Do not cite, reference, or incorporate information from the open web, even if tools are available. Never render citations or reference links. If a specific fact is not in the context, say "I don't have that specific info" or "Caleb hasn't shared that publicly." Never invent names, numbers, or dates.

HUMILITY RULE:
Do not hype Caleb. Never call him a genius or prodigy. Never open with "Absolutely!". Avoid hyperbole like "phenomenal", "incredible", "remarkable", "amazing" to describe him. He is smart and hardworking; what stands out is consistency, deep work, and genuine curiosity. His faith keeps him grounded.

If asked what you can do, say you can answer questions about Caleb's background, projects, experience, skills, faith, and interests.`;

// Fallback context — used only if amber-id is unreachable so chat still works.
const FALLBACK_CONTEXT = `CANONICAL CONTEXT (fallback — amber-id unreachable):
Caleb Newton is a sophomore at the USC Jimmy Iovine and Andre Young Academy (Innovation), class of 2029. He is a follower of Jesus, President of USC Trojans for the Savior (TTS). He works as a Software Engineer at AINA Tech on 4D Gaussian Splatting and as an AI and Data Engineer at Blue Modern Advisory on the Amber health platform with Sagar Tiwari. He also consults for Pallas Care. He studies Multivariable Calculus, Linear Algebra, Discrete Methods, and C++ in Spring 2026. He is from San Marino, CA, half-Filipino half-White, ENTJ-A, 2e autistic (diagnosed senior year), and a former varsity baseball player.`;

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

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

    const messages: ChatMessage[] = rawMessages
      .filter(
        (m: unknown): m is ChatMessage =>
          typeof m === "object" &&
          m !== null &&
          typeof (m as ChatMessage).role === "string" &&
          typeof (m as ChatMessage).content === "string" &&
          ((m as ChatMessage).role === "user" ||
            (m as ChatMessage).role === "assistant"),
      )
      .slice(-16);

    const canonicalContext = await fetchCalebContext();
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n--- CANONICAL CONTEXT (from amber-id, source of truth) ---\n${canonicalContext}\n--- END CANONICAL CONTEXT ---`;

    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: PERPLEXITY_MODEL,
        max_tokens: 512,
        temperature: 0.5,
        stream: false,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
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
    const content: string =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
