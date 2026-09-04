"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { music } from "@/data/content";

interface Props {
  open: boolean;
  onClose: () => void;
  brightness: number;
  onBrightness: (v: number) => void;
  onOpenSpotify: () => void;
}

function Tile({
  children,
  span = 1,
  rows = 1,
  padded = true,
}: {
  children: React.ReactNode;
  span?: number;
  rows?: number;
  padded?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        gridRow: `span ${rows}`,
        background: "rgba(120,120,128,0.36)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: 18,
        padding: padded ? 12 : 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function RoundButton({
  on,
  label,
  onClick,
  children,
}: {
  on?: boolean;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={on}
      onClick={onClick}
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "none",
        cursor: onClick ? "pointer" : "default",
        background: on ? "#0A84FF" : "rgba(120,120,128,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.18s",
      }}
    >
      {children}
    </button>
  );
}

/* A vertical slider that behaves like the real one: drag anywhere on it. */
function VSlider({
  value,
  onChange,
  label,
  icon,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  icon: React.ReactNode;
}) {
  const set = (clientY: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const pct = 1 - (clientY - r.top) / r.height;
    onChange(Math.max(0.15, Math.min(1, pct)));
  };
  return (
    <div
      role="slider"
      aria-label={label}
      aria-valuemin={15}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") onChange(Math.min(1, value + 0.08));
        if (e.key === "ArrowDown") onChange(Math.max(0.15, value - 0.08));
      }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        set(e.clientY, e.currentTarget);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) set(e.clientY, e.currentTarget);
      }}
      style={{
        position: "relative",
        height: "100%",
        minHeight: 132,
        borderRadius: 18,
        overflow: "hidden",
        background: "rgba(120,120,128,0.36)",
        cursor: "ns-resize",
        touchAction: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `${value * 100}%`,
          background: "rgba(255,255,255,0.92)",
          transition: "height 0.06s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          mixBlendMode: "difference",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default function ControlCenter({
  open,
  onClose,
  brightness,
  onBrightness,
  onOpenSpotify,
}: Props) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [focus, setFocus] = useState(false);
  const [volume, setVolume] = useState(0.35);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 210,
            background: "rgba(0,0,0,0.22)",
            backdropFilter: "blur(26px)",
            WebkitBackdropFilter: "blur(26px)",
            display: "flex",
            justifyContent: "flex-end",
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
              width: "min(58%, 330px)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: 62,
              gap: 10,
            }}
          >
            {/* Connectivity */}
            <Tile span={2} rows={2}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  placeItems: "center",
                  height: "100%",
                }}
              >
                <RoundButton on={airplane} label="Airplane mode" onClick={() => setAirplane((v) => !v)}>
                  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 20 20" fill="white">
                    <path d="M10 1.6c.7 0 1.2.6 1.2 1.3v4.4l6.6 3.8v1.7l-6.6-2v3.7l2.2 1.5v1.4L10 16.6l-3.4.8v-1.4l2.2-1.5v-3.7l-6.6 2v-1.7l6.6-3.8V2.9c0-.7.5-1.3 1.2-1.3z" />
                  </svg>
                </RoundButton>
                <RoundButton on={wifi} label="Wi-Fi" onClick={() => setWifi((v) => !v)}>
                  <svg aria-hidden="true" width="19" height="15" viewBox="0 0 20 15" fill="none">
                    <path d="M1.4 4.6a13 13 0 0 1 17.2 0" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
                    <path d="M4.6 8a8.4 8.4 0 0 1 10.8 0" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
                    <circle cx="10" cy="12.4" r="1.7" fill="white" />
                  </svg>
                </RoundButton>
                <RoundButton on={bluetooth} label="Bluetooth" onClick={() => setBluetooth((v) => !v)}>
                  <svg aria-hidden="true" width="13" height="18" viewBox="0 0 13 18" fill="none">
                    <path d="M2 5l9 8-4.5 4V1L11 5l-9 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </RoundButton>
                <RoundButton label="AirDrop">
                  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8.2" stroke="white" strokeWidth="1.7" />
                    <path d="M10 13.6V6.6M7.2 9l2.8-2.8L12.8 9" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </RoundButton>
              </div>
            </Tile>

            {/* Now playing */}
            <Tile span={2} rows={2}>
              <button
                onClick={onOpenSpotify}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 4,
                  height: "100%",
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  font: "inherit",
                  padding: 0,
                }}
              >
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "-apple-system, sans-serif" }}>
                  Now Playing
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "white", fontFamily: "-apple-system, sans-serif" }}>
                  {music.currentlyPlaying.title}
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "-apple-system, sans-serif" }}>
                  {music.currentlyPlaying.artist}
                </span>
              </button>
            </Tile>

            {/* Brightness, which actually dims the screen */}
            <div style={{ gridColumn: "span 1", gridRow: "span 3" }}>
              <VSlider
                value={brightness}
                onChange={onBrightness}
                label="Brightness"
                icon={
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 22 22" fill="white">
                    <circle cx="11" cy="11" r="4.2" />
                    <g stroke="white" strokeWidth="1.7" strokeLinecap="round">
                      <path d="M11 1.6v2.2M11 18.2v2.2M1.6 11h2.2M18.2 11h2.2M4.4 4.4l1.6 1.6M16 16l1.6 1.6M17.6 4.4L16 6M6 16l-1.6 1.6" />
                    </g>
                  </svg>
                }
              />
            </div>

            {/* Volume */}
            <div style={{ gridColumn: "span 1", gridRow: "span 3" }}>
              <VSlider
                value={volume}
                onChange={setVolume}
                label="Volume"
                icon={
                  <svg aria-hidden="true" width="20" height="18" viewBox="0 0 22 20" fill="white">
                    <path d="M4 7.4h3.2L12 3.4v13.2L7.2 12.6H4z" />
                    <path d="M15 7.2a4.4 4.4 0 0 1 0 5.6" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>

            {/* Focus */}
            <Tile span={2}>
              <button
                onClick={() => setFocus((v) => !v)}
                aria-pressed={focus}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  height: "100%",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  font: "inherit",
                  padding: 0,
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: focus ? "#5E5CE6" : "rgba(120,120,128,0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.18s",
                  }}
                >
                  <svg aria-hidden="true" width="15" height="15" viewBox="0 0 18 18" fill="white">
                    <path d="M15.4 11.4A7 7 0 0 1 6.6 2.6 7 7 0 1 0 15.4 11.4z" />
                  </svg>
                </span>
                <span style={{ fontSize: 13, color: "white", fontFamily: "-apple-system, sans-serif" }}>
                  {focus ? "Do Not Disturb on" : "Focus"}
                </span>
              </button>
            </Tile>

            {/* Small squares */}
            <Tile span={1}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <svg aria-hidden="true" width="17" height="20" viewBox="0 0 18 22" fill="white">
                  <rect x="6" y="1.5" width="6" height="9" rx="3" />
                  <path d="M3 10.5a6 6 0 0 0 12 0M9 16.5v4" stroke="white" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </Tile>
            <Tile span={1}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <svg aria-hidden="true" width="19" height="19" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="11" r="7" stroke="white" strokeWidth="1.7" />
                  <path d="M10 7.6V11l2.2 1.4M7.6 1.8h4.8" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
            </Tile>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
