"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { health, profile } from "@/data/content";

interface Props {
  orientation: string;
}

const SUMMARY = "__summary__";
const STORY = "__story__";

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
  name,
  value,
  detail,
}: {
  color: string;
  name: string;
  value: string;
  detail: string;
}) {
  return (
    <div style={{ background: "white", borderRadius: 12, padding: "13px 15px" }}>
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
    </div>
  );
}

export default function HealthApp({ orientation }: Props) {
  const [selected, setSelected] = useState<string>(SUMMARY);
  const isLandscape = orientation === "landscape";
  const storyRef = useRef<HTMLDivElement>(null);

  const category = health.categories.find((c) => c.id === selected);

  const jumpTo = (chapterId: string) => {
    setSelected(STORY);
    requestAnimationFrame(() =>
      setTimeout(() => {
        const el = storyRef.current?.querySelector(`#ch-${chapterId}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60),
    );
  };

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <h1
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#1c1c1e",
            letterSpacing: -0.5,
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          Health
        </h1>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Image src={profile.photoAlt} alt="" fill sizes="32px" style={{ objectFit: "cover" }} />
        </div>
      </div>

      {[
        { id: SUMMARY, name: "Summary", color: "#FF2D55", blurb: "Pinned and highlights" },
        {
          id: STORY,
          name: "My freshman year at USC",
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
              flexShrink: 0,
            }}
          />
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
              style={{ width: 26, height: 26, borderRadius: 7, background: c.color, flexShrink: 0 }}
            />
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

  const summary = (
    <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 40px" }}>
      <p style={{ ...sectionLabel, marginTop: 0 }}>Highlights</p>
      <div
        className="ios-scroll"
        style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}
      >
        {health.chapters.map((c) => (
          <button
            key={c.id}
            onClick={() => jumpTo(c.id)}
            style={{
              flex: "0 0 232px",
              textAlign: "left",
              background: "white",
              border: "none",
              borderRadius: 12,
              padding: "14px 15px",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: c.color, fontFamily: "-apple-system, sans-serif" }}>
              {c.title}
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#1c1c1e",
                marginTop: 6,
                lineHeight: 1.45,
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {c.quote}
            </p>
          </button>
        ))}
      </div>

      <p style={sectionLabel}>Pinned</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {health.categories.flatMap((c) =>
          c.items.map((item) => (
            <Tile
              key={c.id + item.label}
              color={c.color}
              name={item.label}
              value={item.value}
              detail={item.detail}
            />
          )),
        )}
      </div>
    </div>
  );

  /* The article: one continuous scroll, the way Health shows its own long reads */
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

  const main = selected === SUMMARY ? summary : selected === STORY ? story : detail;

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {isLandscape && sidebar}
        {!isLandscape && (
          <AnimatePresence mode="wait" initial={false}>
            {selected === SUMMARY ? (
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
                  onClick={() => setSelected(SUMMARY)}
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
