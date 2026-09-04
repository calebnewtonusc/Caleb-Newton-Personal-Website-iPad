"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, } from "@/data/content";

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
    subject: "The fastest way to reach me",
    preview:
      "calebnew@usc.edu. I read everything and I actually write back...",
    body: `Hi there,

The fastest way to reach me is calebnew@usc.edu. I read everything, and I write back, usually within a day or two.

If it is easier, the calendar app on this iPad books time with me directly.

You do not need to polish it before you send it.`,
    time: "Now",
    unread: true,
  },
];

export default function ContactApp({}: Props) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <div
      className="app-window"
      style={{ background: "var(--surface-sunken)", display: "flex", flexDirection: "row" }}
    >
      {/* ── Sidebar ── */}
      <AnimatePresence mode="wait" initial={false}>
        {!selectedEmail && (
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
              background: "var(--surface-sunken)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "20px 16px 8px", background: "var(--surface-sunken)" }}>
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "var(--label)",
                  fontFamily: "-apple-system, sans-serif",
                  letterSpacing: -0.5,
                }}
              >
                Mail
              </h1>
            </div>

            <div
              className="ios-scroll"
              style={{ flex: 1, overflowY: "auto", padding: "0 16px 32px" }}
            >
              {/* Inbox */}
              {(
                <>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--label-3)",
                      letterSpacing: 0.3,
                      marginBottom: 8,
                      marginTop: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    Inbox
                  </p>
                  <div
                    style={{
                      background: "var(--surface)",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    {INBOX.map((email, i) => (
                      <motion.div
                        key={email.id}
                        onClick={() => setSelectedEmail(email)}
                        whileTap={{ opacity: 0.55 }}
                        style={{
                          padding: "12px 16px",
                          borderTop:
                            i > 0 ? "0.5px solid var(--separator)" : "none",
                          cursor: "pointer",
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                        }}
                      >
                        {/* Unread dot */}
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: email.unread
                              ? "#007AFF"
                              : "transparent",
                            marginTop: 6,
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 3,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: email.unread ? 700 : 400,
                                color: "var(--label)",
                                fontFamily: "-apple-system, sans-serif",
                              }}
                            >
                              {email.from}
                            </span>
                            <span style={{ fontSize: 12, color: "var(--label-4)" }}>
                              {email.time}
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "var(--label)",
                              marginBottom: 2,
                              fontFamily: "-apple-system, sans-serif",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {email.subject}
                          </p>
                          <p
                            style={{
                              fontSize: 13,
                              color: "var(--label-4)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {email.preview}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {(
                <>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--label-3)",
                      letterSpacing: 0.3,
                      marginBottom: 8,
                      marginTop: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    Compose
                  </p>
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
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--surface)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Nav bar */}
            <div
              style={{
                padding: "14px 16px 8px",
                borderBottom: "0.5px solid var(--separator)",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setSelectedEmail(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "#007aff",
                  fontSize: 16,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "-apple-system, sans-serif",
                }}
              >
                <svg aria-hidden="true" width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path
                    d="M7 1L1 7l6 6"
                    stroke="#007aff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Inbox
              </button>
            </div>

            <div
              className="ios-scroll"
              style={{ flex: 1, overflowY: "auto", padding: "20px 20px 40px" }}
            >
              {/* Subject */}
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--label)",
                  fontFamily: "-apple-system, sans-serif",
                  marginBottom: 12,
                  letterSpacing: -0.3,
                  lineHeight: 1.2,
                }}
              >
                {selectedEmail.subject}
              </h2>

              {/* From row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                  paddingBottom: 16,
                  borderBottom: "0.5px solid var(--separator)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#007AFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{ fontSize: 16, fontWeight: 700, color: "var(--surface)" }}
                  >
                    CN
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--label)",
                      fontFamily: "-apple-system, sans-serif",
                    }}
                  >
                    Caleb Newton
                  </p>
                  <p style={{ fontSize: 13, color: "var(--label-4)" }}>
                    To: You &lt;visitor@caleb.me&gt;
                  </p>
                </div>
                <span style={{ fontSize: 12, color: "var(--label-4)" }}>
                  {selectedEmail.time}
                </span>
              </div>

              {/* Body */}
              <div
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "var(--label)",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedEmail.body}
              </div>

              {/* Reply CTA */}
              <div style={{ marginTop: 32 }}>
                <a
                  href={`mailto:${profile.email}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#007AFF",
                    color: "var(--surface)",
                    borderRadius: 12,
                    padding: "12px 20px",
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: "none",
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  <svg aria-hidden="true" width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <rect
                      x="0.75"
                      y="0.75"
                      width="14.5"
                      height="10.5"
                      rx="2"
                      stroke="white"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M1 2L8 7L15 2"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
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
    const body = encodeURIComponent(
      `Hi Caleb,\n\n${message}\n\nFrom: ${name} (${email})`,
    );
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          background: "var(--surface)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "0.5px solid var(--separator)",
          }}
        >
          <div style={{ fontSize: 12, color: "var(--label-4)", marginBottom: 4 }}>
            FROM
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "var(--label)",
              background: "transparent",
              fontFamily: "var(--font-sf)",
            }}
          />
        </div>
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "0.5px solid var(--separator)",
          }}
        >
          <div style={{ fontSize: 12, color: "var(--label-4)", marginBottom: 4 }}>
            REPLY TO
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "var(--label)",
              background: "transparent",
              fontFamily: "var(--font-sf)",
            }}
          />
        </div>
        <div style={{ padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: "var(--label-4)", marginBottom: 4 }}>
            MESSAGE
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Caleb, I wanted to reach out about..."
            required
            rows={4}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "var(--label)",
              background: "transparent",
              fontFamily: "var(--font-sf)",
              resize: "none",
              lineHeight: 1.5,
            }}
          />
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        type="submit"
        style={{
          width: "100%",
          background: sent ? "#34c759" : "#007aff",
          color: "var(--surface)",
          borderRadius: 10,
          padding: "14px",
          fontSize: 17,
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-sf)",
          transition: "background 0.3s",
        }}
      >
        {sent ? "Sent!" : "Send"}
      </motion.button>
    </form>
  );
}
