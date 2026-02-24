"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { organizations } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

const categories = ["All", "Faith", "Professional", "Academic", "Social"] as const;
type Category = typeof categories[number];

const categoryColors: Record<string, string> = {
  Faith: "#5856D6",
  Professional: "#6C47FF",
  Academic: "#007AFF",
  Social: "#FF9500",
};

export default function FilesApp({ onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const selectedOrg = organizations.find((o) => o.id === selected);

  const filtered =
    activeCategory === "All"
      ? organizations
      : organizations.filter((o) => o.category === activeCategory);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      {/* Nav bar */}
      <div className="ios-nav-bar">
        <button
          onClick={selected ? () => setSelected(null) : onClose}
          style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {selected ? "Organizations" : ""}
        </button>
      </div>

      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          {!selected ? (
            /* ─── LIST VIEW ─── */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "16px 16px 32px" }}
            >
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
                <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>
                  Organizations
                </h1>
                <p style={{ fontSize: 15, color: "#636366" }}>Where you&apos;ll find me on campus</p>
              </motion.div>

              {/* Category filter pills */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      flexShrink: 0,
                      padding: "7px 16px",
                      borderRadius: 20,
                      border: "none",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      background: activeCategory === cat ? "#007aff" : "white",
                      color: activeCategory === cat ? "white" : "#1c1c1e",
                      boxShadow: activeCategory === cat ? "0 2px 8px rgba(0,122,255,0.3)" : "0 1px 6px rgba(0,0,0,0.08)",
                      transition: "all 0.2s",
                      fontFamily: "var(--font-sf)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>

              {/* Org cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filtered.map((org, i) => (
                  <motion.div
                    key={org.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(org.id)}
                    style={{
                      background: "white",
                      borderRadius: 16,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      cursor: "pointer",
                      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Logo / letter */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: org.logo ? "transparent" : org.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 2px 8px ${org.color}44`,
                        position: "relative",
                      }}
                    >
                      {org.logo ? (
                        <Image src={org.logo} alt={org.name} fill style={{ objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: 18, fontWeight: 800, color: "white", fontFamily: "-apple-system, sans-serif" }}>
                          {org.shortName.slice(0, 2)}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "#1c1c1e", lineHeight: 1.2 }}>{org.name}</p>
                      </div>
                      <p style={{ fontSize: 12, color: "#8e8e93", marginBottom: 2 }}>{org.role} · {org.period}</p>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: categoryColors[org.category] ?? "#8e8e93",
                          background: `${categoryColors[org.category] ?? "#8e8e93"}15`,
                          borderRadius: 6,
                          padding: "2px 7px",
                          display: "inline-block",
                        }}
                      >
                        {org.category}
                      </span>
                    </div>

                    {/* Chevron */}
                    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : selectedOrg ? (
            /* ─── DETAIL VIEW ─── */
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              style={{ padding: "16px 16px 32px" }}
            >
              {/* Hero card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: "24px 20px",
                  marginBottom: 16,
                  boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
                  display: "flex",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: selectedOrg.logo ? "transparent" : selectedOrg.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 4px 16px ${selectedOrg.color}44`,
                    position: "relative",
                  }}
                >
                  {selectedOrg.logo ? (
                    <Image src={selectedOrg.logo} alt={selectedOrg.name} fill style={{ objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 26, fontWeight: 800, color: "white", fontFamily: "-apple-system, sans-serif" }}>
                      {selectedOrg.shortName.slice(0, 2)}
                    </span>
                  )}
                </div>
                <div>
                  <h2
                    className="font-poppins"
                    style={{ fontSize: 20, fontWeight: 700, color: "#1c1c1e", marginBottom: 4, lineHeight: 1.2 }}
                  >
                    {selectedOrg.name}
                  </h2>
                  <p style={{ fontSize: 13, color: "#636366", marginBottom: 6 }}>
                    {selectedOrg.role} · {selectedOrg.period}
                  </p>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: categoryColors[selectedOrg.category] ?? "#8e8e93",
                      background: `${categoryColors[selectedOrg.category] ?? "#8e8e93"}15`,
                      borderRadius: 8,
                      padding: "3px 10px",
                    }}
                  >
                    {selectedOrg.category}
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 12,
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                }}
              >
                <p style={{ fontSize: 12, color: "#8e8e93", marginBottom: 6, fontWeight: 600, letterSpacing: 0.5 }}>ABOUT</p>
                <p style={{ fontSize: 15, color: "#3a3a3c", lineHeight: 1.65 }}>{selectedOrg.description}</p>
              </motion.div>

              {/* Link */}
              {selectedOrg.link && (
                <motion.a
                  href={selectedOrg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: selectedOrg.color,
                    color: "white",
                    borderRadius: 16,
                    padding: "14px",
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: `0 4px 16px ${selectedOrg.color}44`,
                    fontFamily: "var(--font-sf)",
                  }}
                >
                  Visit {selectedOrg.name}
                  <span style={{ fontSize: 18 }}>{"\u2197"}</span>
                </motion.a>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
