"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#1c1c1e" }}>{name}</span>
        <span style={{ fontSize: 12, color: "#8e8e93", fontWeight: 500 }}>{level}%</span>
      </div>
      <div
        style={{
          height: 6,
          background: "#e5e5ea",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: "100%", background: color, borderRadius: 3 }}
        />
      </div>
    </div>
  );
}

export default function SkillsApp({ onClose }: Props) {
  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-nav-bar">
        <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
          <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>Skills</h1>
          <p style={{ fontSize: 15, color: "#636366" }}>Languages, frameworks & tools</p>
        </motion.div>

        {/* Domains */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={{ marginBottom: 24 }}>
          <p className="ios-section-header" style={{ paddingLeft: 0 }}>Domain Expertise</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.domains.map((d, i) => (
              <motion.span
                key={d}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#34c759",
                  background: "rgba(52,199,89,0.12)",
                  border: "1px solid rgba(52,199,89,0.25)",
                  borderRadius: 12,
                  padding: "6px 14px",
                }}
              >
                {d}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 24 }}>
          <p className="ios-section-header" style={{ paddingLeft: 0 }}>Languages</p>
          <div style={{ background: "white", borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            {skills.languages.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} color={s.color} delay={0.2 + i * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Frameworks */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: 24 }}>
          <p className="ios-section-header" style={{ paddingLeft: 0 }}>Frameworks & Libraries</p>
          <div style={{ background: "white", borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            {skills.frameworks.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} color={s.color} delay={0.3 + i * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="ios-section-header" style={{ paddingLeft: 0 }}>Tools & Infrastructure</p>
          <div style={{ background: "white", borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            {skills.tools.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} color={s.color} delay={0.4 + i * 0.05} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
