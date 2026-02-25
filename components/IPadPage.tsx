"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IPadFrame from "./ipad/IPadFrame";
import HomeScreen from "./ipad/HomeScreen";
import AppWindow from "./apps/AppWindow";
import SpotifyApp from "./apps/SpotifyApp";
import type { AppId } from "@/data/content";

const IPAD_LANDSCAPE = { w: 900, h: 630 };
const IPAD_PORTRAIT = { w: 630, h: 900 };

export default function IPadPage() {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(true);
  const [locked, setLocked] = useState(true);
  const [screenOff, setScreenOff] = useState(false);
  const [userScale, setUserScale] = useState<number | null>(null);
  const resizeDragRef = useRef({ active: false, startX: 0, startY: 0, startScale: 1 });

  const updateScale = useCallback((orient: "landscape" | "portrait") => {
    const ipad = orient === "landscape" ? IPAD_LANDSCAPE : IPAD_PORTRAIT;
    const scaleW = (window.innerWidth * 0.92) / ipad.w;
    const scaleH = (window.innerHeight * 0.88) / ipad.h;
    setScale(Math.min(scaleW, scaleH));
  }, []);

  const handleOrientationChange = useCallback(
    async (newOrientation: "landscape" | "portrait") => {
      setVisible(false);
      await new Promise((r) => setTimeout(r, 200));
      setOrientation(newOrientation);
      updateScale(newOrientation);
      setVisible(true);
    },
    [updateScale]
  );

  const getOrientation = useCallback((): "landscape" | "portrait" => {
    // On mobile devices, use actual screen orientation (width > height = landscape)
    // This way, rotating phone sideways gives landscape iPad
    const isMobile = window.innerWidth <= 1024 && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isMobile) {
      return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    }
    // On desktop, use breakpoint
    return window.innerWidth < 960 ? "portrait" : "landscape";
  }, []);

  const handlePowerPress = useCallback(() => {
    if (screenOff) {
      // Turn screen on → go to lock screen
      setScreenOff(false);
      setLocked(true);
      setOpenApp(null);
    } else {
      // Turn screen off → go black
      setScreenOff(true);
    }
  }, [screenOff]);

  useEffect(() => {
    const initial = getOrientation();
    setOrientation(initial);
    updateScale(initial);
  }, [getOrientation, updateScale]);

  useEffect(() => {
    let pending = false;
    const onResize = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        setUserScale(null);
        const next = getOrientation();
        setOrientation((cur) => {
          if (next !== cur) handleOrientationChange(next);
          else updateScale(next);
          return cur;
        });
      });
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [handleOrientationChange, updateScale, getOrientation]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeDragRef.current.active) return;
      const dx = e.clientX - resizeDragRef.current.startX;
      const dy = e.clientY - resizeDragRef.current.startY;
      const delta = (dx + dy) / 500;
      const newScale = Math.max(0.3, Math.min(2.0, resizeDragRef.current.startScale + delta));
      setUserScale(newScale);
    };
    const handleMouseUp = () => {
      resizeDragRef.current.active = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const effectiveScale = userScale ?? scale;

  return (
    <div className="ipad-viewport">
      {/* Background */}
      <div className="page-bg" aria-hidden="true">
        <div className="page-label-left">Caleb&apos;s</div>
        <div className="page-label-right">iPad</div>
      </div>

      {/* iPad */}
      <motion.div
        animate={{ opacity: visible ? 1 : 0, scale: visible ? effectiveScale : effectiveScale * 0.97 }}
        initial={{ opacity: 0, scale: effectiveScale * 0.97 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{
          transformOrigin: "center center",
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <IPadFrame orientation={orientation} onPowerPress={handlePowerPress}>
          {/* HomeScreen is always mounted - never remounts when app closes */}
          <HomeScreen
            orientation={orientation}
            onOpenApp={setOpenApp}
            locked={locked}
            onUnlock={() => setLocked(false)}
          />
          {/* Persistently mounted Spotify - iframes cached so reopening is instant */}
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

          {/* Screen-off overlay */}
          <AnimatePresence>
            {screenOff && (
              <motion.div
                key="screen-off"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setScreenOff(false);
                  setLocked(true);
                  setOpenApp(null);
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#000000",
                  zIndex: 100,
                  cursor: "pointer",
                }}
              />
            )}
          </AnimatePresence>
        </IPadFrame>

        {/* Resize handle */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            const currentScale = userScale ?? scale;
            resizeDragRef.current = { active: true, startX: e.clientX, startY: e.clientY, startScale: currentScale };
          }}
          style={{
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 32,
            height: 32,
            cursor: "nwse-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.4,
            transition: "opacity 0.2s",
            zIndex: 20,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
          title="Drag to resize"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="rgba(255,255,255,0.8)">
            <path d="M14 8L8 14L14 14L14 8Z" />
            <path d="M14 2L2 14L4 14L14 4Z" opacity="0.6" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
