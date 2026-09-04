"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Caleb's whole thesis is that software should not farm your attention.
   So his own site keeps track of how long it has held yours, and says so. */
const NOTICES = [
  {
    at: 180,
    title: "Screen Time",
    body: "You have been on this iPad for three minutes. That is already longer than most people spend on a portfolio. No notes, just saying.",
  },
  {
    at: 420,
    title: "Screen Time",
    body: "Seven minutes. I built this whole thing to argue that software should give something back, so I would feel strange letting it hold you all night.",
  },
  {
    at: 780,
    title: "Screen Time",
    body: "Thirteen minutes. Genuinely, thank you for reading. Now go make the thing you have been putting off. My email is in Mail if you want to tell me about it.",
  },
];

export default function ScreenTimeNotice({ active }: { active: boolean }) {
  const [current, setCurrent] = useState<(typeof NOTICES)[number] | null>(null);

  const startedRef = useRef<number | null>(null);
  const shownRef = useRef<number[]>([]);

  useEffect(() => {
    if (!active) return;
    // The clock starts once. Keeping it in state restarted it after every
    // notice, so the later ones would have fired late by the whole delay.
    if (startedRef.current === null) startedRef.current = Date.now();
    const id = setInterval(() => {
      const secs = (Date.now() - (startedRef.current as number)) / 1000;
      const next = NOTICES.find(
        (n) => secs >= n.at && !shownRef.current.includes(n.at),
      );
      if (next) {
        shownRef.current = [...shownRef.current, next.at];
        setCurrent(next);
        setTimeout(() => setCurrent(null), 11000);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.at}
          initial={{ y: -90, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -90, opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          onClick={() => setCurrent(null)}
          role="status"
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(74%, 420px)",
            zIndex: 240,
            cursor: "pointer",
            borderRadius: 20,
            padding: "12px 15px",
            background: "rgba(245,245,247,0.78)",
            backdropFilter: "blur(28px) saturate(1.6)",
            WebkitBackdropFilter: "blur(28px) saturate(1.6)",
            boxShadow: "0 14px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
            <span
              aria-hidden="true"
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "linear-gradient(145deg,#5E5CE6,#3634A3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.2" stroke="white" strokeWidth="1.6" />
                <path d="M8 4.6V8l2.2 1.4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#3a3a3c",
                letterSpacing: 0.2,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {current.title}
            </span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#8e8e93", fontFamily: "-apple-system, sans-serif" }}>
              now
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.45,
              color: "#1c1c1e",
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {current.body}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
