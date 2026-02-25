"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalSettings, profile } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

function IOSToggle({ on }: { on: boolean }) {
  return (
    <div
      style={{
        width: 51, height: 31, borderRadius: 15.5,
        background: on ? "#34C759" : "#e5e5ea",
        position: "relative", flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div style={{
        position: "absolute",
        top: 2, left: on ? 22 : 2,
        width: 27, height: 27, borderRadius: "50%",
        background: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

const SECTION_ICONS: Record<string, { bg: string; render: () => React.ReactNode }> = {
  faith: {
    bg: "#5856D6",
    render: () => (
      <svg width="16" height="20" viewBox="0 0 16 20" fill="white">
        <rect x="6.5" y="0" width="3" height="20" rx="1.5" />
        <rect x="0" y="5" width="16" height="3" rx="1.5" />
      </svg>
    ),
  },
  music: {
    bg: "#FF2D55",
    render: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 12.5V4l9-1.5v7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="3.5" cy="12.5" r="2.5" fill="white" />
        <circle cx="12.5" cy="10.5" r="2.5" fill="white" />
      </svg>
    ),
  },
  sports: {
    bg: "#34C759",
    render: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
        <path d="M4.5 3C6 5 6 11 4.5 13M11.5 3C10 5 10 11 11.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M1 8h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  film: {
    bg: "#FF9500",
    render: () => (
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="white" strokeWidth="1.5" />
        <path d="M1 7h14" stroke="white" strokeWidth="1.5" />
        <path d="M4 3V1M8 3V1M12 3V1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 3L2 1M8 3L6 1M12 3L10 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  runtime: {
    bg: "#FFD60A",
    render: () => (
      <svg width="12" height="18" viewBox="0 0 12 18" fill="#1c1c1e">
        <path d="M7 0L0 10h6L5 18 12 7H6z" />
      </svg>
    ),
  },
  system: {
    bg: "#636366",
    render: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="white" strokeWidth="1.5" />
        <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  device: {
    bg: "#8E8E93",
    render: () => (
      <svg width="11" height="18" viewBox="0 0 11 18" fill="none">
        <rect x="1" y="1" width="9" height="16" rx="2" stroke="white" strokeWidth="1.5" />
        <circle cx="5.5" cy="14" r="1" fill="white" />
        <path d="M3.5 1v1h4V1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

function SectionIcon({ iconId }: { iconId: string }) {
  const def = SECTION_ICONS[iconId];
  if (!def) return null;
  return (
    <div style={{
      width: 29, height: 29, borderRadius: 7,
      background: def.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      {def.render()}
    </div>
  );
}

const PROFILE_SECTION = "__profile__";

// Group sections for iOS-style grouped lists
const SECTION_GROUPS = [
  ["faith", "music", "sports"],
  ["film", "runtime"],
  ["system", "device"],
];

export default function SettingsApp({ onClose, orientation }: Props) {
  const [selectedSection, setSelectedSection] = useState<string | null>(PROFILE_SECTION);
  const isLandscape = orientation === "landscape";

  const section = personalSettings.find((s) => s.icon === selectedSection);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Sidebar ── */}
        <AnimatePresence mode="wait" initial={false}>
          {(isLandscape || !selectedSection) && (
            <motion.div
              key="sidebar"
              initial={isLandscape ? false : { x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              style={{
                width: isLandscape ? 320 : "100%",
                borderRight: isLandscape ? "0.5px solid rgba(60,60,67,0.18)" : "none",
                display: "flex", flexDirection: "column", overflow: "hidden",
              }}
            >
              <div className="ios-scroll" style={{ overflowY: "auto", padding: "20px 16px 32px" }}>

                {/* Large title */}
                <h1 style={{ fontSize: 34, fontWeight: 700, color: "#1c1c1e", marginBottom: 20, fontFamily: "-apple-system, sans-serif", letterSpacing: -0.5 }}>
                  About
                </h1>

                {/* Profile card */}
                <div
                  onClick={() => setSelectedSection(PROFILE_SECTION)}
                  style={{
                    background: "white", borderRadius: 10,
                    padding: "14px 16px", marginBottom: 8,
                    display: "flex", gap: 14, alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "0 0.5px 0 rgba(60,60,67,0.18)",
                  }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                    <Image src={profile.photoAlt} alt="Caleb Newton" fill style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 20, fontWeight: 600, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>Caleb Newton</p>
                    <p style={{ fontSize: 13, color: "#636366", fontFamily: "-apple-system, sans-serif", marginTop: 1 }}>
                      USC · CS + Applied Math
                    </p>
                  </div>
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                    <path d="M1 1l5 5L1 11" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Grouped settings sections */}
                {SECTION_GROUPS.map((group, gi) => {
                  const groupSections = group.map(id => personalSettings.find(s => s.icon === id)).filter(Boolean) as typeof personalSettings;
                  if (groupSections.length === 0) return null;
                  return (
                    <div key={gi} style={{ background: "white", borderRadius: 10, overflow: "hidden", marginBottom: 8, boxShadow: "0 0.5px 0 rgba(60,60,67,0.18)" }}>
                      {groupSections.map((sec, i) => (
                        <motion.div
                          key={sec.section}
                          onClick={() => setSelectedSection(sec.icon)}
                          whileTap={{ backgroundColor: "#ebebeb" }}
                          style={{
                            display: "flex", alignItems: "center",
                            padding: "11px 16px", gap: 14,
                            borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.18)" : "none",
                            cursor: "pointer",
                            background: selectedSection === sec.icon ? "rgba(0,122,255,0.06)" : "white",
                          }}
                        >
                          <SectionIcon iconId={sec.icon} />
                          <span style={{ fontSize: 17, color: "#1c1c1e", flex: 1, fontFamily: "-apple-system, sans-serif" }}>
                            {sec.section}
                          </span>
                          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                            <path d="M1 1l5 5L1 11" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Detail Pane ── */}
        <AnimatePresence mode="wait">
          {selectedSection === PROFILE_SECTION && (
            <motion.div
              key="profile-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              <div className="ios-scroll" style={{ overflowY: "auto", padding: "16px 16px 32px" }}>
                {!isLandscape && (
                  <button onClick={() => setSelectedSection(null)} style={{ display: "flex", alignItems: "center", gap: 5, color: "#007aff", fontSize: 17, background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "-apple-system, sans-serif" }}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    About
                  </button>
                )}

                {/* Profile header */}
                <div style={{ background: "white", borderRadius: 10, padding: "20px 16px", marginBottom: 8, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", marginBottom: 12, position: "relative" }}>
                    <Image src={profile.photoAlt} alt="Caleb Newton" fill style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif", marginBottom: 3 }}>Caleb Newton</p>
                  <p style={{ fontSize: 13, color: "#636366", fontFamily: "-apple-system, sans-serif" }}>USC Freshman · CS + Applied Mathematics</p>
                </div>

                {/* Bio */}
                <p style={{ fontSize: 13, color: "#6e6e73", fontFamily: "-apple-system, sans-serif", fontWeight: 500, letterSpacing: 0.3, marginBottom: 6, marginLeft: 16, textTransform: "uppercase" }}>About</p>
                <div style={{ background: "white", borderRadius: 10, padding: "14px 16px", marginBottom: 8 }}>
                  <p style={{ fontSize: 15, color: "#3a3a3c", lineHeight: 1.6, fontFamily: "-apple-system, sans-serif" }}>{profile.bio}</p>
                </div>

                {/* Currently */}
                <p style={{ fontSize: 13, color: "#6e6e73", fontFamily: "-apple-system, sans-serif", fontWeight: 500, letterSpacing: 0.3, marginBottom: 6, marginLeft: 16, textTransform: "uppercase" }}>Currently</p>
                <div style={{ background: "white", borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
                  {[
                    { label: "Building", value: "Holographic video @ AINA Tech" },
                    { label: "Studying", value: "CS + Applied Math @ USC" },
                    { label: "Learning", value: "PyTorch · 4DGS · Guitar" },
                  ].map((item, i) => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.18)" : "none" }}>
                      <span style={{ fontSize: 17, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>{item.label}</span>
                      <span style={{ fontSize: 15, color: "#636366", fontFamily: "-apple-system, sans-serif", textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Roles */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "0 4px" }}>
                  {profile.roles.map((role) => (
                    <span key={role} style={{ fontSize: 13, fontWeight: 500, color: "#007AFF", background: "rgba(0,122,255,0.1)", borderRadius: 20, padding: "4px 12px", fontFamily: "-apple-system, sans-serif" }}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedSection && selectedSection !== PROFILE_SECTION && section && (
            <motion.div
              key={selectedSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              <div className="ios-scroll" style={{ overflowY: "auto", padding: "16px 16px 32px" }}>
                {!isLandscape && (
                  <button onClick={() => setSelectedSection(null)} style={{ display: "flex", alignItems: "center", gap: 5, color: "#007aff", fontSize: 17, background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "-apple-system, sans-serif" }}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    About
                  </button>
                )}

                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <SectionIcon iconId={section.icon} />
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>{section.section}</h2>
                  </div>
                </div>

                {/* Settings rows -iOS grouped style */}
                <div style={{ background: "white", borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
                  {section.items.map((item, i, arr) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: "12px 16px", gap: 12,
                        borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.18)" : "none",
                        minHeight: 44,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 17, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>{item.label}</p>
                      </div>
                      {(item.type === "toggle-on" || item.type === "toggle-off") ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                          <IOSToggle on={item.type === "toggle-on"} />
                          <span style={{ fontSize: 11, color: "#8e8e93", fontFamily: "-apple-system, sans-serif" }}>{item.detail}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 15, color: "#8e8e93", fontFamily: "-apple-system, sans-serif", maxWidth: 160, textAlign: "right" }}>{item.detail}</span>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          )}

          {!selectedSection && isLandscape && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#e5e5ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <SectionIcon iconId="system" />
              </div>
              <p style={{ fontSize: 15, color: "#8e8e93", fontFamily: "-apple-system, sans-serif" }}>Select a section</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
