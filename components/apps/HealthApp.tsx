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

/* Health is a charts app. These are the two this iPad actually has data for. */
function VelocityChart() {
  const pts = [
    { label: "Sophomore", mph: 84 },
    { label: "After injury", mph: 70 },
    { label: "After rebuild", mph: 81 },
  ];
  const W = 300, H = 132, PADL = 32, PADR = 34, PADB = 26, PADT = 12;
  const lo = 66, hi = 88;
  const x = (i: number) => PADL + (i * (W - PADL - PADR)) / (pts.length - 1);
  const y = (v: number) => PADT + (1 - (v - lo) / (hi - lo)) * (H - PADT - PADB);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Fastball velocity: 84 miles per hour, down to 70 after the injury, back to 81 after a year of rebuilding."
      style={{ display: "block" }}
    >
      {[70, 75, 80, 85].map((g) => (
        <g key={g}>
          <line x1={PADL} x2={W - PADR + 18} y1={y(g)} y2={y(g)} stroke="rgba(60,60,67,0.12)" strokeWidth="1" />
          <text x={PADL - 6} y={y(g) + 3.5} textAnchor="end" fontSize="9" fill="#8e8e93">{g}</text>
        </g>
      ))}
      <polyline
        points={pts.map((p2, i) => `${x(i)},${y(p2.mph)}`).join(" ")}
        fill="none"
        stroke="#FF9500"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map((p2, i) => (
        <g key={p2.label}>
          <circle cx={x(i)} cy={y(p2.mph)} r="4.5" fill="#FF9500" />
          <circle cx={x(i)} cy={y(p2.mph)} r="2" fill="white" />
          <text x={x(i)} y={y(p2.mph) - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1c1c1e">
            {p2.mph}
          </text>
          <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="#8e8e93">
            {p2.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SleepChart() {
  /* hours plotted from 6 PM through 9 AM, which is the window both schedules live in */
  const START = 18, SPAN = 15;
  const rows = [
    { label: "College", from: 22, to: 29, color: "#32ADE6" },
    { label: "High school", from: 20, to: 27, color: "rgba(50,173,230,0.45)" },
  ];
  const W = 300, ROW = 26, PADL = 68, PADT = 6;
  const H = PADT + rows.length * ROW + 22;
  const x = (h: number) => PADL + ((h - START) / SPAN) * (W - PADL - 10);
  const ticks = [18, 21, 24, 27, 30];
  const tickLabel = (h: number) => {
    const hr = h % 24;
    if (hr === 0) return "12a";
    return hr > 12 ? `${hr - 12}p` : `${hr}${hr === 12 ? "p" : "a"}`;
  };
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Sleep schedules: 10 PM to 5 AM at college, 8 PM to 3 AM in high school."
      style={{ display: "block" }}
    >
      {ticks.map((t) => (
        <line key={t} x1={x(t)} x2={x(t)} y1={PADT} y2={PADT + rows.length * ROW} stroke="rgba(60,60,67,0.1)" strokeWidth="1" />
      ))}
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x={PADL - 8} y={PADT + i * ROW + 16} textAnchor="end" fontSize="10" fill="#3a3a3c">
            {r.label}
          </text>
          <rect x={x(r.from)} y={PADT + i * ROW + 5} width={x(r.to) - x(r.from)} height="14" rx="7" fill={r.color} />
        </g>
      ))}
      {ticks.map((t) => (
        <text key={t} x={x(t)} y={H - 6} textAnchor="middle" fontSize="9" fill="#8e8e93">
          {tickLabel(t)}
        </text>
      ))}
    </svg>
  );
}

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
  const [storyOk, setStoryOk] = useState(false);
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
      <p style={{ ...sectionLabel, marginTop: 0 }}>Health Details</p>
      <div style={{ background: "white", borderRadius: 10, overflow: "hidden" }}>
        {health.details.map((d, i) => (
          <div
            key={d.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "13px 16px",
              borderTop: i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.18)",
            }}
          >
            <span style={{ fontSize: 16, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
              {d.label}
            </span>
            <span
              style={{
                fontSize: 15,
                color: "#636366",
                textAlign: "right",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {d.value}
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

      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: "18px 20px",
          marginTop: 34,
          borderLeft: "3px solid #FF2D55",
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: "#1c1c1e",
            lineHeight: 1.6,
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          If you are somewhere in the middle of your own version of this, please
          talk to somebody today. In the US you can call or text{" "}
          <strong>988</strong> for the Suicide and Crisis Lifeline, any hour of
          any day. It is not only for the worst moment. It is for the ones
          before it too.
        </p>
        <p
          style={{
            fontSize: 15,
            color: "#6e6e73",
            lineHeight: 1.6,
            marginTop: 10,
            fontFamily: "-apple-system, sans-serif",
          }}
        >
          And if you want to tell somebody who has been there, my email is in
          the Mail app on this iPad. I answer.
        </p>
      </div>
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
      {(category.id === "history" || category.id === "sleep") && (
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: "14px 16px 8px",
            marginTop: 16,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: category.color,
              marginBottom: 8,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {category.id === "history" ? "Fastball, mph" : "Time asleep"}
          </p>
          {category.id === "history" ? <VelocityChart /> : <SleepChart />}
        </div>
      )}

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
        </button>
      )}
    </div>
  );

  const disclaimer = (
    <div
      className="ios-scroll"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px 20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 460 }}>
        <div
          style={{
            background: "white",
            borderRadius: 14,
            padding: "22px 22px 20px",
            borderLeft: "3px solid #5E5CE6",
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1c1c1e",
              letterSpacing: -0.4,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            Before you read this
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#3a3a3c",
              lineHeight: 1.6,
              marginTop: 10,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            This one covers depression, a psychiatric hospitalization, and a
            manic episode during my freshman year. I wrote it down because it
            happened and because it might be worth something to somebody going
            through the same thing, not for shock. If now is not the time for
            it, that is completely fine.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button
              onClick={() => setStoryOk(true)}
              style={{
                background: "#5E5CE6",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "11px 20px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              Continue
            </button>
            <button
              onClick={() => setSelected(PROFILE)}
              style={{
                background: "rgba(120,120,128,0.12)",
                color: "#1c1c1e",
                border: "none",
                borderRadius: 10,
                padding: "11px 20px",
                fontSize: 16,
                cursor: "pointer",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              Not right now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const main =
    selected === PROFILE
      ? profileView
      : selected === STORY
        ? storyOk
          ? story
          : disclaimer
        : detail;

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
        {isLandscape && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              style={{ flex: 1, display: "flex", overflow: "hidden", minWidth: 0 }}
            >
              {main}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
