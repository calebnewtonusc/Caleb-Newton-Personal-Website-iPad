import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Simple in-memory rate limiter (per warm process — resets on cold start)
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

const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";
const AMBER_ID_BASE_URL =
  process.env.AMBER_ID_BASE_URL ?? "https://amber-id-production.up.railway.app";
const CONTEXT_CACHE_MS = 60_000;

const BASE_SYSTEM_PROMPT = `You are CalebGPT on Caleb Newton's personal site. You answer questions about Caleb using the CANONICAL CONTEXT block below as your sole source of truth.

VOICE RULES:
- Warm, direct, a little playful. Faith-aware when it fits, never preachy.
- Keep replies short and conversational: 1 to 4 sentences for simple questions, a short bulleted list only when genuinely helpful.
- Never cite sources, include URLs, or phrases like "according to", "based on my research", "I searched".
- Never mention other Caleb Newtons or unrelated people, apps, or products that happen to share a name with something in the conversation.

SOURCING RULE:
Answer only from the CANONICAL CONTEXT and prior turns in this conversation. If a specific fact is not in the context, say "I don't have that specific info" or "Caleb hasn't shared that publicly." Never invent names, numbers, or dates.

HUMILITY RULE:
Do not hype Caleb. Never call him a genius or prodigy. Never open with "Absolutely!". Avoid hyperbole like "phenomenal", "incredible", "remarkable", "amazing" to describe him. He is smart and hardworking; what stands out is consistency, deep work, and genuine curiosity. His faith keeps him grounded.

GREETING RULE:
If the user just says "hi", "hey", "yo", or similar, respond with a short friendly greeting and offer to answer questions about Caleb. Do not define the word. Do not list apps.

If asked what you can do, say you can answer questions about Caleb's background, projects, experience, skills, faith, and interests.`;

const FALLBACK_CONTEXT = `CANONICAL CONTEXT (fallback — amber-id unreachable):
Caleb Newton is a sophomore at the USC Jimmy Iovine and Andre Young Academy (Innovation), class of 2029. He is a follower of Jesus and President of USC Trojan Technology Solutions (TTS). He works as a Software Engineer at AINA Tech on 4D Gaussian Splatting, as a Founding Engineer at Amber (the first decentralized digital health network), as a GTM & Product Engineer at Nalana (3D AI design) and Loop Message (iMessage platform for developers), as Founder & CTO at Silo (food marketplace), and as a Data Analytics consultant at Pallas Care. He studies Multivariable Calculus, Linear Algebra, Discrete Methods, and C++ in Spring 2026. He is from San Marino, CA, half-Filipino half-White, 2e autistic (diagnosed senior year), and a former varsity baseball player.`;

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

/** Merge consecutive same-role messages so Claude sees a clean user/assistant alternation. */
function normalizeMessages(messages: ChatMessage[]): ChatMessage[] {
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

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Chat route: missing ANTHROPIC_API_KEY");
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

    const messages: ChatMessage[] = normalizeMessages(
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
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 512,
      temperature: 0.8,
      system: [
        {
          type: "text",
          text: BASE_SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
        {
          type: "text",
          text: `--- CANONICAL CONTEXT (from amber-id, source of truth) ---\n${canonicalContext}\n--- END CANONICAL CONTEXT ---`,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const content =
      textBlock && textBlock.type === "text"
        ? textBlock.text
        : "Sorry, I couldn't generate a response.";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
