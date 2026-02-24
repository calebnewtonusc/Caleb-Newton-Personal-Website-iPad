"use client";

import { memo, useState } from "react";
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
        borderLeft: `4px solid ${exp.color}`,
      }}
    >
      {/* Collapsed row */}
      <div
        onClick={onToggle}
        style={{
          padding: "14px 16px 14px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif", lineHeight: 1.2 }}>
              {exp.company}
            </span>
            <span style={{ fontSize: 11, color: "#8e8e93", flexShrink: 0, fontFamily: "-apple-system, sans-serif" }}>
              {exp.period}
            </span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: exp.color, fontFamily: "-apple-system, sans-serif" }}>
            {exp.title}
          </span>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
            background: "#f2f2f7", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
          }}
        >
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path d="M1 1L6 5.5L1 10" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
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
                      <span style={{ color: exp.color, fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>·</span>
                      <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.55, fontFamily: "-apple-system, sans-serif" }}>{a}</p>
                    </div>
                  ))}
                </div>
              )}

              {exp.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: exp.photos && exp.photos.length > 0 ? 12 : 0 }}>
                  {exp.skills.map((s) => (
                    <span key={s} style={{ fontSize: 11, fontWeight: 600, color: exp.color, background: `${exp.color}15`, border: `1px solid ${exp.color}28`, borderRadius: 8, padding: "3px 8px" }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {exp.photos && exp.photos.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 4, overflowX: "auto", paddingBottom: 4 }}>
                  {exp.photos.map((src, pi) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={pi} src={src} alt="" style={{ height: 100, width: "auto", borderRadius: 10, objectFit: "cover", flexShrink: 0, boxShadow: "0 1px 6px rgba(0,0,0,0.12)" }} />
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

        {/* Timeline */}
        <div style={{ padding: "0 16px 32px", position: "relative" }}>
          {/* Vertical connector line */}
          <div style={{
            position: "absolute",
            left: 22,
            top: 24,
            bottom: 48,
            width: 2,
            background: "linear-gradient(to bottom, #e5e5ea, #d1d1d6)",
            borderRadius: 1,
            zIndex: 0,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04, type: "spring", stiffness: 340, damping: 28 }}
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                {/* Timeline dot */}
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: exp.color,
                  flexShrink: 0,
                  marginTop: 18,
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 0 0 3px white, 0 0 0 5px ${exp.color}44`,
                }} />

                {/* Card */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <WorkCard exp={exp} expanded={expanded === exp.id} onToggle={() => toggle(exp.id)} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
