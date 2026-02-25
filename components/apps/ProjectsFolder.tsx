"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

// Map project id to dedicated icon path (falls back to project.image)
const PROJECT_ICONS: Record<string, string> = {
  modellab: "/assets/icons/modellab.png",
};

function ProjectIcon({ project, size }: { project: typeof projects[0]; size: number }) {
  const iconSrc = PROJECT_ICONS[project.id] ?? project.image;
  const color = project.color ?? "#007AFF";

  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      onClick={(e) => {
        e.stopPropagation();
        if (project.live) window.open(project.live, "_blank", "noopener,noreferrer");
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        width: size + 16,
      }}
    >
      {/* Glassmorphic icon */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.2255,
          background: `rgba(255,255,255,0.18)`,
          backdropFilter: "blur(16px) saturate(1.8)",
          WebkitBackdropFilter: "blur(16px) saturate(1.8)",
          border: `1px solid rgba(255,255,255,0.3)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 0 0.5px ${color}44`,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          padding: "14%",
        }}
      >
        {/* Subtle color tint layer */}
        <div style={{
          position: "absolute", inset: 0,
          background: `${color}18`,
          borderRadius: "inherit",
          pointerEvents: "none",
        }} />
        {/* Top gloss */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)",
          borderRadius: "inherit",
          pointerEvents: "none",
        }} />
        {/* Logo image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "relative",
            zIndex: 1,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
          }}
        />
      </div>
      {/* Label */}
      <span style={{
        fontSize: 11,
        color: "white",
        textAlign: "center",
        fontWeight: 500,
        letterSpacing: -0.1,
        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
        maxWidth: size + 12,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        lineHeight: 1.2,
      }}>
        {project.title}
      </span>
    </motion.div>
  );
}

export default function ProjectsFolder({ onClose, orientation }: Props) {
  const isLandscape = orientation === "landscape";
  const iconSize = isLandscape ? 72 : 64;
  const cols = isLandscape ? 4 : 3;

  return (
    <motion.div
      key="folder-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      }}
    >
      {/* Folder card */}
      <motion.div
        key="folder-card"
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(40px) saturate(2)",
          WebkitBackdropFilter: "blur(40px) saturate(2)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 24,
          padding: isLandscape ? "24px 32px 28px" : "20px 24px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
          maxWidth: isLandscape ? 520 : 360,
          width: "90%",
        }}
      >
        {/* Folder title */}
        <div style={{
          textAlign: "center",
          marginBottom: 20,
          color: "white",
          fontSize: isLandscape ? 20 : 18,
          fontWeight: 600,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          letterSpacing: -0.3,
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
        }}>
          Projects
        </div>

        {/* Projects grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: isLandscape ? "20px 16px" : "18px 12px",
          justifyItems: "center",
        }}>
          {projects.map((project) => (
            <ProjectIcon key={project.id} project={project} size={iconSize} />
          ))}
        </div>

        {/* Bottom hint */}
        <div style={{
          textAlign: "center",
          marginTop: 20,
          color: "rgba(255,255,255,0.45)",
          fontSize: 12,
          fontFamily: "-apple-system, sans-serif",
        }}>
          Tap outside to close
        </div>
      </motion.div>
    </motion.div>
  );
}
