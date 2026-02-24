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
      whileHover={{ scale: 1.1 }}
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
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {app.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={app.icon}
            alt={app.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          // Fallback: first letter of app name, no emoji
          <span
            style={{
              position: "relative",
              zIndex: 2,
              fontSize: size * 0.4,
              fontWeight: 600,
              color: "white",
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {app.name[0]}
          </span>
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
            textShadow: "0 1px 6px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.5)",
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

  const cols = isLandscape ? 6 : 4;
  const rows = isLandscape ? 3 : 4;
  const iconsPerPage = cols * rows;
  const iconSize = isLandscape ? 60 : 66;

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
      {/* ─── Wallpaper: beach photo ─── */}
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
      {/* Subtle scrim for icon readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          zIndex: 1,
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
            {/* Frosted overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
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
                  fontSize: isLandscape ? 60 : 72,
                  fontWeight: 200,
                  letterSpacing: -2,
                  lineHeight: 1,
                }}
              >
                {timeStr}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginTop: 8,
                  opacity: 0.9,
                  letterSpacing: 0.1,
                }}
              >
                {dateStr}
              </div>
            </div>

            {/* Name + subtitle */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                color: "white",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              }}
            >
              <div style={{ fontSize: isLandscape ? 20 : 22, fontWeight: 600, letterSpacing: -0.4 }}>
                Caleb Newton
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 4, letterSpacing: 0.1 }}>
                USC · CS + Applied Math
              </div>
            </div>

            {/* Tap to unlock */}
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

      {/* ─── Home Screen Content ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* App grid */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: isLandscape ? "12px 16px 4px" : "16px 12px 4px",
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
                gap: isLandscape ? "4px 0" : "8px 0",
                placeItems: "center",
              }}
            >
              {(pages[page] || []).map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 400, damping: 25 }}
                >
                  <AppIcon app={app} size={iconSize} onTap={() => handleOpen(app)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Page dots */}
          {pages.length > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, paddingBottom: 4 }}>
              {pages.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === page ? 18 : 6,
                    background: i === page ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                  }}
                  style={{ height: 6, borderRadius: 3, cursor: "pointer" }}
                  onClick={() => setPage(i)}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ─── Liquid Glass Dock ─── */}
        <div style={{ padding: isLandscape ? "0 14px 6px" : "0 10px 8px", flexShrink: 0 }}>
          <div className="dock" style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: isLandscape ? "6px 14px" : "7px 10px", gap: 2 }}>
            {dockAppDefs.map((app) => (
              <AppIcon
                key={app.id}
                app={app}
                size={isLandscape ? 44 : 48}
                onTap={() => handleOpen(app)}
                showLabel={false}
              />
            ))}
          </div>
        </div>

        {/* ─── Home indicator ─── */}
        <div style={{ height: 10, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 4, flexShrink: 0 }}>
          <div style={{ width: 120, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>
    </div>
  );
}
