"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalSettings, profile, social } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

function IOSToggle({ on }: { on: boolean }) {
  return (
    <div className={`ios-toggle ${on ? "on" : ""}`}>
      <div className="ios-toggle-track" />
    </div>
  );
}

function SectionIcon({ icon }: { icon: string }) {
  const fallbackColors: Record<string, string> = {
    "✝️": "#5856D6",
    "🎵": "#FF2D55",
    "⚾": "#34C759",
    "🎬": "#FF9500",
    "📱": "#8E8E93",
    "⚡": "#FFD60A",
    "⚙️": "#636366",
  };
  const bg = fallbackColors[icon] ?? "#8e8e93";
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 15, flexShrink: 0,
    }}>
      {icon[0]}
    </div>
  );
}

const PROFILE_SECTION = "__profile__";

export default function SettingsApp({ onClose, orientation }: Props) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const isLandscape = orientation === "landscape";

  const section = personalSettings.find((s) => s.section === selectedSection);

  const socialLinks = [
    { label: "GitHub", value: "calebnewtonusc", url: social.github, color: "#1c1c1e" },
    { label: "LinkedIn", value: "caleb-newton", url: social.linkedin, color: "#0A66C2" },
    { label: "X / Twitter", value: "@klubnootuhn", url: social.x, color: "#000000" },
    { label: "Email", value: "calebnew@usc.edu", url: `mailto:${profile.email}`, color: "#007AFF" },
    { label: "Letterboxd", value: "cnewt", url: social.letterboxd, color: "#FF8000" },
    { label: "RateYourMusic", value: "~cnewt", url: social.rateyourmusic, color: "#ED1C24" },
  ];

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      {/* Two-pane in landscape, single pane in portrait */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Sidebar ── */}
        <AnimatePresence mode="wait" initial={false}>
          {(isLandscape || !selectedSection) && (
            <motion.div
              key="sidebar"
              initial={isLandscape ? false : { x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              style={{
                width: isLandscape ? 280 : "100%",
                borderRight: isLandscape ? "0.5px solid rgba(60,60,67,0.2)" : "none",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div className="ios-scroll" style={{ overflowY: "auto", padding: "16px 16px 32px" }}>

                {/* ── Clickable Profile Header ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSection(PROFILE_SECTION)}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    padding: "16px 18px",
                    marginBottom: 20,
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    boxShadow: selectedSection === PROFILE_SECTION
                      ? "0 2px 16px rgba(0,122,255,0.18)"
                      : "0 2px 16px rgba(0,0,0,0.07)",
                    cursor: "pointer",
                    border: selectedSection === PROFILE_SECTION
                      ? "1.5px solid rgba(0,122,255,0.25)"
                      : "1.5px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: "50%",
                    overflow: "hidden", flexShrink: 0,
                    border: "2.5px solid #34c759",
                    position: "relative",
                  }}>
                    <Image src={profile.photo} alt="Caleb Newton" fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="font-poppins" style={{ fontSize: 16, fontWeight: 700, color: "#1c1c1e" }}>
                      Caleb Newton
                    </p>
                    <p style={{ fontSize: 13, color: "#636366" }}>USC Freshman &middot; CS + Applied Math</p>
                    <p style={{ fontSize: 12, color: "#34c759", marginTop: 2 }}>calebnew@usc.edu</p>
                  </div>
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                    <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* ── Settings Sections ── */}
                {personalSettings.map((sec, gi) => (
                  <motion.div
                    key={sec.section}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: gi * 0.04 }}
                    style={{ marginBottom: 12 }}
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        cursor: "pointer",
                        border: selectedSection === sec.section
                          ? "1.5px solid rgba(0,122,255,0.2)"
                          : "1.5px solid transparent",
                      }}
                      onClick={() => setSelectedSection(sec.section)}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "13px 16px",
                        gap: 12,
                        background: selectedSection === sec.section ? "rgba(0,122,255,0.05)" : "transparent",
                      }}>
                        <SectionIcon icon={sec.icon} />
                        <span className="font-poppins" style={{ fontSize: 15, fontWeight: 600, color: "#1c1c1e", flex: 1 }}>
                          {sec.section}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 12, color: "#8e8e93" }}>
                            {sec.items.filter((i) => i.type === "toggle-on").length} ON
                          </span>
                          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                            <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Detail Pane ── */}
        <AnimatePresence mode="wait">
          {selectedSection === PROFILE_SECTION && (
            <motion.div
              key="profile-detail"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              <div className="ios-scroll" style={{ overflowY: "auto", padding: "16px 16px 32px" }}>
                {/* Back button in portrait */}
                {!isLandscape && (
                  <button
                    onClick={() => setSelectedSection(null)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4,
                      color: "#007aff", fontSize: 15, background: "none",
                      border: "none", cursor: "pointer", marginBottom: 12, padding: 0,
                      fontFamily: "-apple-system, sans-serif",
                    }}
                  >
                    <svg width="8" height="13" viewBox="0 0 10 17" fill="none">
                      <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Settings
                  </button>
                )}

                {/* Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: "white", borderRadius: 20, padding: "20px",
                    marginBottom: 14, boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
                    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                  }}
                >
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    overflow: "hidden", border: "3px solid #34c759",
                    marginBottom: 12, position: "relative",
                    boxShadow: "0 4px 16px rgba(52,199,89,0.25)",
                  }}>
                    <Image src={profile.photo} alt="Caleb Newton" fill style={{ objectFit: "cover" }} />
                  </div>
                  <h2 className="font-poppins" style={{ fontSize: 22, fontWeight: 800, color: "#1c1c1e", marginBottom: 4 }}>
                    Caleb Newton
                  </h2>
                  <p style={{ fontSize: 13, color: "#636366", marginBottom: 8 }}>
                    USC Freshman &middot; CS + Applied Mathematics &middot; Viterbi
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                    {["Follower of Jesus", "Aspiring ML Engineer", "USC &apos;29"].map((role) => (
                      <span key={role} style={{
                        fontSize: 11, fontWeight: 600, color: "#007AFF",
                        background: "rgba(0,122,255,0.1)", borderRadius: 8, padding: "3px 10px",
                      }} dangerouslySetInnerHTML={{ __html: role }} />
                    ))}
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  style={{
                    background: "white", borderRadius: 16, padding: "16px 18px",
                    marginBottom: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p style={{ fontSize: 11, color: "#8e8e93", fontWeight: 700, letterSpacing: 0.6, marginBottom: 8 }}>ABOUT</p>
                  <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.65 }}>
                    {profile.bio}
                  </p>
                </motion.div>

                {/* Currently */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    background: "white", borderRadius: 16, padding: "16px 18px",
                    marginBottom: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p style={{ fontSize: 11, color: "#8e8e93", fontWeight: 700, letterSpacing: 0.6, marginBottom: 10 }}>CURRENTLY</p>
                  {[
                    { label: "Building", value: "Holographic video systems @ AINA Tech" },
                    { label: "Studying", value: "CS + Applied Math @ USC Viterbi" },
                    { label: "Researching", value: "ML Research @ USC" },
                    { label: "Learning", value: "PyTorch · 4DGS · COLMAP · Guitar" },
                  ].map((item, i, arr) => (
                    <div key={item.label} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "baseline",
                      paddingBottom: i < arr.length - 1 ? 8 : 0,
                      borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.1)" : "none",
                      marginBottom: i < arr.length - 1 ? 8 : 0,
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1c1c1e" }}>{item.label}</span>
                      <span style={{ fontSize: 13, color: "#636366", textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 }}
                  style={{
                    background: "white", borderRadius: 16, overflow: "hidden",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <p style={{ fontSize: 11, color: "#8e8e93", fontWeight: 700, letterSpacing: 0.6, padding: "14px 18px 8px" }}>FIND ME</p>
                  {socialLinks.map((link, i) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "11px 18px",
                        borderTop: i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.1)",
                        textDecoration: "none",
                      }}
                    >
                      <span style={{ fontSize: 14, color: "#1c1c1e", fontWeight: 500 }}>{link.label}</span>
                      <span style={{ fontSize: 13, color: link.color, fontWeight: 500 }}>{link.value}</span>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {selectedSection && selectedSection !== PROFILE_SECTION && section && (
            <motion.div
              key={selectedSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              <div className="ios-scroll" style={{ overflowY: "auto", padding: "16px 16px 32px" }}>
                {/* Back button in portrait */}
                {!isLandscape && (
                  <button
                    onClick={() => setSelectedSection(null)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4,
                      color: "#007aff", fontSize: 15, background: "none",
                      border: "none", cursor: "pointer", marginBottom: 12, padding: 0,
                      fontFamily: "-apple-system, sans-serif",
                    }}
                  >
                    <svg width="8" height="13" viewBox="0 0 10 17" fill="none">
                      <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Settings
                  </button>
                )}

                {/* Section header */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}
                >
                  <SectionIcon icon={section.icon} />
                  <div>
                    <h2 className="font-poppins" style={{ fontSize: 22, fontWeight: 700, color: "#1c1c1e" }}>
                      {section.section}
                    </h2>
                    <p style={{ fontSize: 13, color: "#636366" }}>
                      {section.items.length} preferences &middot; {section.items.filter((i) => i.type === "toggle-on").length} active
                    </p>
                  </div>
                </motion.div>

                {/* Settings rows */}
                <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                  {section.items.map((item, i, arr) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "13px 18px",
                        gap: 12,
                        borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 15, fontWeight: 500, color: "#1c1c1e" }}>{item.label}</p>
                        {item.type !== "toggle-on" && item.type !== "toggle-off" && (
                          <p style={{ fontSize: 12, color: "#8e8e93", marginTop: 1 }}>{item.detail}</p>
                        )}
                      </div>
                      {item.type === "toggle-on" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                          <IOSToggle on={true} />
                          <span style={{ fontSize: 11, color: "#8e8e93" }}>{item.detail}</span>
                        </div>
                      ) : item.type === "toggle-off" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                          <IOSToggle on={false} />
                          <span style={{ fontSize: 11, color: "#8e8e93" }}>{item.detail}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 14, color: "#8e8e93", maxWidth: 150, textAlign: "right" }}>
                          {item.detail}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {section.items.some((i) => i.type === "toggle-on") && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      fontSize: 12, color: "#8e8e93", textAlign: "center",
                      marginTop: 14, lineHeight: 1.5,
                    }}
                  >
                    These settings are locked ON. They&apos;re not preferences — they&apos;re facts.
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {!selectedSection && isLandscape && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                flex: 1, display: "flex", alignItems: "center",
                justifyContent: "center", flexDirection: "column", gap: 12,
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: "#e5e5ea",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, color: "#8e8e93", fontFamily: "-apple-system, sans-serif",
              }}>
                ⚙️
              </div>
              <p style={{ fontSize: 16, color: "#636366" }}>Select a category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
