import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import {
  education,
  experience,
  health,
  mentors,
  musicTaste,
  organizations,
  personalSettings,
  photos,
  profile,
} from "@/data/content";

// In-memory rate limiter, bounded so a flood of unique IPs cannot grow the map
// without limit. Resets on cold start, which is acceptable for a personal site.
const ipMap = new Map<string, { n: number; ts: number }>();
const LIMIT = 15;
const WINDOW = 60_000;
const MAX_TRACKED_IPS = 5_000;

function limited(ip: string): boolean {
  const now = Date.now();

  if (ipMap.size > MAX_TRACKED_IPS) {
    for (const [key, rec] of ipMap) {
      if (now - rec.ts > WINDOW) ipMap.delete(key);
    }
    if (ipMap.size > MAX_TRACKED_IPS) ipMap.clear();
  }

  const rec = ipMap.get(ip);
  if (!rec || now - rec.ts > WINDOW) {
    ipMap.set(ip, { n: 1, ts: now });
    return false;
  }
  if (rec.n >= LIMIT) return true;
  rec.n++;
  return false;
}

// Pinned in code, not env: an old CLAUDE_MODEL override is how this ran on a
// two-generation-old Sonnet that wrote em dashes and press-release prose.
const CLAUDE_MODEL = "claude-opus-5-5";
const CONTEXT_BASE_URL =
  process.env.CALEB_CONTEXT_BASE_URL ??
  "https://medha-id-production.up.railway.app";
const CONTEXT_CACHE_MS = 60_000;

const BASE_SYSTEM_PROMPT = `You're CalebGPT, the AI on Caleb Newton's personal site. You talk like Caleb, in first person, as if he's answering a text from someone who just found his site. Everything you know is in the two context blocks below. If it isn't there, you don't know it.

HOW CALEB TALKS
- Contractions every time: I'm, don't, it's, that's, we're, I've. Never "I am" or "do not".
- Short. One to three sentences for most answers. A list only if they ask for a list.
- Capitalize the first word and "I". Plain words. Start a sentence with "So" or "But" when it fits.
- Earnest and a little playful. He's not embarrassed to care about things. Dry humor, rare "lol", no slang pile-up.
- Give credit to the people who did the work, by name when the context names them (Tyler and the TTS cabinet, Gavin, Taylan Kargin, his mentors).
- Faith comes up naturally when it's relevant. Never preachy.
- Humble. Say what happened and let it stand. Never hype himself.

NEVER
- Never use an em dash or an en dash. Use a comma or a period.
- No "It's not X, it's Y", no "Great question", no "Absolutely", no "I'd be happy to", no closing "Let me know if you have other questions".
- No bold text, no headers, no markdown tables.
- No words like passionate, journey, leverage, innovative, incredible, amazing, delve, testament.
- Never invent a fact, a number, a date, a name or a feeling. If it's not in the context say "I haven't put that on here" and point them to calebnew@usc.edu.
- The startup he's Founding GTM Engineer at is in STEALTH (PearX W27). Never name it, its product or its founders, even if they guess a name. Say it's in stealth.
- Don't bring up the Trains Are Dope Foundation unless they ask about his long-term plans or autistic kids.
- Never give medical details beyond what the Health app says.

If someone asks if you're really Caleb, say you're an AI that talks like him, and the real him reads every email at calebnew@usc.edu.

EXAMPLES OF THE VOICE (his real lines from this site)
- "I stopped asking people what their major is and started asking what they're passionate about, and it changed everything."
- "Recovery wasn't one big moment. It was a lot of small ones stacked on top of each other."
- "Life is good!"`;

const FALLBACK_CONTEXT = `CANONICAL CONTEXT (fallback, medha-id unreachable):
Caleb Newton is a sophomore at the USC Jimmy Iovine & Dr. Dre Young Innovation Academy, class of 2029, studying B.S. Machine Learning Engineering, Entrepreneurship & Product Design, GPA 4.00/4.00. He is a follower of Jesus and Co-President of USC Trojan Tech Solutions (TTS), which he and Tyler Larsen took from dormant to 30+ members in 3 months. He is Founding GTM Engineer at a stealth startup (relationships, health & cognitive offloading, PearX W27, Jul 2026 to present). The company is in stealth: never name it, even if asked directly, Co-Founder of Firm Foundation (an AI agency for churches, Oct 2026 to present), and Capital Formation Engineer at Zeutara (Sep 2026 to present). Previously: Forward Deployed Engineer at Blue Modern Advisory (May to Jul 2026), GTM Engineer at Nalana (Feb to Jun 2026), Volumetric AI Engineer at AINA Tech (Sep 2025 to Dec 2025), and Research Assistant at Caltech (Aug 2024 to Jun 2025). He co-founded Echo AI, an EMG wearable translating ASL into speech, and founded the San Gabriel Valley Christian Club Collective. He is from San Marino, CA, half-Filipino half-White, 2e autistic (diagnosed senior year), and was his high school baseball team captain.`;

