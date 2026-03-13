"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
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

const COLS = 3;
const ROWS = 3;
const PER_PAGE = COLS * ROWS;

export default function ProjectsFolder({ open, onClose, orientation, origin }: Props) {
  const isLandscape = orientation === "landscape";
  const iconSize = isLandscape ? 76 : 68;
  const [page, setPage] = useState(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardWidth = isLandscape
    ? COLS * (iconSize + 16) + (COLS - 1) * 14 + 56
    : COLS * (iconSize + 16) + (COLS - 1) * 12 + 44;

  const page1 = projects.filter((p) => !(p as { page?: number }).page || (p as { page?: number }).page === 1);
  const page2 = projects.filter((p) => (p as { page?: number }).page === 2);
  const pages = [page1, page2].filter((p) => p.length > 0);
  const totalPages = pages.length;

  const originX = origin?.x ?? "50%";
  const originY = origin?.y ?? "50%";

  const onWheel = (e: React.WheelEvent) => {
    // Only act on predominantly horizontal scroll (trackpad 2-finger swipe)
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    wheelAccum.current += e.deltaX;
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => { wheelAccum.current = 0; }, 300);
    if (wheelAccum.current > 60) {
      wheelAccum.current = 0;
      setPage((p) => Math.min(p + 1, totalPages - 1));
    } else if (wheelAccum.current < -60) {
      wheelAccum.current = 0;
      setPage((p) => Math.max(p - 1, 0));
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!swipeStart.current) return;
    const dx = e.clientX - swipeStart.current.x;
    const dy = e.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(dx) < 8) return; // treat as tap
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -40 && page < totalPages - 1) setPage((p) => p + 1);
      else if (dx > 40 && page > 0) setPage((p) => p - 1);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="folder-root"
          initial={{ background: "rgba(0,0,0,0)", backdropFilter: "blur(0px) saturate(1)" }}
          animate={{ background: "rgba(0,0,0,0.22)", backdropFilter: "blur(28px) saturate(1.6)" }}
          exit={{ background: "rgba(0,0,0,0)", backdropFilter: "blur(0px) saturate(1)" }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ position: "absolute", inset: 0, zIndex: 25, WebkitBackdropFilter: "blur(28px) saturate(1.6)" }}
        >
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
                padding: isLandscape ? "22px 28px 20px" : "18px 22px 16px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.05)",
                width: `${cardWidth}px`,
                overflow: "hidden",
              }}
            >
              {/* Title */}
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

              {/* Swipeable pages */}
              <div
                style={{ overflow: "hidden", touchAction: "pan-y" }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onWheel={onWheel}
              >
                <motion.div
                  animate={{ x: -page * cardWidth }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  style={{ display: "flex", width: `${totalPages * cardWidth}px` }}
                >
                  {pages.map((pageProjects, pi) => (
                    <div
                      key={pi}
                      style={{
                        width: cardWidth,
                        flexShrink: 0,
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, ${iconSize + 16}px)`,
                        gap: isLandscape ? "16px 14px" : "14px 12px",
                        justifyContent: "center",
                        minHeight: isLandscape ? `${ROWS * (iconSize + 30)}px` : `${ROWS * (iconSize + 28)}px`,
                        alignContent: "start",
                      }}
                    >
                      {pageProjects.map((project) => (
                        <ProjectIcon key={project.id} project={project} size={iconSize} />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Page dots */}
              {totalPages > 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 6,
                  marginTop: 14,
                }}>
                  {pages.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: i === page ? 1 : 0.35, scale: i === page ? 1 : 0.8 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setPage(i)}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "white",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
