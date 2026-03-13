"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppId, AppDef } from "@/data/content";
import { apps, dockApps } from "@/data/content";
import TypedGreeting from "@/components/TypedGreeting";

interface Props {
  orientation: "landscape" | "portrait";
  onOpenApp: (id: AppId) => void;
  locked: boolean;
  onUnlock: () => void;
  folderOpen: boolean;
  onFolderOpen: (origin: { x: string; y: string }) => void;
  onFolderClose: () => void;
}

function WorkCalendarIcon({ size }: { size: number }) {
  const now = new Date();
  const dayStr = now.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = now.getDate();
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.2255, overflow: "hidden",
      background: "white", display: "flex", flexDirection: "column", flexShrink: 0,
      boxShadow: "0 0 0 0.5px rgba(0,0,0,0.14)",
    }}>
      {/* Day of week — anchored to bottom of its section so it sits lower */}
      <div style={{ height: size * 0.32, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: size * 0.015 }}>
        <span style={{ fontSize: size * 0.14, fontWeight: 700, color: "#FF3B30", fontFamily: "-apple-system, sans-serif", letterSpacing: 0.6, lineHeight: 1 }}>
          {dayStr.toUpperCase()}
        </span>
      </div>
      {/* Day number — anchored to top of its section so it sits higher */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: size * 0.01 }}>
        <span style={{ fontSize: size * 0.60, fontWeight: 100, color: "#1c1c1e", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif", lineHeight: 1 }}>
          {dayNum}
        </span>
      </div>
    </div>
  );
}

