"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";

interface Props {
  open: boolean;
  onClose: () => void;
  orientation: string;
  origin?: { x: string; y: string };
}

function ProjectIcon({ project, size }: { project: typeof projects[0]; size: number }) {
  const logoSrc = (project as { logo?: string | null }).logo;
  const logoBg = (project as { logoBg?: string }).logoBg;
  const comingSoon = (project as { comingSoon?: boolean }).comingSoon;
  const isClickable = project.live && project.live !== "#";

  return (
    <motion.div
      whileTap={{ scale: isClickable ? 0.85 : 1 }}
      whileHover={{ scale: isClickable ? 1.08 : 1.03 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      onClick={(e) => {
        e.stopPropagation();
        if (isClickable) window.open(project.live, "_blank", "noopener,noreferrer");
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: isClickable ? "pointer" : "default",
        width: size + 16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.2255,
          overflow: "hidden",
          flexShrink: 0,
          background: logoBg ?? `linear-gradient(135deg, ${project.color}cc, ${project.color})`,
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: `0 4px 18px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.22)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {logoSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={logoSrc}
            alt={project.title}
            style={{ width: "80%", height: "80%", objectFit: "contain" }}
          />
        ) : (
          <span style={{
            color: "white",
            fontWeight: 800,
            fontSize: size * 0.28,
            fontFamily: "-apple-system, sans-serif",
            letterSpacing: "-0.03em",
            textAlign: "center",
            padding: "0 4px",
          }}>
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        )}
        {comingSoon && (
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            fontSize: size * 0.12,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            fontFamily: "-apple-system, sans-serif",
            fontWeight: 600,
            letterSpacing: 0.2,
            padding: "2px 0 3px",
          }}>
            SOON
          </div>
        )}
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
        // Backdrop: animate blur + dark tint together to avoid light-flash artifact
        <motion.div
          key="folder-root"
          initial={{ background: "rgba(0,0,0,0)", backdropFilter: "blur(0px) saturate(1)" }}
          animate={{ background: "rgba(0,0,0,0.22)", backdropFilter: "blur(28px) saturate(1.6)" }}
          exit={{ background: "rgba(0,0,0,0)", backdropFilter: "blur(0px) saturate(1)" }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 25,
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
                Ventures
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
