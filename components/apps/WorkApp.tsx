"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

const WorkCard = memo(function WorkCard({
  exp,
  expanded,
  onToggle,
}: {
  exp: typeof experience[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.988 }}
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
      }}
    >
      {/* Collapsed row */}
      <div
        onClick={onToggle}
        style={{
          padding: "12px 14px 12px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Company logo */}
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: exp.logo ? "white" : exp.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          border: exp.logo ? "0.5px solid rgba(0,0,0,0.08)" : "none",
          overflow: "hidden",
        }}>
          {exp.logo ? (
            <div style={{ position: "relative", width: 28, height: 28 }}>
              <Image src={exp.logo} alt={exp.company} fill style={{ objectFit: "contain" }} />
            </div>
          ) : (
            <span style={{ fontSize: 15, fontWeight: 800, color: "white", fontFamily: "-apple-system, sans-serif" }}>{exp.company[0]}</span>
          )}
        </div>

        {/* Company name + title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif", lineHeight: 1.3 }}>
            {exp.company}
          </span>
          <span style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#636366", fontFamily: "-apple-system, sans-serif", marginTop: 1 }}>
            {exp.title}
          </span>
        </div>

        {/* Period + chevron — always vertically centered together */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "#8e8e93", fontFamily: "-apple-system, sans-serif", textAlign: "right" }}>
            {exp.period}
          </span>
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            style={{
              width: 26, height: 26, borderRadius: "50%",
              background: "#f2f2f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
              <path d="M1 1L6 5.5L1 10" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderTop: "0.5px solid rgba(60,60,67,0.1)", padding: "14px 16px 16px 14px" }}>
              <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.65, marginBottom: exp.achievements.length > 0 ? 12 : 0, fontFamily: "-apple-system, sans-serif" }}>
                {exp.description}
              </p>

              {exp.achievements.length > 0 && (
                <div style={{ marginBottom: exp.skills.length > 0 ? 12 : 0 }}>
                  {exp.achievements.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                      <span style={{ color: "#8e8e93", fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>·</span>
                      <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.55, fontFamily: "-apple-system, sans-serif" }}>{a}</p>
                    </div>
                  ))}
                </div>
              )}

              {exp.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: exp.photos && exp.photos.length > 0 ? 12 : 0 }}>
                  {exp.skills.map((s) => (
                    <span key={s} style={{ fontSize: 11, fontWeight: 600, color: "#636366", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: "3px 8px" }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {exp.photos && exp.photos.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 4, overflowX: "auto", paddingBottom: 4 }}>
                  {exp.photos.map((src, pi) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={pi} src={src} alt="" style={{ height: 100, width: 160, borderRadius: 10, objectFit: "cover", flexShrink: 0, boxShadow: "0 1px 6px rgba(0,0,0,0.12)" }} />
                  ))}
                </div>
              )}

              {exp.website && (
                <a href={exp.website} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 12, fontSize: 13, fontWeight: 600, color: "#007aff", textDecoration: "none" }}>
                  Visit {exp.company} {"\u2197"}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default function WorkApp({ onClose: _onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 0 32px" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "16px 16px 18px" }}>
          <h1 className="ios-large-title" style={{ color: "#1c1c1e", fontFamily: "-apple-system, sans-serif", fontWeight: 800, marginBottom: 4 }}>
            Work
          </h1>
          <p style={{ fontSize: 14, color: "#636366", fontFamily: "-apple-system, sans-serif" }}>
            Always looking to build something great
          </p>
        </motion.div>

        {/* Year groups */}
        <div style={{ padding: "0 16px 32px" }}>
          {[
            { label: "2026", items: experience.filter((e) => e.year === "2026") },
            { label: "2025", items: experience.filter((e) => e.year === "2025") },
            { label: "2024", items: experience.filter((e) => e.year === "2024") },
          ].filter((g) => g.items.length > 0).map((group, gi) => (
            <div key={group.label} style={{ marginBottom: 22 }}>
              <p style={{
                fontSize: 13, color: "#6e6e73", fontWeight: 600, letterSpacing: 0.5,
                marginBottom: 10, textTransform: "uppercase",
                fontFamily: "-apple-system, sans-serif",
              }}>
                {group.label}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {group.items.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: gi * 0.06 + i * 0.04, type: "spring", stiffness: 340, damping: 28 }}
                  >
                    <WorkCard exp={exp} expanded={expanded === exp.id} onToggle={() => toggle(exp.id)} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
