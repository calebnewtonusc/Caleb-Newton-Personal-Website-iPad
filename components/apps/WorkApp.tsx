"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { experience } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

// Expandable timeline card — memoized for performance
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
      whileTap={{ scale: 0.985 }}
      style={{
        background: "white",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Collapsed row */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", cursor: "pointer" }}
        onClick={onToggle}
      >
        {/* Logo */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: exp.logo ? "#f2f2f7" : exp.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          {exp.logo ? (
            <Image
              src={exp.logo}
              alt={exp.company}
              width={52}
              height={52}
              style={{ objectFit: "contain", padding: 6 }}
            />
          ) : (
            <span style={{ color: "white", fontSize: 20, fontWeight: 700, fontFamily: "-apple-system, sans-serif" }}>
              {exp.company[0]}
            </span>
          )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#1c1c1e", marginBottom: 2, fontFamily: "-apple-system, sans-serif" }}>
            {exp.company}
          </div>
          <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 3 }}>{exp.period}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>{exp.title}</div>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#f2f2f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
            <path d="M1 1L5.5 6L10 1" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderTop: "0.5px solid rgba(60,60,67,0.1)", padding: "14px 16px 16px" }}>
              <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.65, marginBottom: 14 }}>
                {exp.description}
              </p>

              {exp.achievements.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  {exp.achievements.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <span style={{ color: exp.color, fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>·</span>
                      <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.55 }}>{a}</p>
                    </div>
                  ))}
                </div>
              )}

              {exp.skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: exp.color,
                        background: `${exp.color}15`,
                        border: `1px solid ${exp.color}28`,
                        borderRadius: 8,
                        padding: "3px 8px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {exp.website && (
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 12,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#007aff",
                    textDecoration: "none",
                  }}
                >
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

export default function WorkApp({ onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      {/* Nav Bar */}
      <div className="ios-nav-bar">
        <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 0 32px" }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "16px 16px 0" }}
        >
          <h1
            className="ios-large-title"
            style={{ color: "#1c1c1e", marginBottom: 18, fontFamily: "-apple-system, sans-serif", fontWeight: 800 }}
          >
            Work Experience
          </h1>
        </motion.div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{ margin: "0 16px 24px" }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: "18px 18px 18px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#1c1c1e",
                  lineHeight: 1.25,
                  marginBottom: 10,
                  fontFamily: "-apple-system, sans-serif",
                  letterSpacing: -0.4,
                }}
              >
                Building ML systems that serve people
              </h2>
              <p style={{ fontSize: 14, color: "#636366", lineHeight: 1.55 }}>
                Always looking for new opportunities to build. Feel free to reach out if you&apos;re working on something interesting!
              </p>
            </div>
            {/* Safari / Compass icon */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icons/safari_ios.png"
              alt=""
              style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 14 }}
            />
          </div>
        </motion.div>

        {/* "Experience" header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ padding: "0 16px 14px" }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#1c1c1e",
              letterSpacing: -0.4,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", padding: "0 16px 0 52px" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 32,
              top: 8,
              bottom: 8,
              width: 2,
              background: "linear-gradient(180deg, #3a3a3c 0%, rgba(60,60,67,0.15) 100%)",
              borderRadius: 1,
            }}
          />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + i * 0.06, type: "spring", stiffness: 320, damping: 28 }}
              style={{ position: "relative", marginBottom: 12 }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: -28,
                  top: 18,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#3a3a3c",
                  border: "2.5px solid #f2f2f7",
                  boxShadow: "0 0 0 1.5px #3a3a3c",
                  zIndex: 1,
                }}
              />

              <WorkCard
                exp={exp}
                expanded={expanded === exp.id}
                onToggle={() => toggle(exp.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