function AppIcon({
  app,
  size,
  onTap,
  showLabel = true,
}: {
  app: AppDef;
  size: number;
  onTap: (e: React.MouseEvent) => void;
  showLabel?: boolean;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      onClick={(e) => onTap(e)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: "pointer",
        width: size + 20,
      }}
    >
      <div
        className="app-icon"
        style={{
          width: size,
          height: size,
          background: app.icon
            ? "rgba(255,255,255,0.18)"
            : `linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]})`,
          backdropFilter: app.icon ? "blur(18px) saturate(1.8)" : undefined,
          WebkitBackdropFilter: app.icon ? "blur(18px) saturate(1.8)" : undefined,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {app.id === "work" ? (
          <WorkCalendarIcon size={size} />
        ) : app.id === "projects" ? (
          // iPadOS folder style — ventures grid
          <div style={{
            width: "100%", height: "100%",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(12px) saturate(1.6)",
            WebkitBackdropFilter: "blur(12px) saturate(1.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "22%",
            boxSizing: "border-box",
          }}>
            <div style={{
              width: "100%", height: "100%",
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr",
              gap: "12%",
            }}>
              {([
                { img: "/assets/ventures/isaac-newton.png" },
                { color: "#0f0f23" },
                { color: "#0a3d55" },
                { color: "#1a4a2e" },
                { color: "#3a1a4a" },
                { color: "#1a2a4a" },
                { color: "#1a4a1a" },
                null,
                null,
              ] as ({ img: string } | { color: string } | null)[]).map((item, i) =>
                item === null ? (
                  <div key={i} />
                ) : "img" in item ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <div key={i} style={{
                    background: "white",
                    borderRadius: "20%",
                    overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <img src={item.img} alt="" style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                  </div>
                ) : (
                  <div key={i} style={{
                    background: `linear-gradient(135deg, ${item.color}cc, ${item.color})`,
                    borderRadius: "20%",
                  }} />
                )
              )}
            </div>
          </div>
        ) : app.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={app.icon}
            alt={app.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: app.id === "settings" ? "scale(1.05)" : undefined }}
          />
        ) : (
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

      {showLabel && (
        <span
          style={{
            fontSize: 11,
            color: "white",
            textAlign: "center",
            fontWeight: 500,
            letterSpacing: -0.1,
            textShadow: "0 1px 6px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.5)",
            maxWidth: size + 16,
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

export default function HomeScreen({ orientation, onOpenApp, locked, onUnlock, folderOpen, onFolderOpen, onFolderClose }: Props) {
  const isLandscape = orientation === "landscape";

  const [time, setTime] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Grid layout
  const cols = isLandscape ? 5 : 4;
  const iconSize = isLandscape ? 68 : 72;

  const dockAppDefs = dockApps.map((id) => apps.find((a) => a.id === id)!).filter(Boolean);

  const nonDockApps = apps.filter((app) => !dockApps.includes(app.id));
  // In landscape (5 cols), insert null spacers at center column (col 3) to avoid Caleb's face
  const gridItems: (AppDef | null)[] = isLandscape
    ? (() => {
        const result: (AppDef | null)[] = [];
        for (const app of nonDockApps) {
          if (result.length % 5 === 2) result.push(null);
          result.push(app);
        }
        return result;
      })()
    : (() => {
        // Portrait: skip middle 2 cols so apps flank Caleb's face
        const result: (AppDef | null)[] = [];
        for (const app of nonDockApps) {
          const col = result.length % 4;
          if (col === 1) { result.push(null); result.push(null); }
          result.push(app);
        }
        return result;
      })();

  const handleOpen = (app: AppDef, e: React.MouseEvent) => {
    if (app.id === "projects") {
      // Origin relative to the iPad screen container for correct scale animation
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%";
        const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%";
        onFolderOpen({ x, y });
      } else {
        onFolderOpen({ x: "50%", y: "50%" });
      }
      return;
    }
    if (app.external) {
      window.open(app.external, "_blank", "noopener,noreferrer");
    } else {
      onOpenApp(app.id);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Wallpaper */}
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
      {/* Scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.15)",
          zIndex: 1,
        }}
      />

      {/* Lock Screen */}
      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={onUnlock}
            onPointerDown={(e) => {
              const startX = e.clientX;
              const startY = e.clientY;
              const onUp = (up: PointerEvent) => {
                const dx = up.clientX - startX;
                const dy = up.clientY - startY;
                if (Math.abs(dx) > 12 || Math.abs(dy) > 12) onUnlock();
                window.removeEventListener("pointerup", onUp);
              };
              window.addEventListener("pointerup", onUp);
            }}
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

            {/* Name + typed subtitle */}
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
              <div style={{ marginTop: 6 }}>
                <TypedGreeting fontSize={13} isLandscape={isLandscape} />
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
                fontFamily: "-apple-system, sans-serif",
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
              <span>Swipe to unlock</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Screen Content */}
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
            justifyContent: "flex-start",
            padding: isLandscape ? "40px 20px 8px" : "48px 16px 8px",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: isLandscape ? "18px 8px" : "20px 4px",
              justifyItems: "center",
              alignContent: "start",
            }}
          >
            {gridItems.map((app, i) =>
              app === null ? (
                <div key={`spacer-${i}`} style={{ width: iconSize + 20, height: iconSize + 24, visibility: "hidden" }} />
              ) : (
                <AppIcon key={app.id} app={app} size={iconSize} onTap={(e) => handleOpen(app, e)} />
              )
            )}
          </motion.div>
        </div>

        {/* Liquid Glass Dock */}
        <div style={{ padding: isLandscape ? "0 20px 8px" : "0 14px 10px", flexShrink: 0 }}>
          <div
            className="dock"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: isLandscape ? "8px 16px" : "9px 12px",
            }}
          >
            {dockAppDefs.map((app) => (
              <AppIcon
                key={app.id}
                app={app}
                size={isLandscape ? 48 : 52}
                onTap={(e) => handleOpen(app, e)}
                showLabel={false}
              />
            ))}
          </div>
        </div>

        {/* Home indicator — always visible, sits ABOVE folder overlay (zIndex 30) */}
        <div
          onClick={() => { if (folderOpen) onFolderClose(); }}
          style={{
            height: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 4,
            flexShrink: 0,
            cursor: folderOpen ? "pointer" : "default",
            position: "relative",
            zIndex: 30, // always above folder overlay (z-index 25)
          }}
        >
          <motion.div
            animate={{ scaleX: folderOpen ? 1.2 : 1, opacity: folderOpen ? 0.85 : 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            style={{
              width: 120,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.6)",
            }}
          />
        </div>
      </div>

    </div>
  );
}
