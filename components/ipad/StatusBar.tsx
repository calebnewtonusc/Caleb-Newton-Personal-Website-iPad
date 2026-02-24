"use client";

import { useState, useEffect } from "react";

interface Props {
  orientation: "landscape" | "portrait";
}

export default function StatusBar({ orientation }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* Time */}
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#1c1c1e",
          letterSpacing: "-0.3px",
          fontFamily: "var(--font-sf)",
        }}
      >
        {time}
      </span>

      {/* Right icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11C9.5 11.83 8.83 12.5 8 12.5C7.17 12.5 6.5 11.83 6.5 11C6.5 10.17 7.17 9.5 8 9.5Z"
            fill="#1c1c1e"
          />
          <path
            d="M8 6C9.66 6 11.16 6.67 12.26 7.74L13.67 6.33C12.2 4.9 10.2 4 8 4C5.8 4 3.8 4.9 2.33 6.33L3.74 7.74C4.84 6.67 6.34 6 8 6Z"
            fill="#1c1c1e"
          />
          <path
            d="M8 2C10.76 2 13.24 3.12 15.03 4.97L16.44 3.56C14.28 1.37 11.3 0 8 0C4.7 0 1.72 1.37 -0.44 3.56L0.97 4.97C2.76 3.12 5.24 2 8 2Z"
            fill="#1c1c1e"
            opacity="0.4"
          />
        </svg>

        {/* Battery */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#1c1c1e" }}>
            100%
          </span>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="21"
              height="11"
              rx="3.5"
              stroke="#1c1c1e"
              strokeOpacity="0.35"
            />
            <rect x="2" y="2" width="17.5" height="8" rx="2" fill="#34C759" />
            <path
              d="M23 4V8C23.83 7.67 24.5 6.9 24.5 6C24.5 5.1 23.83 4.33 23 4Z"
              fill="#1c1c1e"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
