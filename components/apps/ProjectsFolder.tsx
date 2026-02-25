"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";

interface Props {
  open: boolean;
  onClose: () => void;
  orientation: string;
  origin?: { x: string; y: string };
}

// Transparent PNG logos — preferred over screenshot JPGs
const PROJECT_ICONS: Record<string, string> = {
  modellab: "/assets/icons/modellab.png",
  tech16: "/assets/icons/tech16-logo.png",
  foodvision: "/assets/icons/foodvision-logo.png",
};

// Images with opaque (non-transparent) backgrounds — displayed cover/fill
const SOLID_BG = new Set([
  "/assets/projects/la-healthcare.png",
  "/assets/projects/nba-prediction.png",
  "/assets/projects/usc-cook-scale.png",
  "/assets/projects/thelines.jpg",
]);

function ProjectIcon({ project, size }: { project: typeof projects[0]; size: number }) {
  const iconSrc = PROJECT_ICONS[project.id] ?? project.image;
  const color = project.color ?? "#007AFF";
  const isJpg = iconSrc.endsWith(".jpg") || iconSrc.endsWith(".jpeg");
  const isSolid = isJpg || SOLID_BG.has(iconSrc);

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
        gap: 5,
        cursor: project.live ? "pointer" : "default",
        width: size + 16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.2255,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          background: isSolid ? "transparent" : `rgba(8,8,18,0.40)`,
          backdropFilter: isSolid ? undefined : "blur(22px) saturate(2.4)",
          WebkitBackdropFilter: isSolid ? undefined : "blur(22px) saturate(2.4)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: `0 4px 18px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 0 0.5px ${color}44`,
          padding: isSolid ? 0 : "12%",
          boxSizing: "border-box",
        }}
      >
        {!isSolid && (
          <>
            <div style={{ position: "absolute", inset: 0, background: `${color}55`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 50%)", pointerEvents: "none" }} />
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: isSolid ? "cover" : "contain",
            position: "relative",
            zIndex: 1,
            filter: isSolid ? undefined : "drop-shadow(0 2px 8px rgba(0,0,0,0.55))",
          }}
        />
      </div>
      <span style={{
        fontSize: 10,
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

export default function ProjectsFolder({ open, onClose, orientation, origin }: Props) {
  const isLandscape = orientation === "landscape";
  const iconSize = isLandscape ? 76 : 68;
  const cols = 3;

  const originX = origin?.x ?? "50%";
  const originY = origin?.y ?? "50%";

  return (
    <AnimatePresence>
      {open && (
        // Backdrop: fades the blur at full screen — no scaling here
        <motion.div
          key="folder-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 25,
            background: "rgba(0,0,0,0.22)",
            backdropFilter: "blur(28px) saturate(1.6)",
            WebkitBackdropFilter: "blur(28px) saturate(1.6)",
          }}
        >
          {/* Card scale wrapper — scales from tap origin, no blur attached */}
          <motion.div
            key="folder-card-wrapper"
            initial={{ scale: 0.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.08, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              transformOrigin: `${originX} ${originY}`,
            }}
          >
            {/* Folder card */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                pointerEvents: "auto",
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(60px) saturate(2.2) brightness(1.1)",
                WebkitBackdropFilter: "blur(60px) saturate(2.2) brightness(1.1)",
                border: "1px solid rgba(255,255,255,0.32)",
                borderRadius: 28,
                padding: isLandscape ? "22px 28px 24px" : "18px 22px 20px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.05)",
                width: isLandscape ? `${cols * (iconSize + 16) + (cols - 1) * 14 + 56}px` : `${cols * (iconSize + 16) + (cols - 1) * 12 + 44}px`,
              }}
            >
              {/* Folder title */}
              <div style={{
                textAlign: "center",
                marginBottom: 16,
                color: "white",
                fontSize: isLandscape ? 18 : 16,
                fontWeight: 600,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                letterSpacing: -0.3,
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}>
                Projects
              </div>

              {/* 3×3 grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, ${iconSize + 16}px)`,
                gap: isLandscape ? "16px 14px" : "14px 12px",
                justifyContent: "center",
              }}>
                {projects.map((project) => (
                  <ProjectIcon key={project.id} project={project} size={iconSize} />
                ))}
              </div>
              {/* No home pill inside — HomeScreen's indicator (z-index 30) handles closing */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
