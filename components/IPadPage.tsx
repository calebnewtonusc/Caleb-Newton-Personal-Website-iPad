"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import IPadFrame from "./ipad/IPadFrame";
import HomeScreen from "./ipad/HomeScreen";
import AppWindow from "./apps/AppWindow";
import type { AppId } from "@/data/content";

// iPad dimensions (landscape: 900×630, portrait: 630×900)
const IPAD_LANDSCAPE = { w: 900, h: 630 };
const IPAD_PORTRAIT = { w: 630, h: 900 };

export default function IPadPage() {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "landscape"
  );
  const [isRotating, setIsRotating] = useState(false);
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [scale, setScale] = useState(1);
  const controls = useAnimation();

  const handleOrientationChange = useCallback(
    async (newOrientation: "landscape" | "portrait") => {
      if (isRotating) return;
      setIsRotating(true);

      const dir = newOrientation === "portrait" ? 90 : -90;

      // Phase 1: rotate toward edge (device goes edge-on)
      await controls.start({
        rotateZ: dir,
        scale: 0.85,
        transition: { duration: 0.38, ease: [0.4, 0, 0.6, 1] },
      });

      // Phase 2: swap orientation while edge-on (invisible transition)
      setOrientation(newOrientation);

      // Instantly reset to opposite edge
      controls.set({ rotateZ: -dir });

      // Phase 3: rotate back to flat
      await controls.start({
        rotateZ: 0,
        scale: 1,
        transition: { duration: 0.38, ease: [0.4, 0, 0.6, 1] },
      });

      setIsRotating(false);
    },
    [isRotating, controls]
  );

  // Compute scale to fit iPad in viewport with 5% padding
  const updateScale = useCallback((orient: "landscape" | "portrait") => {
    const ipad = orient === "landscape" ? IPAD_LANDSCAPE : IPAD_PORTRAIT;
    const scaleW = (window.innerWidth * 0.95) / ipad.w;
    const scaleH = (window.innerHeight * 0.92) / ipad.h;
    setScale(Math.min(scaleW, scaleH, 1));
  }, []);

  useEffect(() => {
    const checkOrientation = () => {
      const newOrientation =
        window.innerWidth < 960 ? "portrait" : "landscape";
      if (newOrientation !== orientation && !isRotating) {
        handleOrientationChange(newOrientation);
      }
    };

    // Initial check
    const initial = window.innerWidth < 960 ? "portrait" : "landscape";
    setOrientation(initial);
    updateScale(initial);

    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch orientation changes from resize + update scale
  useEffect(() => {
    const checkOrientation = () => {
      const newOrientation =
        window.innerWidth < 960 ? "portrait" : "landscape";
      if (newOrientation !== orientation && !isRotating) {
        handleOrientationChange(newOrientation);
      }
      updateScale(orientation);
    };
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, [orientation, isRotating, handleOrientationChange, updateScale]);

  // Update scale when orientation changes
  useEffect(() => {
    updateScale(orientation);
  }, [orientation, updateScale]);

  return (
    <div className="ipad-viewport">
      {/* ─── Background: clean gradient + side labels ─── */}
      <div className="page-bg" aria-hidden="true">
        <div className="page-label-left">Caleb&apos;s</div>
        <div className="page-label-right">iPad</div>
      </div>

      {/* ─── iPad ─── */}
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
      <motion.div
        animate={controls}
        style={{ originX: "50%", originY: "50%" }}
        className="relative z-10"
      >
        <IPadFrame orientation={orientation}>
          <AnimatePresence mode="wait">
            {openApp ? (
              <AppWindow
                key={openApp}
                appId={openApp}
                onClose={() => setOpenApp(null)}
                orientation={orientation}
              />
            ) : (
              <HomeScreen
                key="home"
                orientation={orientation}
                onOpenApp={setOpenApp}
              />
            )}
          </AnimatePresence>
        </IPadFrame>
      </motion.div>
      </div>

      {/* ─── Orientation hint on very small screens ─── */}
      <AnimatePresence>
        {orientation === "portrait" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none"
          >
            <div className="bg-black/60 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm">
              Rotate device or widen window for landscape view
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
