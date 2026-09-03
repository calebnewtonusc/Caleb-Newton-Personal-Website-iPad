"use client";

import { health } from "@/data/content";

interface Props {
  orientation: string;
}

function IOSToggle({ on }: { on: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 51,
        height: 31,
        borderRadius: 15.5,
        background: on ? "#34C759" : "#e5e5ea",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: on ? 22 : 2,
          width: 27,
          height: 27,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}

const groupLabel: React.CSSProperties = {
  fontSize: 13,
  color: "#6e6e73",
  fontFamily: "-apple-system, sans-serif",
  fontWeight: 500,
  letterSpacing: 0.3,
  marginBottom: 6,
  marginLeft: 16,
  marginTop: 22,
  textTransform: "uppercase",
};

export default function HealthApp({ orientation }: Props) {
  const isLandscape = orientation === "landscape";

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div
        className="ios-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isLandscape ? "20px 24px 40px" : "16px 16px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg aria-hidden="true" width="26" height="24" viewBox="0 0 26 24" fill="none">
            <path
              d="M13 22S1.8 15.2 1.8 8.1A5.6 5.6 0 0 1 13 5.4 5.6 5.6 0 0 1 24.2 8.1C24.2 15.2 13 22 13 22z"
              fill="#FF2D55"
            />
          </svg>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#1c1c1e",
              fontFamily: "-apple-system, sans-serif",
              letterSpacing: -0.5,
            }}
          >
            Health
          </h1>
        </div>
        <p style={{ fontSize: 14, color: "#8e8e93", marginTop: 4 }}>
          The year that rearranged how I work
        </p>

        {/* The story */}
        <p style={groupLabel}>{health.storyTitle}</p>
        <div
          style={{
            background: "white",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "#3a3a3c",
              lineHeight: 1.6,
              fontFamily: "-apple-system, sans-serif",
              whiteSpace: "pre-line",
            }}
          >
            {health.story}
          </p>
        </div>

        {/* Rhythms, wiring */}
        {health.sections.map((section) => (
          <div key={section.section}>
            <p style={groupLabel}>{section.section}</p>
            <div
              style={{
                background: "white",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    padding: "11px 16px",
                    borderTop:
                      i === 0 ? "none" : "0.5px solid rgba(60,60,67,0.18)",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 16,
                        color: "#1c1c1e",
                        fontFamily: "-apple-system, sans-serif",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#8e8e93",
                        marginTop: 2,
                        fontFamily: "-apple-system, sans-serif",
                        lineHeight: 1.35,
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <IOSToggle on={item.type === "toggle-on"} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
