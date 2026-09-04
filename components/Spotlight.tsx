"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  apps,
  experience,
  organizations,
  education,
  personalSettings,
  health,
  mentors,
  profile,
  type AppId,
} from "@/data/content";

interface Hit {
  app: AppId;
  appName: string;
  title: string;
  detail: string;
}

/* One flat index over everything a visitor can read on this iPad. */
function buildIndex(): Hit[] {
  const out: Hit[] = [];
  const nameFor = (id: AppId) => apps.find((a) => a.id === id)?.name ?? id;

  apps.forEach((a) =>
    out.push({ app: a.id, appName: "App", title: a.name, detail: "Open the app" }),
  );

  experience.forEach((e) =>
    out.push({
      app: "work",
      appName: nameFor("work"),
      title: `${e.title}, ${e.company}`,
      detail: e.period,
    }),
  );

  organizations.forEach((o) =>
    out.push({
      app: "files",
      appName: nameFor("files"),
      title: `${o.name}`,
      detail: `${o.role} · ${o.period}`,
    }),
  );

  education.forEach((e) =>
    out.push({
      app: "education",
      appName: nameFor("education"),
      title: e.school,
      detail: e.degree || e.period,
    }),
  );

  health.chapters.forEach((c) =>
    out.push({
      app: "health",
      appName: nameFor("health"),
      title: c.title,
      detail: c.quote,
    }),
  );

  health.categories.forEach((c) =>
    c.items.forEach((i) =>
      out.push({
        app: "health",
        appName: `${nameFor("health")} · ${c.name}`,
        title: i.label,
        detail: i.value,
      }),
    ),
  );

  personalSettings.forEach((sec) =>
    sec.items.forEach((i) =>
      out.push({
        app: "settings",
        appName: `${nameFor("settings")} · ${sec.section}`,
        title: i.label,
        detail: i.detail || "",
      }),
    ),
  );

  profile.aboutGroups.forEach((g) =>
    g.items.forEach((i) =>
      out.push({
        app: "settings",
        appName: `${nameFor("settings")} · ${g.title}`,
        title: i.label,
        detail: i.detail || "",
      }),
    ),
  );

  mentors.forEach((m) =>
    out.push({
      app: "mentors",
      appName: nameFor("mentors"),
      title: m.name,
      detail: m.role,
    }),
  );

  return out;
}

export default function Spotlight({
  open,
  onClose,
  onOpenApp,
}: {
  open: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  // macOS Spotlight keeps the last query and selects it, so do that instead of clearing
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, [open]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const scored = index
      .map((h) => {
        const t = h.title.toLowerCase();
        const d = h.detail.toLowerCase();
        let score = 0;
        if (t === needle) score = 100;
        else if (t.startsWith(needle)) score = 80;
        else if (t.includes(needle)) score = 60;
        else if (d.includes(needle)) score = 30;
        return { h, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
    return scored.map((r) => r.h);
  }, [q, index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter" && results[active]) {
        onOpenApp(results[active].app);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose, onOpenApp]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.32)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "12%",
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: "min(78%, 520px)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.92)",
                borderRadius: 13,
                padding: "11px 14px",
              }}
            >
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 18 18" fill="none">
                <circle cx="7.8" cy="7.8" r="5.6" stroke="#8e8e93" strokeWidth="1.9" />
                <path d="M12 12l4 4" stroke="#8e8e93" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                placeholder="Search this iPad"
                aria-label="Search this iPad"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 19,
                  color: "#1c1c1e",
                  fontFamily: "-apple-system, sans-serif",
                }}
              />
            </div>

            {results.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: 13,
                  overflow: "hidden",
                  maxHeight: 320,
                  overflowY: "auto",
                }}
                className="ios-scroll"
              >
                {results.map((r, i) => (
                  <button
                    key={`${r.app}-${r.title}-${i}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      onOpenApp(r.app);
                      onClose();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      cursor: "pointer",
                      font: "inherit",
                      padding: "10px 14px",
                      background: i === active ? "rgba(0,122,255,0.12)" : "transparent",
                      borderTop: i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.14)",
                    }}
                  >
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: 16,
                          color: "#1c1c1e",
                          fontFamily: "-apple-system, sans-serif",
                        }}
                      >
                        {r.title}
                      </span>
                      {r.detail && (
                        <span
                          style={{
                            display: "block",
                            fontSize: 12,
                            color: "#8e8e93",
                            marginTop: 1,
                            fontFamily: "-apple-system, sans-serif",
                          }}
                        >
                          {r.detail.slice(0, 90)}
                        </span>
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#8e8e93",
                        flexShrink: 0,
                        fontFamily: "-apple-system, sans-serif",
                      }}
                    >
                      {r.appName}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {q.trim() && results.length === 0 && (
              <p
                style={{
                  marginTop: 10,
                  textAlign: "center",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "-apple-system, sans-serif",
                }}
              >
                Nothing on this iPad matches that.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
