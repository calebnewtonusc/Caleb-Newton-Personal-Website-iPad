"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { health, profile } from "@/data/content";

interface Props {
  orientation: string;
}

const PROFILE = "__profile__";
const STORY = "__story__";

const GLYPHS: Record<string, () => React.ReactNode> = {
  heart: () => (
    <svg aria-hidden="true" width="16" height="15" viewBox="0 0 18 16" fill="none">
      <path d="M9 14.6S1.4 10 1.4 5.2A3.9 3.9 0 0 1 9 3.4a3.9 3.9 0 0 1 7.6 1.8C16.6 10 9 14.6 9 14.6z" fill="white" />
    </svg>
  ),
  article: () => (
    <svg aria-hidden="true" width="14" height="16" viewBox="0 0 14 16" fill="none">
      <rect x="1.2" y="1.2" width="11.6" height="13.6" rx="2" stroke="white" strokeWidth="1.5" />
      <path d="M4 5.2h6M4 8h6M4 10.8h3.6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  history: () => (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.2" stroke="white" strokeWidth="1.6" />
      <path d="M4.2 3.6C5.9 5.4 6.6 7.1 6.6 9s-.7 3.6-2.4 5.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13.8 3.6C12.1 5.4 11.4 7.1 11.4 9s.7 3.6 2.4 5.4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  brain: () => (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path
        d="M11.4 2.3c1.9 0 3.2 1.2 3.2 2.8 1 .5 1.5 1.4 1.5 2.5 0 .9-.4 1.7-1.1 2.2.2.4.3.8.3 1.2 0 1.7-1.4 3-3.3 3-.6 1.1-1.7 1.7-3 1.7-2.2 0-3.8-1.5-3.8-3.5v-.2c-1.5-.5-2.5-1.8-2.5-3.4 0-1 .4-1.9 1-2.5-.1-.3-.2-.7-.2-1C3.5 3.4 5 2 7 2c.7 0 1.3.2 1.8.5.6-.8 1.5-1.2 2.6-1.2z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8.8 2.5v12.9" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  bed: () => (
    <svg aria-hidden="true" width="18" height="14" viewBox="0 0 20 14" fill="none">
      <path d="M1.6 2v10M1.6 11h16.8M18.4 11V7c0-1.1-.9-2-2-2H8.6v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.2" cy="6.6" r="1.7" fill="white" />
    </svg>
  ),
  rings: () => (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" opacity="0.55" />
      <circle cx="9" cy="9" r="4.5" stroke="white" strokeWidth="1.5" opacity="0.8" />
      <circle cx="9" cy="9" r="2" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
  mindful: () => (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.1" fill="white" />
      <ellipse cx="9" cy="4.4" rx="1.7" ry="3.1" fill="white" opacity="0.9" />
      <ellipse cx="9" cy="13.6" rx="1.7" ry="3.1" fill="white" opacity="0.9" />
      <ellipse cx="4.4" cy="9" rx="3.1" ry="1.7" fill="white" opacity="0.9" />
      <ellipse cx="13.6" cy="9" rx="3.1" ry="1.7" fill="white" opacity="0.9" />
    </svg>
  ),
};

const sectionLabel: React.CSSProperties = {
  fontSize: 13,
  color: "#6e6e73",
  fontFamily: "-apple-system, sans-serif",
  fontWeight: 500,
  letterSpacing: 0.3,
  marginBottom: 8,
  marginLeft: 4,
  marginTop: 26,
  textTransform: "uppercase",
};

/* A pinned tile, the way Health shows a data type: colored name, big value, caption */
function Tile({
  color,
  icon,
  name,
  value,
  detail,
}: {
  color: string;
  icon: string;
  name: string;
  value: string;
  detail: string;
}) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "13px 15px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
          <div
            aria-hidden="true"
            style={{
              width: 19,
              height: 19,
              borderRadius: 5,
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transform: "scale(0.82)",
            }}
          >
            {GLYPHS[icon]?.()}
          </div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {name}
          </p>
        </div>
        <svg aria-hidden="true" width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ flexShrink: 0 }}>
          <path d="M1 1l5 5-5 5" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1c1c1e",
          marginTop: 5,
          letterSpacing: -0.4,
          fontFamily: "-apple-system, sans-serif",
        }}
      >
        {value}
      </p>
      {detail && (
        <p
          style={{
            fontSize: 12,
            color: "#8e8e93",
            marginTop: 3,
            lineHeight: 1.35,
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          {detail}
        </p>
      )}
    </div>
  );
}

