"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { apps, notifications as SEED, type AppId, type NotificationDef } from "@/data/content";
import { useClock } from "./useClock";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

const appById = (id: AppId) => apps.find((a) => a.id === id);

function ago(minutes: number) {
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;
  const h = Math.round(minutes / 60);
  return `${h}h ago`;
}

/* One notification. Drag it left to clear it, the way iPadOS does. */
function Card({
  n,
  onOpen,
  onClear,
  stacked,
}: {
  n: NotificationDef;
  onOpen: () => void;
  onClear: () => void;
  stacked?: boolean;
}) {
  const app = appById(n.app);
  return (
    <motion.div
      layout
      drag={stacked ? false : "x"}
      dragConstraints={{ left: -140, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (info.offset.x < -90) onClear();
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -180, height: 0, marginBottom: 0 }}
      transition={{ type: "spring", stiffness: 460, damping: 38 }}
      style={{
        background: "rgba(70,70,76,0.52)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: 18,
        padding: 12,
        marginBottom: stacked ? 0 : 8,
        cursor: "pointer",
        touchAction: "pan-y",
      }}
    >
      <button
        onClick={onOpen}
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          font: "inherit",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            overflow: "hidden",
            flexShrink: 0,
            background: app
              ? `linear-gradient(145deg, ${app.gradient[0]}, ${app.gradient[1]})`
              : "#48484A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {app?.icon ? (
            <Image src={app.icon} alt="" width={30} height={30} style={{ objectFit: "cover" }} />
          ) : (
            <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>{app?.emoji}</span>
          )}
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "white",
                fontFamily: "-apple-system, sans-serif",
                lineHeight: 1.25,
              }}
            >
              {n.title}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "-apple-system, sans-serif",
                flexShrink: 0,
              }}
            >
              {ago(n.minutesAgo)}
            </span>
          </span>
          <span
            style={{
              display: "block",
              marginTop: 3,
              fontSize: 12.5,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.82)",
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {n.body}
          </span>
        </span>
      </button>
    </motion.div>
  );
}

export default function NotificationCenter({ open, onClose, onOpenApp }: Props) {
  const clock = useClock();
  const [cleared, setCleared] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<AppId | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const groups = useMemo(() => {
    const live = SEED.filter((n) => !cleared.includes(n.id));
    const order: AppId[] = [];
    const byApp = new Map<AppId, NotificationDef[]>();
    for (const n of live) {
      if (!byApp.has(n.app)) {
        byApp.set(n.app, []);
        order.push(n.app);
      }
      byApp.get(n.app)!.push(n);
    }
    return order.map((id) => ({
      app: id,
      items: byApp.get(id)!.sort((a, b) => a.minutesAgo - b.minutesAgo),
    }));
  }, [cleared]);

  const clear = (id: string) => setCleared((c) => [...c, id]);
  const clearGroup = (id: AppId) =>
    setCleared((c) => [...c, ...SEED.filter((n) => n.app === id).map((n) => n.id)]);

  const openApp = (id: AppId) => {
    const app = appById(id);
    if (app?.external) {
      window.open(app.external, "_blank", "noopener,noreferrer");
      onClose();
      return;
    }
    onClose();
    onOpenApp(id);
  };

  return (
    /* Collapse any expanded group once the panel is gone, so it reopens clean. */
    <AnimatePresence onExitComplete={() => setExpanded(null)}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="dialog"
          aria-label="Notification Center"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 210,
            background: "rgba(0,0,0,0.22)",
            backdropFilter: "blur(26px)",
            WebkitBackdropFilter: "blur(26px)",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: 16,
          }}
        >
          <motion.div
            initial={{ y: -18, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -18, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(58%, 340px)",
              maxHeight: "calc(100% - 32px)",
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
              paddingRight: 2,
            }}
          >
            {/* The date header, which on a real iPad is the whole point of pulling down */}
            <div
              style={{
                padding: "2px 4px 14px",
                color: "white",
                fontFamily: "-apple-system, sans-serif",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 40, fontWeight: 300, letterSpacing: -1, lineHeight: 1 }}>
                  {clock
                    ? clock.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
                    : " "}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", marginTop: 4 }}>
                  {clock
                    ? clock.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : " "}
                </div>
              </div>

              {/* Swiping a card away is the real gesture, but a trackpad makes
                  it invisible, so the clear-all button from iPadOS stays. */}
              {groups.length > 0 && (
                <button
                  onClick={() => setCleared(SEED.map((n) => n.id))}
                  aria-label="Clear all notifications"
                  title="Clear all"
                  style={{
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    marginTop: 6,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background: "rgba(120,120,128,0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg aria-hidden="true" width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>

            {groups.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "-apple-system, sans-serif",
                }}
              >
                No New Notifications
              </div>
            )}

            <AnimatePresence initial={false}>
              {groups.map((g) => {
                const isOpen = expanded === g.app || g.items.length === 1;
                const [first, ...rest] = g.items;
                return (
                  <motion.div key={g.app} layout style={{ marginBottom: 14, position: "relative" }}>
                    {isOpen && g.items.length > 1 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 6px 6px",
                        }}
                      >
                        <button
                          onClick={() => setExpanded(null)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.72)",
                            fontFamily: "-apple-system, sans-serif",
                          }}
                        >
                          {appById(g.app)?.name} · Show Less
                        </button>
                        <button
                          onClick={() => clearGroup(g.app)}
                          aria-label={`Clear all ${appById(g.app)?.name} notifications`}
                          style={{
                            background: "rgba(120,120,128,0.5)",
                            border: "none",
                            borderRadius: 12,
                            padding: "3px 10px",
                            cursor: "pointer",
                            fontSize: 11.5,
                            fontWeight: 600,
                            color: "white",
                            fontFamily: "-apple-system, sans-serif",
                          }}
                        >
                          Clear All
                        </button>
                      </div>
                    )}

                    {isOpen ? (
                      <AnimatePresence initial={false}>
                        {g.items.map((n) => (
                          <Card
                            key={n.id}
                            n={n}
                            onOpen={() => openApp(n.app)}
                            onClear={() => clear(n.id)}
                          />
                        ))}
                      </AnimatePresence>
                    ) : (
                      /* Collapsed: the top card sitting on a deck, tap to expand.
                         The card carries the click itself, because a button
                         cannot legally wrap another button. */
                      <div style={{ position: "relative", paddingBottom: 16 }}>
                        {/* The deck peeking out from under the top card */}
                        {rest.slice(0, 2).map((n, i) => (
                          <div
                            key={n.id}
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              left: 7 * (i + 1),
                              right: 7 * (i + 1),
                              bottom: 16 - 7 * (i + 1),
                              height: 26,
                              borderRadius: 18,
                              background: `rgba(70,70,76,${0.44 - i * 0.14})`,
                              backdropFilter: "blur(20px)",
                              WebkitBackdropFilter: "blur(20px)",
                              zIndex: -1,
                            }}
                          />
                        ))}
                        <Card n={first} stacked onOpen={() => setExpanded(g.app)} onClear={() => {}} />
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            right: 18,
                            bottom: -1,
                            fontSize: 10.5,
                            fontWeight: 600,
                            letterSpacing: 0.2,
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "-apple-system, sans-serif",
                            pointerEvents: "none",
                          }}
                        >
                          {g.items.length - 1} more
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