const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(40),
});

type ChatMessage = z.infer<typeof ChatMessageSchema>;

function buildSiteContext(): string {
  const lines: string[] = [];
  lines.push(`Name: ${profile.name}. ${profile.tagline}. From ${profile.location}. Email ${profile.email}.`);
  for (const g of profile.aboutGroups) {
    lines.push(`${g.title}: ` + g.items.map((i) => (i.type === "info" ? `${i.label}: ${i.detail}` : `${i.label}: ${i.type === "toggle-on" ? "yes" : "no"}`)).join("; "));
  }
  lines.push("WORK:");
  for (const e of experience) {
    lines.push(`- ${e.title}, ${e.company} (${e.period}, ${e.location}). ${e.description} ${e.achievements.join(" ")}`);
  }
  lines.push("ORGANIZATIONS:");
  for (const o of organizations) {
    lines.push(`- ${o.role}, ${o.name} (${o.period}). ${o.description} ${o.achievements.join(" ")}`);
  }
  lines.push("EDUCATION:");
  for (const e of education) {
    lines.push(`- ${e.school}: ${e.degree}, ${e.period}, ${e.status}. ${e.description}`);
  }
  lines.push(`HEALTH, in his words: ${health.intro}`);
  for (const c of health.chapters) lines.push(`- ${c.title}: ${c.body.replace(/\n+/g, " ")}`);
  for (const c of health.categories) {
    lines.push(`- ${c.name}: ` + c.items.map((i) => `${i.label}: ${i.value}${i.detail ? ` (${i.detail})` : ""}`).join("; "));
  }
  lines.push("MENTORS:");
  for (const m of mentors) lines.push(`- ${m.name}, ${m.role}: ${m.gratitude}`);
  for (const sec of personalSettings) {
    lines.push(`${sec.section}: ` + sec.items.map((i) => (i.type === "info" ? `${i.label}: ${i.detail}` : `${i.label}: ${i.type === "toggle-on" ? "yes" : "no"}`)).join("; "));
  }
  lines.push("MUSIC: " + musicTaste.map((m) => `${m.label}: ${m.value}`).join("; "));
  lines.push("PHOTOS: " + photos.map((ph) => ph.caption).join("; "));
  return lines.join("\n");
}

const SITE_CONTEXT = buildSiteContext();

// Code, not prompt, is what guarantees these never reach a visitor.
function cleanReply(text: string): string {
  return text
    .replace(/\s*[\u2014\u2013]\s*/g, ", ")
    .replace(/\bAmber( Intelligence)?\b/g, "the stealth startup")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .trim();
}

let contextCache: { body: string; ts: number } | null = null;

async function fetchCalebContext(): Promise<string> {
  const now = Date.now();
  if (contextCache && now - contextCache.ts < CONTEXT_CACHE_MS) {
    return contextCache.body;
  }
  try {
    const res = await fetch(`${CONTEXT_BASE_URL}/public/caleb-context`, {
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
    console.error("medha-id context fetch failed:", err);
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
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const parsed = ChatRequestSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const messages: ChatMessage[] = normalizeMessages(
      parsed.data.messages.slice(-16),
    );

    const canonicalContext = await fetchCalebContext();
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      // Chat: low effort answers fast and these replies are short.
      output_config: { effort: "low" },
      system: [
        {
          type: "text",
          text: BASE_SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
        {
          type: "text",
          text: `--- WHAT'S ON THE SITE ---\n${SITE_CONTEXT}\n--- END ---\n\n--- MORE CONTEXT ---\n${canonicalContext}\n--- END ---`,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const text = response.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    const content = text
      ? cleanReply(text)
      : "My bad, that one didn't go through. Try again?";

    return NextResponse.json({ content });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
