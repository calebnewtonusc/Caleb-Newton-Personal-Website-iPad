"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, animate as fmAnimate } from "framer-motion";
import IPadFrame from "./ipad/IPadFrame";
import HomeScreen from "./ipad/HomeScreen";
import AppWindow from "./apps/AppWindow";
import SpotifyApp from "./apps/SpotifyApp";
import ProjectsFolder from "./apps/ProjectsFolder";
import type { AppId } from "@/data/content";
import ParticlesBackground from "./ParticlesBackground";

const IPAD_LANDSCAPE = { w: 900, h: 630 };
const IPAD_PORTRAIT = { w: 630, h: 900 };

export default function IPadPage() {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [userScale, setUserScale] = useState<number | null>(null);
  const [locked, setLocked] = useState(true);
  const [folderOpen, setFolderOpen] = useState(false);
  const [folderOrigin, setFolderOrigin] = useState({ x: "50%", y: "50%" });
  const [screenOff, setScreenOff] = useState(false);
  const [mounted, setMounted] = useState(false);

  const scaleMotionValue = useMotionValue(0.97);

  // 3D drag-to-rotate
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 260, damping: 28 });
  const springY = useSpring(rotY, { stiffness: 260, damping: 28 });
  const shadowOffsetX = useTransform(springY, [-30, 30], [-40, 40]);
  const shadowOffsetY = useTransform(springX, [-30, 30], [40, -40]);
  const dropShadow = useMotionTemplate`drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 60px rgba(0,0,0,0.55))`;
  const ipadDragRef = useRef({ active: false, startX: 0, startY: 0, rx: 0, ry: 0 });
  const [isDragging3D, setIsDragging3D] = useState(false);

  const resizeDragRef = useRef({ active: false, startX: 0, startY: 0, startScale: 1, corner: "br" as "tl" | "tr" | "bl" | "br" });
  const prevOrientRef = useRef<"landscape" | "portrait" | null>(null);
  // Tracks the last auto-scale so resize can maintain the user's ratio proportionally
  const prevAutoScaleRef = useRef<number>(0.97);

  // Spotify home zone hover/wheel detection
  const spotifyWrapperRef = useRef<HTMLDivElement>(null);
  const [spotifyPillHovered, setSpotifyPillHovered] = useState(false);
  const spotifyOpenRef = useRef(false);

  useEffect(() => {
    spotifyOpenRef.current = openApp === "spotify";
    if (openApp !== "spotify") setSpotifyPillHovered(false);
  }, [openApp]);

  useEffect(() => {
    const el = spotifyWrapperRef.current;
    if (!el) return;
    const CLOSE_ZONE = 60;
    const HOVER_ZONE = 60;
    const onWheel = (e: WheelEvent) => {
      if (!spotifyOpenRef.current) return;
      // DOM containment check — reliable under parent CSS transforms
      if (!el.contains(e.target as Node)) return;
      const rect = el.getBoundingClientRect();
      if (e.clientY >= rect.bottom - CLOSE_ZONE) setOpenApp(null);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!spotifyOpenRef.current) return;
      if (!el.contains(e.target as Node)) { setSpotifyPillHovered(false); return; }
      const rect = el.getBoundingClientRect();
      setSpotifyPillHovered(e.clientY >= rect.bottom - HOVER_ZONE);
    };
    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

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
    let availW: number;
    if (orient === "landscape") {
      // Dynamic reserve based on actual label font-size: clamp(4rem, 10vh, 9rem)
      const labelFontSize = Math.max(64, Math.min(window.innerHeight * 0.1, 144));
      const reserve = labelFontSize + 20;
      availW = window.innerWidth - reserve * 2;
    } else {
      availW = window.innerWidth * 0.92;
    }
    const scaleW = availW / ipad.w;
    const scaleH = orient === "portrait"
      ? (window.innerHeight * 0.95) / (ipad.h + 96 * 2 + 48)
      : (window.innerHeight * 0.90) / ipad.h;
    return Math.min(scaleW, scaleH, 1.4);
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
    prevOrientRef.current = initial;
    const initScale = calcScale(initial);
    scaleMotionValue.set(initScale);
    prevAutoScaleRef.current = initScale;
    setMounted(true);
  }, [getOrientation, calcScale, scaleMotionValue]);

  // Window resize — proportional, instant for same orientation, spring for orientation flip
  useEffect(() => {
    let pending = false;
    const onResize = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const next = getOrientation();
        const orientChanged = next !== prevOrientRef.current;
        setOrientation(next);

        if (!resizeDragRef.current.active) {
          const autoScale = calcScale(next);

          if (orientChanged) {
            setUserScale(null);
            prevAutoScaleRef.current = autoScale;
            fmAnimate(scaleMotionValue, autoScale, {
              type: "spring",
              stiffness: 260,
              damping: 28,
              restDelta: 0.001,
            });
          } else {
            // Proportional: maintain ratio of current to previous auto-scale.
            // Uses instant .set() so continuous window resize stays smooth.
            const prevAuto = prevAutoScaleRef.current;
            const current = scaleMotionValue.get();
            const ratio = prevAuto > 0 ? current / prevAuto : 1;
            const target = Math.max(0.25, Math.min(ratio * autoScale, autoScale));
            prevAutoScaleRef.current = autoScale;
            scaleMotionValue.set(target);
          }
        }

        if (orientChanged) {
          prevOrientRef.current = next;
          setUserScale(null);
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

  // Corner drag resize — instant per-frame, capped at auto-scale (label boundary)
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
      const maxScale = calcScale(getOrientation());
      const newScale = Math.max(0.25, Math.min(maxScale, resizeDragRef.current.startScale + delta));
      scaleMotionValue.set(newScale);
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

  // 3D drag handlers
  const onIpadMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".app-window")) return;
    ipadDragRef.current = { active: true, startX: e.clientX, startY: e.clientY, rx: rotX.get(), ry: rotY.get() };
    setIsDragging3D(true);
  }, [rotX, rotY]);

  const onIpadTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".app-window")) return;
    const touch = e.touches[0];
    ipadDragRef.current = { active: true, startX: touch.clientX, startY: touch.clientY, rx: rotX.get(), ry: rotY.get() };
  }, [rotX, rotY]);

  useEffect(() => {
    const MAX_ROT = 30;
    const onMove = (e: MouseEvent) => {
      if (!ipadDragRef.current.active) return;
      const dx = e.clientX - ipadDragRef.current.startX;
      const dy = e.clientY - ipadDragRef.current.startY;
      rotY.set(Math.max(-MAX_ROT, Math.min(MAX_ROT, ipadDragRef.current.ry + dx * 0.25)));
      rotX.set(Math.max(-MAX_ROT, Math.min(MAX_ROT, ipadDragRef.current.rx + dy * -0.25)));
    };
    const onUp = () => {
      if (!ipadDragRef.current.active) return;
      ipadDragRef.current.active = false;
      setIsDragging3D(false);
      rotX.set(0);
      rotY.set(0);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!ipadDragRef.current.active) return;
      const touch = e.touches[0];
      const dx = touch.clientX - ipadDragRef.current.startX;
      const dy = touch.clientY - ipadDragRef.current.startY;
      rotY.set(Math.max(-MAX_ROT, Math.min(MAX_ROT, ipadDragRef.current.ry + dx * 0.25)));
      rotX.set(Math.max(-MAX_ROT, Math.min(MAX_ROT, ipadDragRef.current.rx + dy * -0.25)));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [rotX, rotY]);

  // Close folder when locked
  useEffect(() => { if (locked) setFolderOpen(false); }, [locked]);

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

  // Separate matte-white + soft-green gradients for each label — distinct feel
  const calebsPortraitStyle: React.CSSProperties = {
    background: "linear-gradient(175deg, #ffffff 0%, #e0eed0 50%, #9eba8e 100%)",
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

  const iPadPortraitStyle: React.CSSProperties = {
    background: "linear-gradient(5deg, #ffffff 0%, #d8edcc 55%, #8aab84 100%)",
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

      {/* Particle background — behind iPad, pointer-events disabled */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <ParticlesBackground />
      </div>

      {/* Landscape: fixed vertical labels — fade in/out on orientation change */}
      <AnimatePresence>
        {!isPortrait && (
          <motion.div
            key="landscape-labels"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ pointerEvents: "none" }}
          >
            {/* "Caleb's" left — white fading to soft green downward */}
            <div
              className="page-label-left"
              aria-hidden="true"
              style={{
                background: "linear-gradient(160deg, #ffffff 0%, #ddeece 45%, #9eba8e 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Caleb&apos;s
            </div>
            {/* "iPad" right — soft green fading to white */}
            <div
              className="page-label-right"
              aria-hidden="true"
              style={{
                background: "linear-gradient(20deg, #ffffff 0%, #d8edcc 50%, #8aab84 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              iPad
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iPad wrapper — scale driven by motion value, 3D drag-to-rotate */}
      <div style={{ perspective: 1200, perspectiveOrigin: "center center" }}>
      <motion.div
        onMouseDown={onIpadMouseDown}
        onTouchStart={onIpadTouchStart}
        style={{
          scale: scaleMotionValue,
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
          filter: dropShadow,
          cursor: isDragging3D ? "grabbing" : "grab",
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
        {/* Portrait: "Caleb's" above — slides in from top */}
        <AnimatePresence>
          {isPortrait && (
            <motion.div
              key="portrait-label-top"
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              aria-hidden="true"
              style={calebsPortraitStyle}
            >
              Caleb&apos;s
            </motion.div>
          )}
        </AnimatePresence>

        {/* iPad frame + invisible resize handles */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <IPadFrame orientation={orientation} onPowerPress={handlePowerPress}>
            <HomeScreen
              orientation={orientation}
              onOpenApp={setOpenApp}
              locked={locked}
              onUnlock={() => setLocked(false)}
              folderOpen={folderOpen}
              onFolderOpen={(origin) => { setFolderOrigin(origin); setFolderOpen(true); }}
              onFolderClose={() => setFolderOpen(false)}
            />

            {/* Projects folder — inside screen so blur is scoped to iPad content only */}
            <ProjectsFolder
              open={folderOpen}
              onClose={() => setFolderOpen(false)}
              orientation={orientation}
              origin={folderOrigin}
            />

            {/* Persistently mounted Spotify with hover+wheel support */}
            <motion.div
              ref={spotifyWrapperRef}
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
              {/* Spotify home indicator with hover animation */}
              <div
                onClick={() => setOpenApp(null)}
                onWheel={() => setOpenApp(null)}
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 28,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 20, paddingBottom: 6,
                }}
              >
                <motion.div
                  animate={{
                    scaleX: spotifyPillHovered ? 1.35 : 1,
                    opacity: spotifyPillHovered ? 0.9 : 0.45,
                  }}
                  whileTap={{ scaleX: 0.8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ width: 120, height: 5, borderRadius: 3, background: "rgba(150,150,150,0.45)", pointerEvents: "none" }}
                />
              </div>
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

        {/* Portrait: "iPad" below — slides in from bottom */}
        <AnimatePresence>
          {isPortrait && (
            <motion.div
              key="portrait-label-bottom"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              aria-hidden="true"
              style={iPadPortraitStyle}
            >
              iPad
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </div>
    </div>
  );
}
