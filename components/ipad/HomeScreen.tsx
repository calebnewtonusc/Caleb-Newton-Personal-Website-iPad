"use client";

import { useState, useEffect } from "react";
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
  showLabel = true,
}: {
  app: AppDef;
  size: number;
  onTap: () => void;
  showLabel?: boolean;
}) {
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
        gap: 5,
        cursor: "pointer",
        width: size + 16,
      }}
    >
      {/* Icon */}
      <div
        className="app-icon"
        style={{
          width: size,
          height: size,
          background: app.icon
            ? "transparent"
            : `linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]})`,
          fontSize: size * 0.44,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {app.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={app.icon}
            alt={app.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span style={{ position: "relative", zIndex: 2 }}>{app.emoji}</span>
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span
          style={{
            fontSize: 10,
            color: "white",
            textAlign: "center",
            fontWeight: 500,
            letterSpacing: -0.1,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            maxWidth: size + 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
          }}
        >
          {app.name}
        </span>
      )}
    </motion.div>
  );
}

export default function HomeScreen({ orientation, onOpenApp }: Props) {
  const isLandscape = orientation === "landscape";
  const [page, setPage] = useState(0);
  const [locked, setLocked] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Grid config per orientation
  const cols = isLandscape ? 6 : 4;
  const rows = isLandscape ? 3 : 4;
  const iconsPerPage = cols * rows;
  const iconSize = isLandscape ? 62 : 70;

  const pages: AppDef[][] = [];
  for (let i = 0; i < apps.length; i += iconsPerPage) {
    pages.push(apps.slice(i, i + iconsPerPage));
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/CalebAtBeachUSCHoodie.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.22)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ─── Lock Screen ─── */}
      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => setLocked(false)}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              cursor: "pointer",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isLandscape ? "18px 0 14px" : "28px 0 18px",
            }}
          >
            {/* Lock wallpaper */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/CalebAtBeachUSCHoodie.jpg"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
            {/* frosted dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            />

            {/* Time + Date */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                color: "white",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              }}
            >
              <div
                style={{
                  fontSize: isLandscape ? 56 : 68,
                  fontWeight: 200,
                  letterSpacing: -2,
                  lineHeight: 1,
                }}
              >
                {timeStr}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginTop: 7,
                  opacity: 0.88,
                  letterSpacing: 0.1,
                }}
              >
                {dateStr}
              </div>
            </div>

            {/* Name + bio */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                color: "white",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              }}
            >
              <div
                style={{
                  fontSize: isLandscape ? 20 : 22,
                  fontWeight: 600,
                  letterSpacing: -0.4,
                }}
              >
                Caleb Newton
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  marginTop: 4,
                  letterSpacing: 0.1,
                }}
              >
                USC · CS + Applied Math
              </div>
            </div>

            {/* Swipe up hint */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                color: "rgba(255,255,255,0.55)",
                fontSize: 12,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                letterSpacing: 0.2,
              }}
            >
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 15l-6-6-6 6"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <span>Tap to unlock</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Home Screen Content (z:2, always rendered behind lock) ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* App grid pages */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: isLandscape ? "14px 18px 6px" : "18px 14px 6px",
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
                gap: isLandscape ? "6px 2px" : "10px 2px",
                placeItems: "center",
              }}
            >
              {(pages[page] || []).map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: i * 0.035,
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
                paddingBottom: 6,
              }}
            >
              {pages.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === page ? 18 : 6,
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
            padding: isLandscape ? "0 20px 8px" : "0 14px 10px",
            flexShrink: 0,
          }}
        >
          <div
            className="dock"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: isLandscape ? "8px 24px" : "10px 20px",
              gap: 8,
            }}
          >
            {dockAppDefs.map((app) => (
              <AppIcon
                key={app.id}
                app={app}
                size={isLandscape ? 54 : 58}
                onTap={() => handleOpen(app)}
              />
            ))}
          </div>
        </div>

        {/* ─── Home indicator ─── */}
        <div
          style={{
            height: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 3,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 100,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.45)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
