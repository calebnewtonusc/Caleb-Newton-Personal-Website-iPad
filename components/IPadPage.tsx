"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import IPadFrame from "./ipad/IPadFrame";
import HomeScreen from "./ipad/HomeScreen";
import AppWindow from "./apps/AppWindow";
import SpotifyApp from "./apps/SpotifyApp";
import type { AppId } from "@/data/content";

const IPAD_LANDSCAPE = { w: 900, h: 630 };
const IPAD_PORTRAIT = { w: 630, h: 900 };

// Approx horizontal extent of the vertical side labels (font-size ≈ clamp(4rem, 10vh, 9rem))
const LABEL_RESERVE_PX = 90; // px reserved on each side in landscape

export default function IPadPage() {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [userScale, setUserScale] = useState<number | null>(null);
  const [locked, setLocked] = useState(true);
  const [screenOff, setScreenOff] = useState(false);
  const [mounted, setMounted] = useState(false);

  // useMotionValue → instant updates on every mousemove/resize, no animation lag
  const scaleMotionValue = useMotionValue(0.97);
  const resizeDragRef = useRef({ active: false, startX: 0, startY: 0, startScale: 1, corner: "br" as "tl" | "tr" | "bl" | "br" });

  // Preload all images on mount
  useEffect(() => {
    const urls = [
      "/assets/CalebAtBeachUSCHoodie.jpg",
      "/assets/CalebAtUSC.jpg",
      "/assets/icons/modellab.png",
      "/assets/icons/tech16-logo.png",
      "/assets/icons/foodvision-logo.png",
      "/assets/projects/modellab.jpg",
      "/assets/projects/tech16personalities.jpg",
      "/assets/projects/foodvision.jpg",
      "/assets/projects/la-healthcare.png",
      "/assets/projects/nba-prediction.png",
      "/assets/projects/usc-cook-scale.png",
      "/assets/projects/thelines.jpg",
    ];
    urls.forEach((url) => { const img = new Image(); img.src = url; });
  }, []);

  const calcScale = useCallback((orient: "landscape" | "portrait") => {
    const ipad = orient === "landscape" ? IPAD_LANDSCAPE : IPAD_PORTRAIT;
    // Landscape: leave room for the vertical side labels
    const availW = orient === "landscape"
      ? window.innerWidth - LABEL_RESERVE_PX * 2
      : window.innerWidth * 0.92;
    const scaleW = availW / ipad.w;
    // Portrait: labels (≈96px each + 24px gap) sit above+below inside the scaled div
    const scaleH = orient === "portrait"
      ? (window.innerHeight * 0.95) / (ipad.h + 96 * 2 + 48)
      : (window.innerHeight * 0.90) / ipad.h;
    return Math.min(scaleW, scaleH, 1.4); // cap at 1.4x
  }, []);

  const getOrientation = useCallback((): "landscape" | "portrait" => {
    const isMobile = window.innerWidth <= 1024 && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isMobile) return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    return window.innerWidth < 960 ? "portrait" : "landscape";
  }, []);

  // Initial mount
  useEffect(() => {
    const initial = getOrientation();
    setOrientation(initial);
    scaleMotionValue.set(calcScale(initial));
    setMounted(true);
  }, [getOrientation, calcScale, scaleMotionValue]);

  // Window resize — instant, no animation
  useEffect(() => {
    let pending = false;
    const onResize = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const next = getOrientation();
        setOrientation(next);
        setUserScale(null);
        if (!resizeDragRef.current.active) {
          scaleMotionValue.set(calcScale(next));
        }
      });
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [getOrientation, calcScale, scaleMotionValue]);

  // Corner drag resize — instant, per-frame via motion value
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeDragRef.current.active) return;
      const dx = e.clientX - resizeDragRef.current.startX;
      const dy = e.clientY - resizeDragRef.current.startY;
      const { corner } = resizeDragRef.current;
      let delta: number;
      if (corner === "br") delta = (dx + dy) / 500;
      else if (corner === "bl") delta = (-dx + dy) / 500;
      else if (corner === "tr") delta = (dx - dy) / 500;
      else delta = (-dx - dy) / 500;
      const newScale = Math.max(0.25, Math.min(2.0, resizeDragRef.current.startScale + delta));
      scaleMotionValue.set(newScale); // instant — no framer animation
    };
    const handleMouseUp = () => {
      if (resizeDragRef.current.active) {
        setUserScale(scaleMotionValue.get());
      }
      resizeDragRef.current.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scaleMotionValue]);

  const handlePowerPress = useCallback(() => {
    if (screenOff) {
      setScreenOff(false);
      setLocked(true);
      setOpenApp(null);
    } else {
      setScreenOff(true);
    }
  }, [screenOff]);

  const isPortrait = orientation === "portrait";

  // Gradient text style for both landscape (CSS class) and portrait (inline)
  const labelStyle: React.CSSProperties = {
    background: "linear-gradient(160deg, #ffffff 0%, #d4e8d4 55%, #a8cca8 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontSize: "6rem",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "none",
    textAlign: "center",
    flexShrink: 0,
  };

  return (
    <div className="ipad-viewport">
      <div className="page-bg" aria-hidden="true" />

      {/* Landscape: fixed vertical labels on left/right sides */}
      {!isPortrait && (
        <>
          <div className="page-label-left" aria-hidden="true">Caleb&apos;s</div>
          <div className="page-label-right" aria-hidden="true">iPad</div>
        </>
      )}

      {/* iPad wrapper — scale driven by motion value (instant, no lag) */}
      <motion.div
        style={{
          scale: scaleMotionValue,
          transformOrigin: "center center",
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.3s",
          ...(isPortrait ? {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          } : {}),
        }}
      >
        {/* Portrait: "Caleb's" above */}
        {isPortrait && (
          <div aria-hidden="true" style={labelStyle}>Caleb&apos;s</div>
        )}

        {/* iPad frame + invisible resize handles */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <IPadFrame orientation={orientation} onPowerPress={handlePowerPress}>
            <HomeScreen
              orientation={orientation}
              onOpenApp={setOpenApp}
              locked={locked}
              onUnlock={() => setLocked(false)}
            />

            {/* Persistently mounted Spotify */}
            <motion.div
              animate={
                openApp === "spotify"
                  ? { scale: 1, opacity: 1, pointerEvents: "auto" as const }
                  : { scale: 0.08, opacity: 0, pointerEvents: "none" as const }
              }
              initial={{ scale: 0.08, opacity: 0, pointerEvents: "none" as const }}
              transition={{ type: "spring", stiffness: 480, damping: 36 }}
              style={{ position: "absolute", inset: 0, zIndex: 10, borderRadius: "inherit", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <SpotifyApp onClose={() => setOpenApp(null)} orientation={orientation} />
              </div>
              <motion.div
                onClick={() => setOpenApp(null)}
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 28,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 20, paddingBottom: 4,
                }}
                whileTap={{ scale: 0.96 }}
              >
                <div style={{ width: 120, height: 5, borderRadius: 3, background: "rgba(150,150,150,0.45)" }} />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {openApp && openApp !== "spotify" && (
                <AppWindow
                  key={openApp}
                  appId={openApp}
                  onClose={() => setOpenApp(null)}
                  orientation={orientation}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {screenOff && (
                <motion.div
                  key="screen-off"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => { setScreenOff(false); setLocked(true); setOpenApp(null); }}
                  style={{ position: "absolute", inset: 0, background: "#000000", zIndex: 100, cursor: "pointer" }}
                />
              )}
            </AnimatePresence>
          </IPadFrame>

          {/* Invisible resize handles — all 4 corners */}
          {(["tl", "tr", "bl", "br"] as const).map((corner) => (
            <div
              key={corner}
              onMouseDown={(e) => {
                e.preventDefault();
                resizeDragRef.current = {
                  active: true,
                  startX: e.clientX,
                  startY: e.clientY,
                  startScale: scaleMotionValue.get(),
                  corner,
                };
              }}
              style={{
                position: "absolute",
                ...(corner === "tl" ? { top: -16, left: -16 } :
                   corner === "tr" ? { top: -16, right: -16 } :
                   corner === "bl" ? { bottom: -16, left: -16 } :
                   { bottom: -16, right: -16 }),
                width: 32,
                height: 32,
                cursor: (corner === "tl" || corner === "br") ? "nwse-resize" : "nesw-resize",
                zIndex: 20,
              }}
            />
          ))}
        </div>

        {/* Portrait: "iPad" below */}
        {isPortrait && (
          <div aria-hidden="true" style={labelStyle}>iPad</div>
        )}
      </motion.div>
    </div>
  );
}
