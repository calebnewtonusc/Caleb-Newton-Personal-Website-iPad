"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, social } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

interface Email {
  id: string;
  from: string;
  fromShort: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
}

const INBOX: Email[] = [
  {
    id: "open",
    from: "Caleb Newton",
    fromShort: "CN",
    subject: "Open to opportunities -ML & Software",
    preview: "Hi! I'm actively looking for ML engineering, data engineering, and software internships...",
    body: `Hi there,

I'm Caleb Newton -a CS + Applied Mathematics freshman at USC, currently building at the intersection of machine learning and real-world systems.

I'm actively looking for internships and research positions in:
• Machine Learning Engineering
• Data Engineering / Analytics
• Full-Stack Development (AI-focused)
• Computer Vision

Current work: Holographic video processing at AINA Tech (4D Gaussian Splatting), and KTP client projects in data analytics and AI strategy.

Feel free to reach out -I respond to everything.`,
    time: "Now",
    unread: true,
  },
  {
    id: "projects",
    from: "Caleb Newton",
    fromShort: "CN",
    subject: "Let's build something together",
    preview: "I've shipped production ML systems, full-stack apps, and data pipelines...",
    body: `What I've built:

ModelLab -ML experiment tracking platform with dataset versioning and reproducibility exports. Production-grade Python EvalHarness computing ROC-AUC, PR-AUC, calibration metrics.

Food Vision -97.20% accurate food classifier using EfficientNetB2 + PyTorch. 29.65MB weights with FastAPI + React frontend.

16 Tech Personalities -Rule-based career matching platform. 40-question quiz, 16 personality types, 42 tech role matches. 100% test accuracy.

NBA Prediction -72.3% accuracy across 6 trained models. Real-time dashboard, 2,788+ games, 200+ players.

LA Healthcare Access -Geospatial analytics across 2,498 census tracts. Identified $645M investment opportunity.

Everything I build is production-quality, documented, and deployed.`,
    time: "Today",
    unread: false,
  },
  {
    id: "faith",
    from: "Caleb Newton",
    fromShort: "CN",
    subject: "What drives me",
    preview: "I'm a follower of Jesus, and that shapes everything about how I work and build...",
    body: `A bit about what drives me:

I'm a follower of Jesus, and that's not a side note -it's the core of how I approach my work. I believe technology is most powerful when it serves people, not the other way around.

I co-founded the SGV Christian Club Collective in high school -uniting 15+ campus ministries across the San Gabriel Valley. I know what it means to build something from nothing and lead with integrity.

At USC, I'm involved with ACTS2 Fellowship, KTP, and several other communities. I care about IRL connection over metrics, quality over speed, and building things that actually matter.

If you're building something meaningful and think I could help, I'd genuinely love to talk.`,
    time: "Yesterday",
    unread: false,
  },
];

const SOCIALS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, color: "#007AFF" },
  { label: "LinkedIn", value: "caleb-newton-3680041a5", href: social.linkedin, color: "#0A66C2" },
  { label: "GitHub", value: "calebnewtonusc", href: social.github, color: "#1c1c1e" },
  { label: "YouTube", value: "@caleebnewtown", href: social.youtube, color: "#FF0000" },
  { label: "X (Twitter)", value: "@klubnootuhn", href: social.x, color: "#000000" },
  { label: "Letterboxd", value: "cnewt", href: social.letterboxd, color: "#FF8000" },
];

type Folder = "inbox" | "reach-out";

