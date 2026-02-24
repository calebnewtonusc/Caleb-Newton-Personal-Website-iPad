"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

// App Store-style icon background using project color gradient
function AppStoreIcon({ color, title }: { color: string; title: string }) {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: 14,
        background: `linear-gradient(145deg, ${color}, ${color}bb)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: `0 4px 12px ${color}44`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Icon shine */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 55%)",
          borderRadius: "inherit",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          fontSize: 26,
          fontWeight: 900,
          color: "white",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          letterSpacing: -1,
          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {title[0].toUpperCase()}
      </span>
    </div>
  );
}

export default function ProjectsApp({ onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      {/* Nav Bar */}
      <div className="ios-nav-bar">
        <button
          onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </button>
        <span className="ios-headline" style={{ color: "#1c1c1e" }}>Caleb&apos;s Projects</span>
        <div style={{ width: 60 }} />
      </div>

      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 0 32px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "0 16px 16px" }}
        >
          <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>
            Projects
          </h1>
          <p style={{ fontSize: 15, color: "#636366" }}>Building things that matter</p>
        </motion.div>

        {/* App Store list */}
        <div style={{ background: "white", borderRadius: 16, margin: "0 16px", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Row */}
              <div
                style={{
                  borderBottom: i < projects.length - 1 ? "0.5px solid rgba(60,60,67,0.15)" : "none",
                }}
              >
                {/* Main row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    cursor: "pointer",
                  }}
                  onClick={() => toggle(project.id)}
                >
                  <AppStoreIcon color={project.color} title={project.title} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <h3 className="font-poppins" style={{ fontSize: 15, fontWeight: 700, color: "#1c1c1e" }}>
                        {project.title}
                      </h3>
                      <span style={{ fontSize: 10, color: "#8e8e93", flexShrink: 0, marginLeft: 8 }}>{project.year}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#636366", marginBottom: 6 }}>
                      {project.subtitle}
                    </p>
                    {/* Tech tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 10,
                            color: project.color,
                            background: `${project.color}15`,
                            borderRadius: 5,
                            padding: "2px 6px",
                            fontWeight: 600,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* GET button */}
                  <a
                    href={project.live || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flexShrink: 0,
                      background: "transparent",
                      border: `1.5px solid ${project.color}`,
                      color: project.color,
                      borderRadius: 20,
                      padding: "5px 14px",
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                      letterSpacing: -0.2,
                      cursor: "pointer",
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    GET
                  </a>
                </div>

                {/* Expandable detail */}
                <AnimatePresence>
                  {expanded === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 35 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 16px 16px 90px",
                          borderTop: "0.5px solid rgba(60,60,67,0.1)",
                        }}
                      >
                        <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.6, marginBottom: 12, marginTop: 12 }}>
                          {project.description}
                        </p>
                        {/* All tech */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: 11,
                                color: project.color,
                                background: `${project.color}18`,
                                border: `1px solid ${project.color}33`,
                                borderRadius: 8,
                                padding: "3px 8px",
                                fontWeight: 600,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        {/* Links */}
                        <div style={{ display: "flex", gap: 8 }}>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: project.color,
                                color: "white",
                                borderRadius: 10,
                                padding: "9px 16px",
                                fontSize: 13,
                                fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              Live Demo ↗
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                background: "#f2f2f7",
                                color: "#1c1c1e",
                                border: "1px solid #e5e5ea",
                                borderRadius: 10,
                                padding: "9px 16px",
                                fontSize: 13,
                                fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              GitHub ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
