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

export default function FilesApp({ orientation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const isLandscape = orientation === "landscape";

  const selectedOrg = organizations.find((o) => o.id === selected);

  const filtered =
    activeCategory === "All"
      ? organizations
      : organizations.filter((o) => o.category === activeCategory);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          {!selected ? (
            /* ─── GRID VIEW ─── */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "16px 16px 32px" }}
            >
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 18 }}>
                <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>
                  Organizations
                </h1>
                <p style={{ fontSize: 15, color: "#636366", fontFamily: "-apple-system, sans-serif" }}>
                  Where you&apos;ll find me on campus
                </p>
              </motion.div>

              {/* Category pills */}
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
                      flexShrink: 0, padding: "7px 16px", borderRadius: 20, border: "none",
                      fontSize: 14, fontWeight: 600, cursor: "pointer",
                      background: activeCategory === cat ? "#007aff" : "white",
                      color: activeCategory === cat ? "white" : "#1c1c1e",
                      boxShadow: activeCategory === cat ? "0 2px 8px rgba(0,122,255,0.3)" : "0 1px 6px rgba(0,0,0,0.08)",
                      transition: "all 0.2s", fontFamily: "-apple-system, sans-serif",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>

              {/* Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${isLandscape ? 3 : 2}, 1fr)`,
                gap: "20px 16px",
              }}>
                {filtered.map((org, i) => (
                  <motion.div
                    key={org.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 + i * 0.03, type: "spring", stiffness: 360, damping: 28 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSelected(org.id)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: "100%", aspectRatio: "1", borderRadius: 20,
                      background: org.logo ? "white" : `linear-gradient(145deg, ${org.color}dd, ${org.color})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 4px 16px ${org.color}38`,
                      border: org.logo ? `1.5px solid ${org.color}22` : "none",
                      position: "relative", overflow: "hidden",
                    }}>
                      {org.logo ? (
                        <div style={{ position: "relative", width: "62%", height: "62%" }}>
                          <Image src={org.logo} alt={org.name} fill style={{ objectFit: "contain" }} />
                        </div>
                      ) : (
                        <span style={{ fontSize: 26, fontWeight: 900, color: "white", fontFamily: "-apple-system, sans-serif" }}>
                          {org.shortName.slice(0, 2)}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <p style={{
                      fontSize: 12, fontWeight: 500, color: "#1c1c1e",
                      textAlign: "center", lineHeight: 1.35,
                      fontFamily: "-apple-system, sans-serif", width: "100%",
                    }}>
                      {org.name}
                    </p>
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
              {/* Back */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  color: "#007aff", fontSize: 16, fontWeight: 400,
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0 0 14px", fontFamily: "-apple-system, sans-serif",
                }}
              >
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                  <path d="M7 1L1 6.5L7 12" stroke="#007aff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Organizations
              </button>

              {/* Hero card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "white", borderRadius: 20, padding: "24px 20px", marginBottom: 16,
                  boxShadow: "0 2px 20px rgba(0,0,0,0.08)", display: "flex", gap: 18, alignItems: "center",
                }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: 20, overflow: "hidden", flexShrink: 0,
                  background: selectedOrg.logo ? "white" : selectedOrg.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 4px 16px ${selectedOrg.color}44`,
                  border: selectedOrg.logo ? `1px solid ${selectedOrg.color}22` : "none",
                  position: "relative",
                }}>
                  {selectedOrg.logo ? (
                    <div style={{ position: "relative", width: "65%", height: "65%" }}>
                      <Image src={selectedOrg.logo} alt={selectedOrg.name} fill style={{ objectFit: "contain" }} />
                    </div>
                  ) : (
                    <span style={{ fontSize: 26, fontWeight: 800, color: "white", fontFamily: "-apple-system, sans-serif" }}>
                      {selectedOrg.shortName.slice(0, 2)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="font-poppins" style={{ fontSize: 20, fontWeight: 700, color: "#1c1c1e", marginBottom: 4, lineHeight: 1.2 }}>
                    {selectedOrg.name}
                  </h2>
                  <p style={{ fontSize: 13, color: "#636366", marginBottom: 6 }}>
                    {selectedOrg.role} · {selectedOrg.period}
                  </p>
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: categoryColors[selectedOrg.category] ?? "#8e8e93",
                    background: `${categoryColors[selectedOrg.category] ?? "#8e8e93"}15`,
                    borderRadius: 8, padding: "3px 10px", fontFamily: "-apple-system, sans-serif",
                  }}>
                    {selectedOrg.category}
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                style={{ background: "white", borderRadius: 16, padding: "16px 20px", marginBottom: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
              >
                <p style={{ fontSize: 12, color: "#8e8e93", marginBottom: 6, fontWeight: 600, letterSpacing: 0.5 }}>ABOUT</p>
                <p style={{ fontSize: 15, color: "#3a3a3c", lineHeight: 1.65, fontFamily: "-apple-system, sans-serif" }}>{selectedOrg.description}</p>
              </motion.div>

              {/* Achievements */}
              {"achievements" in selectedOrg && Array.isArray(selectedOrg.achievements) && selectedOrg.achievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.11 }}
                  style={{ background: "white", borderRadius: 16, padding: "16px 20px", marginBottom: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
                >
                  <p style={{ fontSize: 12, color: "#8e8e93", marginBottom: 10, fontWeight: 600, letterSpacing: 0.5 }}>IMPACT</p>
                  {(selectedOrg.achievements as string[]).map((a: string, i: number) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
                      <span style={{ color: selectedOrg.color, fontWeight: 700, flexShrink: 0, fontSize: 16, lineHeight: 1.4 }}>·</span>
                      <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.55, fontFamily: "-apple-system, sans-serif" }}>{a}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Photos */}
              {"photos" in selectedOrg && Array.isArray(selectedOrg.photos) && selectedOrg.photos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.13 }}
                  style={{ display: "flex", gap: 8, marginBottom: 12, overflowX: "auto", paddingBottom: 4 }}
                >
                  {(selectedOrg.photos as string[]).map((src: string, pi: number) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={pi} src={src} alt="" style={{ height: 120, width: "auto", borderRadius: 14, objectFit: "cover", flexShrink: 0, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }} />
                  ))}
                </motion.div>
              )}

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
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: selectedOrg.color, color: "white",
                    borderRadius: 16, padding: "14px", fontSize: 16, fontWeight: 600,
                    textDecoration: "none", boxShadow: `0 4px 16px ${selectedOrg.color}44`,
                    fontFamily: "-apple-system, sans-serif",
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
