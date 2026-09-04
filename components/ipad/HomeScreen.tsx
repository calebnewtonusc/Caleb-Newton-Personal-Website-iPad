"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { AppId, AppDef } from "@/data/content";
import { apps, dockApps } from "@/data/content";
import { useClock } from "../useClock";
import TypedGreeting from "@/components/TypedGreeting";

interface Props {
  orientation: "landscape" | "portrait";
  onOpenApp: (id: AppId, origin?: { x: number; y: number }) => void;
  locked: boolean;
  onUnlock: () => void;
}

function LiveCalendarIcon({ size }: { size: number }) {
  const now = useClock();

  const dayStr = now
    ? now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
    : "";
  const dayNum = now ? now.getDate() : "";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.2255,
        overflow: "hidden",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        boxShadow: "0 0 0 0.5px rgba(0,0,0,0.14)",
      }}
    >
      <div
        style={{
          height: size * 0.32,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: size * 0.015,
        }}
      >
        <span
          style={{
            fontSize: size * 0.14,
            fontWeight: 700,
            color: "#FF3B30",
            fontFamily: "-apple-system, sans-serif",
            letterSpacing: 0.6,
            lineHeight: 1,
          }}
        >
          {dayStr}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: size * 0.01,
        }}
      >
        <span
          style={{
            fontSize: size * 0.6,
            fontWeight: 100,
            color: "var(--label)",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            lineHeight: 1,
          }}
        >
          {dayNum}
        </span>
      </div>
    </div>
  );
}


/* Touch and hold an icon, the way iPadOS gives you Quick Actions. */
const QUICK_ACTIONS: Partial<
  Record<AppId, { label: string; href?: string; hash?: string }[]>
> = {
  health: [
    { label: "Read my freshman year", hash: "#health" },
    { label: "History", hash: "#health" },
  ],
  work: [
    {
      label: "Open my resume",
      href: "https://docs.google.com/document/d/1BbwPRdFOPsMvyVyIQIpNwfNJPKM25lMFfRvBrvR8Bqs/edit?usp=sharing",
    },
  ],
  contact: [{ label: "Email me", href: "mailto:calebnew@usc.edu" }],
  settings: [{ label: "What I am about", hash: "#settings" }],
  files: [{ label: "Current", hash: "#files" }],
  calebgpt: [{ label: "Ask about Caleb", hash: "#calebgpt" }],
};

function ContextMenu({
  app,
  rect,
  onClose,
  onOpen,
}: {
  app: AppDef;
  rect: DOMRect;
  onClose: () => void;
  onOpen: () => void;
}) {
  const actions = QUICK_ACTIONS[app.id] ?? [];
  const left = Math.min(rect.left, window.innerWidth - 230);
  const top = Math.min(rect.bottom + 10, window.innerHeight - 190);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,0.28)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.86, opacity: 0, y: -6 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.86, opacity: 0, y: -6 }}
        transition={{ type: "spring", stiffness: 480, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          left,
          top,
          width: 214,
          borderRadius: 14,
          overflow: "hidden",
          background: "rgba(250,250,250,0.86)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.4)",
          transformOrigin: "top left",
        }}
      >
        <div
          style={{
            padding: "9px 14px",
            fontSize: 12,
            fontWeight: 600,
            color: "#6e6e73",
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          {app.name}
        </div>
        <button
          onClick={() => {
            onOpen();
            onClose();
          }}
          style={rowStyle(true)}
        >
          Open
        </button>
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => {
              if (a.href) window.open(a.href, "_blank", "noopener,noreferrer");
              else if (a.hash) onOpen();
              onClose();
            }}
            style={rowStyle(false)}
          >
            {a.label}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}

function rowStyle(first: boolean): React.CSSProperties {
  return {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "11px 14px",
    fontSize: 15,
    color: "#1c1c1e",
    background: "none",
    border: "none",
    borderTop: first ? "0.5px solid rgba(60,60,67,0.2)" : "0.5px solid rgba(60,60,67,0.12)",
    cursor: "pointer",
    font: "inherit",
    fontFamily: "-apple-system, sans-serif",
    minHeight: 44,
  };
}

