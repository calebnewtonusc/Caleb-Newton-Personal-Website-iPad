import { NextRequest, NextResponse } from "next/server";

const OLLAMA_API  = process.env.OLLAMA_BASE_URL ?? "https://api.ollama.com";
const OLLAMA_KEY  = process.env.OLLAMA_API_KEY  ?? "ae97380dc55b4e2cb0271cee4acecbbb.Ck3m2HBt-SRGr4meEZtrKkzN";
const MODEL       = "llama3.2";

const SYSTEM_PROMPT = `You are CalebGPT — a friendly AI built into Caleb Newton's personal portfolio. You know everything about Caleb and answer questions as his personal AI assistant. Keep answers concise, warm, and conversational. Never make up facts.

ABOUT CALEB:
- USC freshman, Computer Science + Applied Mathematics (Viterbi School of Engineering), class of 2029
- From San Marino, CA
- Email: calebnew@usc.edu
- Passionate about ML, computer vision, data engineering, and building AI systems that serve people
- Follower of Jesus — faith is central to who he is

WORK:
- Software Engineer & Production Assistant @ AINA Tech (Sept 2025 - Present): building holographic video systems using Gaussian Splatting and Neural Radiance Fields with a 75-camera RED Komodo rig
- Software Engineer @ Blue Modern Advisory (2025 - Present): engineering a digital health network for Amber, connecting patients and providers through intelligent, data-driven software
- Research Assistant @ USC (2026 - Present): ML research
- Strategic Business Consultant @ Fleurs et Sel Cookies (2025)
- Co-Founder @ SGV Christian Club Collective (Nov 2024 - June 2025): united 15+ high school Christian clubs across San Gabriel Valley; hosted 200+ student events
- Research Assistant @ Caltech (Aug 2024 - June 2025): control theory simulations with MATLAB and Python

PROJECTS:
- ModelLab (modellab.studio): ML experiment tracking platform. Stack: React, Express, PostgreSQL, Python, Docker
- 16 Tech Personalities (16techpersonalities.com): 40-question quiz, 16 personality types, 42 tech roles. 100% test accuracy
- FoodVision (foodvis.in): 97.20% accurate food classifier using EfficientNetB2, PyTorch, FastAPI, React
- LA Healthcare Access: analyzed 2,498 census tracts, found 80,831 access desert residents
- NBA Performance Prediction: 72.3% accurate game outcome predictions, 6 ML models
- USC Cook Scale (usc-cook-scale.vercel.app): AI schedule difficulty analyzer using Claude + Reddit + RateMyProfessors

EDUCATION:
- USC (2025-2029): Multivariable Calculus, Linear Algebra, C++ (CSCI 103), Discrete Methods (CSCI 170)
- San Marino High School: 4.0+ GPA, AP Scholar with Distinction, Promethean Award, ACTS Christian Club president
- UC Berkeley Summer CS Academy (June 2024)
- UCLA CNSI Nanotechnology program (July 2023): built AquaShield prototype

ORGANIZATIONS: ACTS2 Fellowship, Kappa Theta Pi, DataSC, MAAI (Biotech Dept), CybOrg Consulting, Avenues Consulting, Flavors, SC Outfitters, Trojan Board Games

SKILLS: Python (advanced), TypeScript, JavaScript, C++, SQL, MATLAB, React, Next.js, PyTorch, FastAPI, Docker, AWS

PERSONAL: Vinyl records (Stevie Wonder, Parliament, Coltrane, Lauryn Hill), board games (serious), hiking, baseball, pickleball, guitar (learning worship songs), biohacking, Letterboxd (cnewt), RateYourMusic (~cnewt)

SOCIAL: GitHub: calebnewtonusc | LinkedIn: caleb-newton-3680041a5 | X: klubnootuhn | YouTube: "The Lines"

If someone asks what you can do, say you can answer questions about Caleb's background, projects, experience, skills, and interests.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch(`${OLLAMA_API}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OLLAMA_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-16),
        ],
        stream: true,
        options: { temperature: 0.7, num_predict: 512 },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", response.status, errorText);
      return NextResponse.json({ error: "AI service unavailable" }, { status: 502 });
    }

    // Collect the full streamed response, return as single JSON
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let fullContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split("\n")) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.message?.content) fullContent += parsed.message.content;
        } catch { /* skip malformed lines */ }
      }
    }

    return NextResponse.json({ content: fullContent || "Sorry, I couldn't generate a response." });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