export default function HealthApp({ orientation }: Props) {
  const [selected, setSelected] = useState<string>(PROFILE);
  const isLandscape = orientation === "landscape";
  const storyRef = useRef<HTMLDivElement>(null);

  const category = health.categories.find((c) => c.id === selected);

  const sidebar = (
    <div
      className="ios-scroll"
      style={{
        width: isLandscape ? 290 : "100%",
        borderRight: isLandscape ? "0.5px solid rgba(60,60,67,0.18)" : "none",
        overflowY: "auto",
        padding: "18px 14px 30px",
        flexShrink: 0,
      }}
    >
      <h1
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: "#1c1c1e",
          letterSpacing: -0.5,
          marginBottom: 14,
          fontFamily: "-apple-system, sans-serif",
        }}
      >
        Health
      </h1>

      {/* Profile row, the same shape as the one in Settings */}
      <button
        onClick={() => setSelected(PROFILE)}
        style={{
          background: "white",
          borderRadius: 10,
          padding: "14px 16px",
          marginBottom: 8,
          display: "flex",
          gap: 14,
          alignItems: "center",
          cursor: "pointer",
          border: "none",
          width: "100%",
          textAlign: "left",
          font: "inherit",
          boxShadow: "0 0.5px 0 rgba(60,60,67,0.18)",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Image
            src={profile.photoAlt}
            alt="Caleb Newton"
            fill
            sizes="52px"
            style={{ objectFit: "cover", objectPosition: "center 25%" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#1c1c1e",
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            Caleb Newton
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#636366",
              marginTop: 1,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            Health Details
          </p>
        </div>
        <svg aria-hidden="true" width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path d="M1 1l5 5L1 11" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {[
        {
          id: STORY,
          name: "My freshman year at USC",
          icon: "article",
          color: "#5E5CE6",
          blurb: "Article \u00b7 6 min",
        },
      ].map((row) => (
        <button
          key={row.id}
          onClick={() => setSelected(row.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            width: "100%",
            textAlign: "left",
            background: selected === row.id ? "rgba(255,45,85,0.1)" : "white",
            border: "none",
            borderRadius: 10,
            padding: "11px 13px",
            marginBottom: 8,
            cursor: "pointer",
            font: "inherit",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: row.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {GLYPHS[row.icon]?.()}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 16, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
              {row.name}
            </p>
            <p style={{ fontSize: 12, color: "#8e8e93", fontFamily: "-apple-system, sans-serif" }}>
              {row.blurb}
            </p>
          </div>
        </button>
      ))}

      <p style={{ ...sectionLabel, marginTop: 18 }}>Health Categories</p>
      <div style={{ background: "white", borderRadius: 10, overflow: "hidden" }}>
        {health.categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              width: "100%",
              textAlign: "left",
              background: selected === c.id ? "rgba(255,45,85,0.1)" : "none",
              border: "none",
              borderTop: i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.18)",
              padding: "11px 13px",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: c.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {GLYPHS[c.icon]?.()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: 16, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
                {c.name}
              </p>
              <p style={{ fontSize: 12, color: "#8e8e93", fontFamily: "-apple-system, sans-serif" }}>
                {c.blurb}
              </p>
            </div>
            <svg aria-hidden="true" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1 1l5 5-5 5" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );

  const profileView = (
    <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "24px 20px 40px" }}>
      <div style={{ background: "white", borderRadius: 12, padding: "22px 18px", textAlign: "center" }}>
        <div
          style={{
            width: 92,
            height: 92,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            margin: "0 auto",
          }}
        >
          <Image
            src={profile.photoAlt}
            alt="Caleb Newton"
            fill
            sizes="92px"
            style={{ objectFit: "cover", objectPosition: "center 25%" }}
          />
        </div>
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#1c1c1e",
            marginTop: 12,
            letterSpacing: -0.3,
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          Caleb Newton
        </p>
        <p style={{ fontSize: 13, color: "#636366", marginTop: 2, fontFamily: "-apple-system, sans-serif" }}>
          {profile.tagline}
        </p>
      </div>

      <p style={sectionLabel}>Health Details</p>
      <div style={{ background: "white", borderRadius: 10, overflow: "hidden" }}>
        {health.categories.flatMap((c) =>
          c.items.map((item) => ({ c, item })),
        ).map(({ c, item }, i) => (
          <div
            key={c.id + item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderTop: i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.18)",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: c.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: "scale(0.86)",
              }}
            >
              {GLYPHS[c.icon]?.()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 16, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
                {item.label}
              </p>
              {item.detail && (
                <p style={{ fontSize: 12, color: "#8e8e93", marginTop: 1, fontFamily: "-apple-system, sans-serif" }}>
                  {item.detail}
                </p>
              )}
            </div>
            <span
              style={{
                fontSize: 15,
                color: "#636366",
                textAlign: "right",
                flexShrink: 0,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const story = (
    <div
      ref={storyRef}
      className="ios-scroll"
      style={{ flex: 1, overflowY: "auto", padding: "20px 20px 60px", scrollBehavior: "smooth" }}
    >
      <h2
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: "#1c1c1e",
          letterSpacing: -0.5,
          fontFamily: "-apple-system, sans-serif",
        }}
      >
        My freshman year at USC
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#8e8e93",
          marginTop: 6,
          fontFamily: "-apple-system, sans-serif",
        }}
      >
        Depression, a hospitalization, mania, and getting back to steady ground.
      </p>
      <p
        style={{
          fontSize: 17,
          color: "#3a3a3c",
          lineHeight: 1.55,
          marginTop: 10,
          fontFamily: "-apple-system, sans-serif",
        }}
      >
        {health.intro}
      </p>

      {health.chapters.map((c) => (
        <div key={c.id} id={`ch-${c.id}`} style={{ marginTop: 30, scrollMarginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              aria-hidden="true"
              style={{ width: 4, height: 20, borderRadius: 2, background: c.color }}
            />
            <h3
              style={{
                fontSize: 21,
                fontWeight: 700,
                color: "#1c1c1e",
                letterSpacing: -0.3,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {c.title}
            </h3>
          </div>
          <p
            style={{
              fontSize: 16,
              color: "#3a3a3c",
              lineHeight: 1.68,
              marginTop: 10,
              whiteSpace: "pre-line",
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {c.body}
          </p>
        </div>
      ))}
    </div>
  );

  const detail = category && (
    <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 40px" }}>
      <h2
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: "#1c1c1e",
          letterSpacing: -0.5,
          fontFamily: "-apple-system, sans-serif",
        }}
      >
        {category.name}
      </h2>
      <p style={{ fontSize: 15, color: "#8e8e93", marginTop: 4, fontFamily: "-apple-system, sans-serif" }}>
        {category.blurb}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 12,
          marginTop: 18,
        }}
      >
        {category.items.map((item) => (
          <Tile
            key={item.label}
            color={category.color}
            icon={category.icon}
            name={item.label}
            value={item.value}
            detail={item.detail}
          />
        ))}
      </div>
      {category.id === "mental" && (
        <button
          onClick={() => setSelected(STORY)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            background: "white",
            border: "none",
            borderRadius: 12,
            padding: "15px 16px",
            marginTop: 14,
            cursor: "pointer",
            font: "inherit",
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "#5E5CE6", fontFamily: "-apple-system, sans-serif" }}>
            Article
          </p>
          <p style={{ fontSize: 17, color: "#1c1c1e", marginTop: 4, fontFamily: "-apple-system, sans-serif" }}>
            My freshman year at USC
          </p>
          <p style={{ fontSize: 13, color: "#8e8e93", marginTop: 3, fontFamily: "-apple-system, sans-serif" }}>
            Depression, a hospitalization, mania, and steady ground. Eight parts,
            about six minutes.
          </p>
        </button>
      )}
    </div>
  );

  const main =
    selected === PROFILE ? profileView : selected === STORY ? story : detail;

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {isLandscape && sidebar}
        {!isLandscape && (
          <AnimatePresence mode="wait" initial={false}>
            {selected === PROFILE ? (
              <motion.div
                key="nav"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.16 }}
                style={{ display: "flex", flexDirection: "column", width: "100%", overflow: "hidden" }}
              >
                {sidebar}
              </motion.div>
            ) : (
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.16 }}
                style={{ display: "flex", flexDirection: "column", width: "100%", overflow: "hidden" }}
              >
                <button
                  onClick={() => setSelected(PROFILE)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "none",
                    border: "none",
                    padding: "14px 20px 0",
                    color: "#FF2D55",
                    fontSize: 17,
                    cursor: "pointer",
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  <svg aria-hidden="true" width="9" height="15" viewBox="0 0 7 12" fill="none">
                    <path d="M6 1L1 6l5 5" stroke="#FF2D55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Health
                </button>
                {main}
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {isLandscape && main}
      </div>
    </div>
  );
}