function AppIcon({
  app,
  size,
  onTap,
  onHold,
  showLabel = true,
}: {
  app: AppDef;
  size: number;
  onTap: (rect: DOMRect) => void;
  onHold?: (rect: DOMRect) => void;
  showLabel?: boolean;
}) {
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heldRef = useRef(false);
  return (
    <motion.button
      type="button"
      aria-label={
        app.external ? `${app.name}, opens in a new tab` : `Open ${app.name}`
      }
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      onContextMenu={(e) => {
        if (!onHold) return;
        e.preventDefault();
        onHold(e.currentTarget.getBoundingClientRect());
      }}
      onPointerDown={(e) => {
        if (!onHold) return;
        heldRef.current = false;
        const rect = e.currentTarget.getBoundingClientRect();
        holdRef.current = setTimeout(() => {
          heldRef.current = true;
          onHold(rect);
        }, 480);
      }}
      onPointerUp={() => {
        if (holdRef.current) clearTimeout(holdRef.current);
      }}
      onPointerLeave={() => {
        if (holdRef.current) clearTimeout(holdRef.current);
      }}
      onClick={(e) => {
        if (heldRef.current) {
          heldRef.current = false;
          return;
        }
        onTap(e.currentTarget.getBoundingClientRect());
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: "pointer",
        width: size + 20,
        background: "none",
        border: "none",
        padding: 0,
        font: "inherit",
        color: "inherit",
      }}
    >
      <div
        className="app-icon"
        style={{
          width: size,
          height: size,
          background:
            app.id === "calendar"
              ? "transparent"
              : app.icon
                ? "rgba(255,255,255,0.18)"
                : `linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]})`,
          backdropFilter:
            app.id !== "calendar" && app.icon
              ? "blur(18px) saturate(1.8)"
              : undefined,
          WebkitBackdropFilter:
            app.id !== "calendar" && app.icon
              ? "blur(18px) saturate(1.8)"
              : undefined,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {app.id === "calendar" ? (
          <LiveCalendarIcon size={size} />
        ) : app.icon ? (
           
          <Image
            src={app.icon}
            alt=""
            fill
            quality={95}
            sizes="256px"
            style={{
              objectFit: "cover",
              display: "block",
              transform: app.id === "settings" ? "scale(1.05)" : undefined,
            }}
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
    </motion.button>
  );
}

export default function HomeScreen({
  orientation,
  onOpenApp,
  locked,
  onUnlock,
}: Props) {
  const isLandscape = orientation === "landscape";

  const time = useClock();
  const containerRef = useRef<HTMLDivElement>(null);

  const timeStr = time
    ? time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      })
    : "";
  const dateStr = time
    ? time.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  const cols = isLandscape ? 5 : 4;
  const iconSize = isLandscape ? 68 : 72;

  const dockAppDefs = dockApps
    .map((id) => apps.find((a) => a.id === id)!)
    .filter(Boolean);

  const nonDockApps = apps.filter((app) => !dockApps.includes(app.id));
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
        const result: (AppDef | null)[] = [];
        for (const app of nonDockApps) {
          const col = result.length % 4;
          if (col === 1) {
            result.push(null);
            result.push(null);
          }
          result.push(app);
        }
        return result;
      })();

  const [heldApp, setHeldApp] = useState<{ app: AppDef; rect: DOMRect } | null>(
    null,
  );

  const handleOpen = (app: AppDef, rect?: DOMRect) => {
    if (app.external) {
      window.open(app.external, "_blank", "noopener,noreferrer");
    } else {
      onOpenApp(app.id, rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined);
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
      { }
      <Image
        src="/assets/CalebAtBeachUSCHoodie.jpg"
        alt=""
        fill
        priority
        quality={92}
        sizes="100vw"
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
            initial={{ y: "0%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="button"
            tabIndex={0}
            aria-label="Unlock and open the home screen"
            onClick={onUnlock}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onUnlock();
              }
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
            { }
            <Image
              src="/assets/everything_night_main.jpg"
              alt=""
              fill
              priority
              quality={92}
              sizes="100vw"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.18)",
              }}
            />

            {/* Time + Date + Name grouped at top */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                color: "white",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
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
              <div style={{ marginTop: isLandscape ? 14 : 18 }}>
                <div
                  style={{
                    fontSize: isLandscape ? 20 : 22,
                    fontWeight: 600,
                    letterSpacing: -0.4,
                  }}
                >
                  Caleb Newton
                </div>
                <div style={{ marginTop: 6 }}>
                  <TypedGreeting fontSize={13} isLandscape={isLandscape} />
                </div>
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
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
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
                <div
                  key={`spacer-${i}`}
                  style={{
                    width: iconSize + 20,
                    height: iconSize + 24,
                    visibility: "hidden",
                  }}
                />
              ) : (
                <AppIcon
                  key={app.id}
                  app={app}
                  size={iconSize}
                  onTap={(rect) => handleOpen(app, rect)}
                  onHold={(rect) => setHeldApp({ app, rect })}
                />
              ),
            )}
          </motion.div>
        </div>

        {/* Liquid Glass Dock */}
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
              padding: isLandscape ? "8px 16px" : "9px 12px",
            }}
          >
            {dockAppDefs.map((app) => (
              <AppIcon
                key={app.id}
                app={app}
                size={isLandscape ? 48 : 52}
                onTap={(rect) => handleOpen(app, rect)}
                onHold={(rect) => setHeldApp({ app, rect })}
                showLabel={false}
              />
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 4,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 120,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.6)",
              opacity: 0.5,
            }}
          />
        </div>
      </div>
      <AnimatePresence>
        {heldApp && (
          <ContextMenu
            app={heldApp.app}
            rect={heldApp.rect}
            onClose={() => setHeldApp(null)}
            onOpen={() => handleOpen(heldApp.app, heldApp.rect)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