function MailboxIcon({ name, color }: { name: string; color: string }) {
  return (
    <div style={{ width: 32, height: 32, borderRadius: 8, background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {name === "inbox" && (
        <svg width="17" height="14" viewBox="0 0 17 14" fill="none">
          <rect x="0.75" y="0.75" width="15.5" height="12.5" rx="1.75" stroke="white" strokeWidth="1.4"/>
          <path d="M0.75 8.5h4l1.5 2.5h4.5l1.5-2.5h4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )}
      {name === "reach-out" && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 2L9 7M14 2H10M14 2V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )}
      {name === "social" && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="5" r="2.5" stroke="white" strokeWidth="1.4"/>
          <circle cx="3" cy="12" r="1.75" stroke="white" strokeWidth="1.4"/>
          <circle cx="13" cy="12" r="1.75" stroke="white" strokeWidth="1.4"/>
          <path d="M5.5 6.5L3.5 10.5M10.5 6.5L12.5 10.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );
}

export default function ContactApp({ onClose: _onClose }: Props) {
  const [activeFolder, setActiveFolder] = useState<Folder>("inbox");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const isLandscape = false; // handled below via orientation prop

  return (
    <div className="app-window" style={{ background: "#f2f2f7", display: "flex", flexDirection: "row" }}>

      {/* ── Sidebar ── */}
      <AnimatePresence mode="wait" initial={false}>
        {(!selectedEmail) && (
          <motion.div
            key="sidebar"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "#f2f2f7",
            }}
          >
            {/* Header */}
            <div style={{ padding: "20px 16px 8px", background: "#f2f2f7" }}>
              <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif", letterSpacing: -0.5 }}>
                Mail
              </h1>
            </div>

            <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}>

              {/* Mailboxes section */}
              <p style={{ fontSize: 13, fontWeight: 500, color: "#6e6e73", letterSpacing: 0.3, marginBottom: 8, marginTop: 8, textTransform: "uppercase" }}>Mailboxes</p>

              <div style={{ background: "white", borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
                {[
                  { id: "inbox" as Folder, label: "Inbox", count: 1, color: "#007AFF" },
                  { id: "reach-out" as Folder, label: "Reach Out", count: 0, color: "#34C759" },
                ].map((folder, i) => (
                  <motion.div
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    whileTap={{ backgroundColor: "#ebebeb" }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px",
                      borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.18)" : "none",
                      cursor: "pointer",
                      background: activeFolder === folder.id ? "rgba(0,122,255,0.06)" : "white",
                    }}
                  >
                    <MailboxIcon name={folder.id} color={folder.color} />
                    <span style={{ fontSize: 17, color: "#1c1c1e", flex: 1, fontFamily: "-apple-system, sans-serif" }}>{folder.label}</span>
                    {folder.count > 0 && (
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#007AFF", fontFamily: "-apple-system, sans-serif" }}>{folder.count}</span>
                    )}
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                      <path d="M1 1l5 5L1 11" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                ))}
              </div>

              {/* Content for selected folder */}
              {activeFolder === "inbox" && (
                <>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#6e6e73", letterSpacing: 0.3, marginBottom: 8, marginTop: 16, textTransform: "uppercase" }}>Inbox</p>
                  <div style={{ background: "white", borderRadius: 10, overflow: "hidden" }}>
                    {INBOX.map((email, i) => (
                      <motion.div
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        whileTap={{ backgroundColor: "#ebebeb" }}
                        style={{
                          padding: "12px 16px",
                          borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.18)" : "none",
                          cursor: "pointer",
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                        }}
                      >
                        {/* Unread dot */}
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: email.unread ? "#007AFF" : "transparent", marginTop: 6, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontSize: 15, fontWeight: email.unread ? 700 : 400, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
                              {email.from}
                            </span>
                            <span style={{ fontSize: 12, color: "#8e8e93" }}>{email.time}</span>
                          </div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "#1c1c1e", marginBottom: 2, fontFamily: "-apple-system, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {email.subject}
                          </p>
                          <p style={{ fontSize: 13, color: "#8e8e93", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {email.preview}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {activeFolder === "reach-out" && (
                <>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#6e6e73", letterSpacing: 0.3, marginBottom: 8, marginTop: 16, textTransform: "uppercase" }}>Compose</p>
                  <ComposeForm />
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Email Detail ── */}
      <AnimatePresence>
        {selectedEmail && (
          <motion.div
            key="detail"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            style={{ position: "absolute", inset: 0, background: "white", display: "flex", flexDirection: "column" }}
          >
            {/* Nav bar */}
            <div style={{ padding: "14px 16px 8px", borderBottom: "0.5px solid rgba(60,60,67,0.15)", flexShrink: 0 }}>
              <button
                onClick={() => setSelectedEmail(null)}
                style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 16, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "-apple-system, sans-serif" }}
              >
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path d="M7 1L1 7l6 6" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Inbox
              </button>
            </div>

            <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 40px" }}>
              {/* Subject */}
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif", marginBottom: 12, letterSpacing: -0.3, lineHeight: 1.2 }}>
                {selectedEmail.subject}
              </h2>

              {/* From row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: "0.5px solid rgba(60,60,67,0.15)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>CN</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>Caleb Newton</p>
                  <p style={{ fontSize: 13, color: "#8e8e93" }}>To: You &lt;visitor@caleb.me&gt;</p>
                </div>
                <span style={{ fontSize: 12, color: "#8e8e93" }}>{selectedEmail.time}</span>
              </div>

              {/* Body */}
              <div style={{ fontSize: 16, lineHeight: 1.75, color: "#1c1c1e", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", whiteSpace: "pre-wrap" }}>
                {selectedEmail.body}
              </div>

              {/* Reply CTA */}
              <div style={{ marginTop: 32 }}>
                <a
                  href={`mailto:${profile.email}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#007AFF", color: "white", borderRadius: 12,
                    padding: "12px 20px", fontSize: 15, fontWeight: 600,
                    textDecoration: "none", fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <rect x="0.75" y="0.75" width="14.5" height="10.5" rx="2" stroke="white" strokeWidth="1.3"/>
                    <path d="M1 2L8 7L15 2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Reply to Caleb
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ComposeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Hi Caleb,\n\n${message}\n\nFrom: ${name} (${email})`);
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background: "white", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ padding: "12px 16px", borderBottom: "0.5px solid rgba(60,60,67,0.15)" }}>
          <div style={{ fontSize: 12, color: "#8e8e93", marginBottom: 4 }}>FROM</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#1c1c1e", background: "transparent", fontFamily: "var(--font-sf)" }}
          />
        </div>
        <div style={{ padding: "12px 16px", borderBottom: "0.5px solid rgba(60,60,67,0.15)" }}>
          <div style={{ fontSize: 12, color: "#8e8e93", marginBottom: 4 }}>REPLY TO</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#1c1c1e", background: "transparent", fontFamily: "var(--font-sf)" }}
          />
        </div>
        <div style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: "#8e8e93", marginBottom: 4 }}>MESSAGE</div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Caleb, I wanted to reach out about..."
            required
            rows={4}
            style={{ width: "100%", border: "none", outline: "none", fontSize: 16, color: "#1c1c1e", background: "transparent", fontFamily: "var(--font-sf)", resize: "none", lineHeight: 1.5 }}
          />
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        type="submit"
        style={{
          width: "100%", background: sent ? "#34c759" : "#007aff", color: "white",
          borderRadius: 10, padding: "14px", fontSize: 17, fontWeight: 600,
          border: "none", cursor: "pointer", fontFamily: "var(--font-sf)",
          transition: "background 0.3s",
        }}
      >
        {sent ? "Sent!" : "Send"}
      </motion.button>
    </form>
  );
}
