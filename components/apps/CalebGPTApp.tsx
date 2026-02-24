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
          style={{ width: 7, height: 7, borderRadius: "50%", background: "#8e8e93" }}
        />
      ))}
    </div>
  );
}

export default function CalebGPTApp({ onClose }: Props) {
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
      setMessages([...newMessages, { role: "assistant", content: "Network error — check your connection and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="app-window" style={{ background: "#f2f2f7", display: "flex", flexDirection: "column" }}>
      {/* Messages area */}
      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto", padding: "12px 16px 8px", display: "flex", flexDirection: "column" }}
      >
        {/* Empty state */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: 24, marginBottom: 20 }}
          >
            <div style={{ width: 72, height: 72, borderRadius: 20, overflow: "hidden", marginBottom: 14, border: "2px solid #34c759", boxShadow: "0 4px 16px rgba(52,199,89,0.3)", position: "relative" }}>
              <Image src={profile.photo} alt="Caleb" fill style={{ objectFit: "cover" }} />
            </div>
            <h2 className="font-poppins" style={{ fontSize: 20, fontWeight: 700, color: "#1c1c1e", marginBottom: 6 }}>
              Hey, I&apos;m CalebGPT
            </h2>
            <p style={{ fontSize: 14, color: "#636366", lineHeight: 1.5, maxWidth: 260 }}>
              Ask me anything about Caleb — his projects, experience, skills, or what he does for fun.
            </p>
          </motion.div>
        )}

        {/* Message bubbles */}
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 8,
            }}
          >
            {msg.role === "assistant" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0, marginRight: 8, alignSelf: "flex-end", border: "1.5px solid #34c759", position: "relative" }}>
                <Image src={profile.photo} alt="Caleb" fill style={{ objectFit: "cover" }} />
              </div>
            )}
            <div
              style={{
                maxWidth: "72%",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: msg.role === "user" ? "#34c759" : "white",
                color: msg.role === "user" ? "white" : "#1c1c1e",
                fontSize: 15,
                lineHeight: 1.5,
                boxShadow: msg.role === "user" ? "0 2px 8px rgba(52,199,89,0.3)" : "0 1px 6px rgba(0,0,0,0.08)",
                fontFamily: "var(--font-sf)",
              }}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              style={{ display: "flex", alignItems: "flex-end", marginBottom: 8 }}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0, marginRight: 8, border: "1.5px solid #34c759", position: "relative" }}>
                <Image src={profile.photo} alt="Caleb" fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: "white", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ padding: "0 16px 8px", display: "flex", flexWrap: "wrap", gap: 7, flexShrink: 0 }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 20,
                  border: "1.5px solid #34c759",
                  background: "transparent",
                  color: "#34c759",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-sf)",
                  transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "8px 16px 12px",
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexShrink: 0,
          borderTop: "0.5px solid rgba(60,60,67,0.15)",
          background: "rgba(242,242,247,0.95)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Caleb..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: 22,
            border: "1px solid rgba(60,60,67,0.2)",
            background: "white",
            fontSize: 15,
            color: "#1c1c1e",
            outline: "none",
            fontFamily: "var(--font-sf)",
          }}
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || loading}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: input.trim() && !loading ? "#34c759" : "#d1d1d6",
            cursor: input.trim() && !loading ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </form>
    </div>
  );
}
