"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { health } from "@/data/content";

interface Props {
  orientation: string;
}

function IOSToggle({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 51,
        height: 31,
        borderRadius: 15.5,
        background: on ? "#34C759" : "#e5e5ea",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: on ? 22 : 2,
          width: 27,
          height: 27,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}

const groupLabel: React.CSSProperties = {
  fontSize: 13,
  color: "#6e6e73",
  fontFamily: "-apple-system, sans-serif",
  fontWeight: 500,
  letterSpacing: 0.3,
  marginBottom: 6,
  marginLeft: 16,
  marginTop: 24,
  textTransform: "uppercase",
};

const card: React.CSSProperties = {
  background: "white",
  borderRadius: 10,
  overflow: "hidden",
};

export default function HealthApp({ orientation }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const isLandscape = orientation === "landscape";
  const pad = isLandscape ? "20px 24px 40px" : "16px 16px 40px";

  const index = health.chapters.findIndex((c) => c.id === openId);
  const chapter = index >= 0 ? health.chapters[index] : null;
  const prev = index > 0 ? health.chapters[index - 1] : null;
  const next =
    index >= 0 && index < health.chapters.length - 1
      ? health.chapters[index + 1]
      : null;

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <AnimatePresence mode="wait" initial={false}>
        {!chapter ? (
          /* ─────────────── Summary ─────────────── */
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="ios-scroll"
            style={{ position: "absolute", inset: 0, overflowY: "auto", padding: pad }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg aria-hidden="true" width="26" height="24" viewBox="0 0 26 24" fill="none">
                <path
                  d="M13 22S1.8 15.2 1.8 8.1A5.6 5.6 0 0 1 13 5.4 5.6 5.6 0 0 1 24.2 8.1C24.2 15.2 13 22 13 22z"
                  fill="#FF2D55"
                />
              </svg>
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#1c1c1e",
                  fontFamily: "-apple-system, sans-serif",
                  letterSpacing: -0.5,
                }}
              >
                Health
              </h1>
            </div>

            <p
              style={{
                fontSize: 17,
                color: "#3a3a3c",
                lineHeight: 1.5,
                marginTop: 10,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {health.intro}
            </p>

            <p style={groupLabel}>Freshman year, in eight parts</p>
            <div style={card}>
              {health.chapters.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setOpenId(c.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 13,
                    width: "100%",
                    textAlign: "left",
                    padding: "13px 16px",
                    background: "none",
                    border: "none",
                    borderTop: i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.18)",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: c.color,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                      fontFamily: "-apple-system, sans-serif",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 17,
                          color: "#1c1c1e",
                          fontFamily: "-apple-system, sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {c.title}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: c.color,
                          fontFamily: "-apple-system, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {c.period}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#8e8e93",
                        marginTop: 3,
                        lineHeight: 1.35,
                        fontFamily: "-apple-system, sans-serif",
                      }}
                    >
                      {c.quote}
                    </p>
                  </div>
                  <svg aria-hidden="true" width="8" height="13" viewBox="0 0 7 12" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M1 1l5 5-5 5" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>

            {health.sections.map((section) => (
              <div key={section.section}>
                <p style={groupLabel}>{section.section}</p>
                <div style={card}>
                  {section.items.map((item, i) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 14,
                        padding: "11px 16px",
                        borderTop: i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.18)",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 16, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#8e8e93",
                            marginTop: 2,
                            lineHeight: 1.35,
                            fontFamily: "-apple-system, sans-serif",
                          }}
                        >
                          {item.detail}
                        </p>
                      </div>
                      <IOSToggle on={item.type === "toggle-on"} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          /* ─────────────── One chapter ─────────────── */
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.18 }}
            className="ios-scroll"
            style={{ position: "absolute", inset: 0, overflowY: "auto", padding: pad }}
          >
            <button
              onClick={() => setOpenId(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "none",
                border: "none",
                padding: 0,
                color: "#FF2D55",
                fontSize: 17,
                cursor: "pointer",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              <svg aria-hidden="true" width="9" height="15" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6l5 5" stroke="#FF2D55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Health
            </button>

            <p
              style={{
                fontSize: 13,
                color: chapter.color,
                fontWeight: 600,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                marginTop: 18,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {chapter.period}
            </p>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#1c1c1e",
                letterSpacing: -0.4,
                marginTop: 2,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {chapter.title}
            </h2>
            <div
              aria-hidden="true"
              style={{ width: 44, height: 3, borderRadius: 2, background: chapter.color, marginTop: 12 }}
            />

            <div style={{ ...card, padding: "16px 18px", marginTop: 18 }}>
              <p
                style={{
                  fontSize: 16,
                  color: "#3a3a3c",
                  lineHeight: 1.65,
                  whiteSpace: "pre-line",
                  fontFamily: "-apple-system, sans-serif",
                }}
              >
                {chapter.body}
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {prev && (
                <button
                  onClick={() => setOpenId(prev.id)}
                  style={{
                    flex: 1,
                    textAlign: "left",
                    background: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 14px",
                    cursor: "pointer",
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#8e8e93" }}>Previous</span>
                  <p style={{ fontSize: 15, color: "#1c1c1e", marginTop: 2 }}>{prev.title}</p>
                </button>
              )}
              {next && (
                <button
                  onClick={() => setOpenId(next.id)}
                  style={{
                    flex: 1,
                    textAlign: "right",
                    background: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 14px",
                    cursor: "pointer",
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#8e8e93" }}>Next</span>
                  <p style={{ fontSize: 15, color: "#1c1c1e", marginTop: 2 }}>{next.title}</p>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
