"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

// Today's App hero - the featured project at the top
function TodayCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, type: "spring", stiffness: 300, damping: 28 }}
      style={{
        margin: "0 16px 28px",
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
      }}
    >
      {/* Hero image */}
      <div style={{ width: "100%", height: 180, overflow: "hidden", position: "relative", background: project.color }}>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 900, color: "rgba(255,255,255,0.3)", fontFamily: "-apple-system, sans-serif" }}>
              {project.title[0]}
            </span>
          </div>
        )}
        {/* gradient overlay at bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 18px 18px" }}>
        {/* Project icon + "Today's App" */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: `linear-gradient(145deg, ${project.color}, ${project.color}bb)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 3px 12px ${project.color}55`,
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, color: "white", fontFamily: "-apple-system, sans-serif" }}>
              {project.title[0]}
            </span>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#007aff", letterSpacing: 0.2 }}>
              TODAY&apos;S APP
            </div>
          </div>
        </div>

        {/* Title */}
        <h2
          className="font-poppins"
          style={{ fontSize: 22, fontWeight: 800, color: "#1c1c1e", letterSpacing: -0.5, marginBottom: 8, lineHeight: 1.2 }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.6, marginBottom: 14 }}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#3a3a3c",
                background: "#f2f2f7",
                border: "0.5px solid rgba(60,60,67,0.2)",
                borderRadius: 20,
                padding: "4px 10px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#f2f2f7",
                color: "#1c1c1e",
                borderRadius: 20,
                padding: "9px 20px",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              GET
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#007aff",
                textDecoration: "none",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              GitHub {"\u2197"}
            </a>
          )}
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#8e8e93", fontWeight: 500 }}>{project.category}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Expandable "Popular Apps" row
function AppRow({ project, index, expanded, onToggle }: {
  project: typeof projects[0];
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.05, type: "spring", stiffness: 320, damping: 30 }}
      style={{
        background: "white",
        borderRadius: 16,
        margin: "0 16px 10px",
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
      }}
    >
      {/* Collapsed row */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", cursor: "pointer" }}
        onClick={onToggle}
      >
        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            overflow: "hidden",
            flexShrink: 0,
            background: `linear-gradient(145deg, ${project.color}, ${project.color}99)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 2px 8px ${project.color}44`,
            position: "relative",
          }}
        >
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 22, fontWeight: 900, color: "white", fontFamily: "-apple-system, sans-serif" }}>
              {project.title[0]}
            </span>
          )}
          {/* shine */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 55%)", pointerEvents: "none", borderRadius: "inherit" }} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1c1c1e", marginBottom: 2, fontFamily: "-apple-system, sans-serif" }}>
            {project.title}
          </div>
          <div style={{ fontSize: 12, color: "#8e8e93", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {project.subtitle}
          </div>
        </div>

        {/* Right: GET + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#f2f2f7",
                color: "#1c1c1e",
                borderRadius: 20,
                padding: "5px 14px",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              GET
            </a>
          )}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
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
            <div style={{ padding: "4px 16px 16px 86px", borderTop: "0.5px solid rgba(60,60,67,0.12)" }}>
              <p style={{ fontSize: 13, color: "#3a3a3c", lineHeight: 1.65, marginBottom: 12, marginTop: 12 }}>
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
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
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
                    style={{ background: project.color, color: "white", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                  >
                    Live Demo {"\u2197"}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: "#f2f2f7", color: "#1c1c1e", border: "1px solid #e5e5ea", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
                  >
                    GitHub {"\u2197"}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsApp({ onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 0 32px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "4px 16px 16px" }}
        >
          <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e" }}>
            Caleb&apos;s Projects
          </h1>
        </motion.div>

        {/* Featured "Today's App" */}
        <TodayCard project={featured} />

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ padding: "0 16px 12px" }}
        >
          <h2 className="font-poppins" style={{ fontSize: 20, fontWeight: 800, color: "#1c1c1e", letterSpacing: -0.4 }}>
            Popular Apps
          </h2>
        </motion.div>

        {/* Expandable list */}
        {rest.map((project, i) => (
          <AppRow
            key={project.id}
            project={project}
            index={i}
            expanded={expanded === project.id}
            onToggle={() => setExpanded((prev) => (prev === project.id ? null : project.id))}
          />
        ))}
      </div>
    </div>
  );
}
