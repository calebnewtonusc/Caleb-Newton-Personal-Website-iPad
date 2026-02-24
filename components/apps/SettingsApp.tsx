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
    <div className={`ios-toggle ${on ? "on" : ""}`}>
      <div className="ios-toggle-track" />
    </div>
  );
}

export default function SettingsApp({ onClose, orientation }: Props) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const isLandscape = orientation === "landscape";

  const section = personalSettings.find((s) => s.section === selectedSection);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-nav-bar">
        <button
          onClick={selectedSection ? () => setSelectedSection(null) : onClose}
          style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {selectedSection ? "Settings" : "Home"}
        </button>
        <span className="ios-headline" style={{ color: "#1c1c1e" }}>
          {selectedSection || "Settings"}
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Two-pane in landscape, single pane in portrait */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* ─── Sidebar (always visible in landscape, only when no selection in portrait) ─── */}
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
                {/* Profile header (Laolu-inspired) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    padding: "16px 18px",
                    marginBottom: 20,
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "2.5px solid #34c759",
                    }}
                  >
                    <Image src={profile.photo} alt="Caleb Newton" width={60} height={60} style={{ objectFit: "cover" }} />
                  </div>
                  <div>
                    <p className="font-poppins" style={{ fontSize: 16, fontWeight: 700, color: "#1c1c1e" }}>
                      Caleb Newton
                    </p>
                    <p style={{ fontSize: 13, color: "#636366" }}>USC Freshman · CS + Applied Math</p>
                    <p style={{ fontSize: 12, color: "#34c759", marginTop: 2 }}>calebnew@usc.edu</p>
                  </div>
                </motion.div>

                {/* Sections list */}
                {personalSettings.map((sec, gi) => (
                  <motion.div
                    key={sec.section}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: gi * 0.06 }}
                    style={{ marginBottom: 16 }}
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedSection(sec.section)}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "14px 18px",
                          gap: 12,
                          borderBottom: "0.5px solid rgba(60,60,67,0.12)",
                          background: selectedSection === sec.section ? "rgba(0,122,255,0.06)" : "transparent",
                        }}
                      >
                        <span style={{ fontSize: 22 }}>{sec.icon}</span>
                        <span className="font-poppins" style={{ fontSize: 16, fontWeight: 600, color: "#1c1c1e", flex: 1 }}>
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

        {/* ─── Detail pane ─── */}
        <AnimatePresence mode="wait">
          {selectedSection && (
            <motion.div
              key={selectedSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              {section && (
                <div className="ios-scroll" style={{ overflowY: "auto", padding: "16px 16px 32px" }}>
                  {/* Section header */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span style={{ fontSize: 36 }}>{section.icon}</span>
                    <div>
                      <h2 className="font-poppins" style={{ fontSize: 22, fontWeight: 700, color: "#1c1c1e" }}>
                        {section.section}
                      </h2>
                      <p style={{ fontSize: 13, color: "#636366" }}>
                        {section.items.length} preferences · {section.items.filter((i) => i.type === "toggle-on").length} active
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
                        transition={{ delay: i * 0.05 }}
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
                          <p style={{ fontSize: 12, color: "#8e8e93", marginTop: 1 }}>{item.detail}</p>
                        </div>
                        {item.type === "toggle-on" ? (
                          <IOSToggle on={true} />
                        ) : (
                          <span style={{ fontSize: 14, color: "#8e8e93", maxWidth: 150, textAlign: "right" }}>
                            {item.detail}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Locked note */}
                  {section.items.some((i) => i.type === "toggle-on") && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      style={{
                        fontSize: 12,
                        color: "#8e8e93",
                        textAlign: "center",
                        marginTop: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      These settings are locked ON. They&apos;re not preferences — they&apos;re facts. 🔒
                    </motion.p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {!selectedSection && isLandscape && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 48 }}>⚙️</span>
              <p style={{ fontSize: 16, color: "#636366" }}>Select a category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
