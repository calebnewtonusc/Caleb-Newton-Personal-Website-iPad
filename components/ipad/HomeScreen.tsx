"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppId, AppDef } from "@/data/content";
import { apps, dockApps } from "@/data/content";

interface Props {
  orientation: "landscape" | "portrait";
  onOpenApp: (id: AppId) => void;
}

function AppIcon({
  app,
  size,
  onTap,
}: {
  app: AppDef;
  size: number;
  onTap: () => void;
}) {
  const isEmoji = app.emoji.length <= 3;

  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      onClick={onTap}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        width: size + 20,
      }}
    >
      {/* Icon */}
      <div
        className="app-icon"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]})`,
          fontSize: size * 0.44,
        }}
      >
        <span style={{ position: "relative", zIndex: 2 }}>{app.emoji}</span>
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 11,
          color: "white",
          textAlign: "center",
          fontWeight: 500,
          letterSpacing: -0.1,
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          maxWidth: size + 12,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
        }}
      >
        {app.name}
      </span>
    </motion.div>
  );
}

export default function HomeScreen({ orientation, onOpenApp }: Props) {
  const isLandscape = orientation === "landscape";
  const [page, setPage] = useState(0);

  // Grid config per orientation
  const cols = isLandscape ? 6 : 4;
  const rows = isLandscape ? 3 : 4;
  const iconsPerPage = cols * rows;
  const iconSize = isLandscape ? 64 : 72;

  // Split apps across pages
  const gridApps = apps.filter((a) => !dockApps.includes(a.id) || true);
  const pages = [];
  for (let i = 0; i < gridApps.length; i += iconsPerPage) {
    pages.push(gridApps.slice(i, i + iconsPerPage));
  }

  const dockAppDefs = dockApps.map((id) => apps.find((a) => a.id === id)!);

  const handleOpen = (app: AppDef) => {
    if (app.external) {
      window.open(app.external, "_blank", "noopener,noreferrer");
    } else {
      onOpenApp(app.id);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ─── Wallpaper ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isLandscape
            ? "linear-gradient(135deg, #0f1f0f 0%, #1a2e1a 30%, #0e2818 60%, #162412 100%)"
            : "linear-gradient(160deg, #0f1f0f 0%, #1a2e1a 35%, #0e2818 70%, #162412 100%)",
          zIndex: 0,
        }}
      />
      {/* Wallpaper subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(52,199,89,0.18) 0%, transparent 60%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ─── App grid pages ─── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: isLandscape ? "16px 20px 8px" : "20px 16px 8px",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              flex: 1,
              gap: isLandscape ? "8px 4px" : "12px 4px",
              placeItems: "center",
            }}
          >
            {(pages[page] || []).map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: i * 0.04,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <AppIcon
                  app={app}
                  size={iconSize}
                  onTap={() => handleOpen(app)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Page indicators */}
        {pages.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              paddingBottom: 8,
            }}
          >
            {pages.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === page ? 20 : 6,
                  background:
                    i === page
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.35)",
                }}
                style={{ height: 6, borderRadius: 3, cursor: "pointer" }}
                onClick={() => setPage(i)}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── Dock ─── */}
      <div
        style={{
          padding: isLandscape ? "0 24px 12px" : "0 16px 14px",
          zIndex: 3,
          flexShrink: 0,
        }}
      >
        <div
          className="dock"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: isLandscape ? "8px 20px" : "10px 16px",
            gap: 8,
          }}
        >
          {dockAppDefs.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              size={isLandscape ? 56 : 60}
              onTap={() => handleOpen(app)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
