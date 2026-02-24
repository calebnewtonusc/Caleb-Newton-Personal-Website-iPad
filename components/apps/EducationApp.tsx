"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { education } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

export default function EducationApp({ onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedEd = education.find((e) => e.id === selected);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-nav-bar">
        <button
          onClick={selected ? () => setSelected(null) : onClose}
          style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {selected ? "Education" : "Home"}
        </button>
        <span className="ios-headline" style={{ color: "#1c1c1e" }}>
          Education
        </span>
        <div style={{ width: 60 }} />
      </div>

      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "16px 16px 32px" }}
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
                <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>
                  Education
                </h1>
                <p style={{ fontSize: 15, color: "#636366" }}>Academic journey</p>
              </motion.div>

              {education.map((ed, i) => (
                <motion.div
                  key={ed.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(ed.id)}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    padding: "16px 18px",
                    marginBottom: 14,
                    boxShadow: "0 3px 16px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: ed.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {ed.logo ? (
                      <Image src={ed.logo} alt={ed.school} width={52} height={52} style={{ objectFit: "contain", padding: 6 }} />
                    ) : (
                      <span style={{ color: "white", fontSize: 22, fontWeight: 700 }}>{ed.school[0]}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 className="font-poppins" style={{ fontSize: 15, fontWeight: 700, color: "#1c1c1e", marginBottom: 2 }}>
                      {ed.school}
                    </h3>
                    <p style={{ fontSize: 12, color: ed.color, fontWeight: 600, marginBottom: 3 }}>{ed.degree}</p>
                    <p style={{ fontSize: 12, color: "#8e8e93" }}>{ed.period} · {ed.status}</p>
                  </div>
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                    <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              style={{ padding: "16px 16px 32px" }}
            >
              {selectedEd && (
                <>
                  {/* Header */}
                  <div
                    style={{
                      background: "white",
                      borderRadius: 20,
                      padding: 20,
                      marginBottom: 16,
                      boxShadow: "0 3px 16px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 14 }}>
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                          background: selectedEd.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        {selectedEd.logo ? (
                          <Image src={selectedEd.logo} alt={selectedEd.school} width={64} height={64} style={{ objectFit: "contain", padding: 8 }} />
                        ) : (
                          <span style={{ color: "white", fontSize: 28, fontWeight: 700 }}>{selectedEd.school[0]}</span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-poppins" style={{ fontSize: 18, fontWeight: 700, color: "#1c1c1e" }}>
                          {selectedEd.school}
                        </h2>
                        {selectedEd.subtitle && (
                          <p style={{ fontSize: 13, color: "#636366" }}>{selectedEd.subtitle}</p>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        background: `${selectedEd.color}15`,
                        borderRadius: 12,
                        padding: "10px 14px",
                        marginBottom: 12,
                      }}
                    >
                      <p style={{ fontSize: 14, fontWeight: 600, color: selectedEd.color }}>{selectedEd.degree}</p>
                      <p style={{ fontSize: 13, color: "#636366", marginTop: 2 }}>{selectedEd.period} · {selectedEd.status}</p>
                    </div>
                    <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.6 }}>{selectedEd.description}</p>
                  </div>

                  {/* Highlights */}
                  {selectedEd.highlights.length > 0 && (
                    <div>
                      <p className="ios-section-header" style={{ paddingLeft: 4 }}>Highlights</p>
                      <div style={{ background: "white", borderRadius: 16, padding: "8px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                        {selectedEd.highlights.map((h, i, arr) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              gap: 10,
                              padding: "10px 0",
                              borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.1)" : "none",
                            }}
                          >
                            <span style={{ color: selectedEd.color, fontSize: 14, flexShrink: 0 }}>★</span>
                            <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.5 }}>{h}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
