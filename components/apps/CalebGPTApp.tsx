"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What are you working on?",
  "Tell me about your projects",
  "What's your tech stack?",
  "What do you do for fun?",
  "How can I contact you?",
  "What are your career goals?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#8e8e93" }}
        />
      ))}
    </div>
  );
}

export default function CalebGPTApp({ onClose: _onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setShowSuggestions(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply = data.content ?? data.error ?? "Something went wrong.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Network error - check your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="app-window" style={{ background: "white", display: "flex", flexDirection: "column" }}>

      {/* ── Header ── */}
      <div style={{
        padding: "12px 16px 10px",
        borderBottom: "0.5px solid rgba(0,0,0,0.09)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, background: "white",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
            CalebGPT
          </span>
          <span style={{
            fontSize: 11, background: "#f2f2f7", borderRadius: 6,
            padding: "2px 7px", color: "#636366", fontWeight: 500,
            fontFamily: "-apple-system, sans-serif",
          }}>
            4o
          </span>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column" }}
      >
        {/* Empty state */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: 28, marginBottom: 12 }}
          >
            <div style={{ width: 60, height: 60, borderRadius: 30, overflow: "hidden", marginBottom: 14, border: "2px solid #10a37f", position: "relative" }}>
              <Image src={profile.photo} alt="Caleb" fill style={{ objectFit: "cover" }} />
            </div>
            <h2 style={{ fontSize: 19, fontWeight: 600, color: "#1c1c1e", marginBottom: 6, fontFamily: "-apple-system, sans-serif" }}>
              What do you want to know about Caleb?
            </h2>
            <p style={{ fontSize: 13, color: "#8e8e93", fontFamily: "-apple-system, sans-serif", lineHeight: 1.5, maxWidth: 240 }}>
              Ask about his projects, experience, goals, or what he does for fun.
            </p>
          </motion.div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            style={{ marginBottom: 18 }}
          >
            {msg.role === "user" ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  maxWidth: "75%", background: "#f2f2f7",
                  borderRadius: "20px 20px 4px 20px",
                  padding: "10px 14px", fontSize: 15, color: "#1c1c1e",
                  lineHeight: 1.55, fontFamily: "-apple-system, sans-serif",
                }}>
                  {msg.content}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 14, overflow: "hidden", flexShrink: 0, border: "1.5px solid #10a37f", position: "relative" }}>
                  <Image src={profile.photo} alt="Caleb" fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{
                  flex: 1, fontSize: 15, color: "#1c1c1e", lineHeight: 1.65,
                  fontFamily: "-apple-system, sans-serif", paddingTop: 3,
                }}>
                  {msg.content}
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 14, overflow: "hidden", flexShrink: 0, border: "1.5px solid #10a37f", position: "relative" }}>
                <Image src={profile.photo} alt="Caleb" fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "10px 14px", borderRadius: "4px 18px 18px 18px", background: "#f2f2f7", display: "inline-block" }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Suggestions ── */}
      <AnimatePresence>
        {showSuggestions && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ padding: "0 16px 8px", display: "flex", overflowX: "auto", gap: 8, flexShrink: 0 }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  flexShrink: 0, padding: "8px 14px", borderRadius: 20,
                  border: "1px solid rgba(0,0,0,0.1)", background: "white",
                  color: "#1c1c1e", fontSize: 13, fontWeight: 500,
                  cursor: "pointer", fontFamily: "-apple-system, sans-serif",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)", whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input bar ── */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "8px 16px 12px", display: "flex", alignItems: "center",
          gap: 8, flexShrink: 0, borderTop: "0.5px solid rgba(0,0,0,0.08)", background: "white",
        }}
      >
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          background: "#f2f2f7", borderRadius: 26,
          padding: "0 6px 0 16px", border: "1px solid rgba(0,0,0,0.06)",
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message CalebGPT..."
            disabled={loading}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 15, color: "#1c1c1e", padding: "11px 0",
              fontFamily: "-apple-system, sans-serif",
            }}
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || loading}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 32, height: 32, borderRadius: "50%", border: "none",
              background: input.trim() && !loading ? "#1c1c1e" : "#e5e5ea",
              cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s", margin: "3px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5L11 6.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </form>
    </div>
  );
}
