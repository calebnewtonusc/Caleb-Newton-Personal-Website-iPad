"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import IPadFrame from "./ipad/IPadFrame";
import HomeScreen from "./ipad/HomeScreen";
import AppWindow from "./apps/AppWindow";
import type { AppId } from "@/data/content";

export default function IPadPage() {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "landscape"
  );
  const [isRotating, setIsRotating] = useState(false);
  const [openApp, setOpenApp] = useState<AppId | null>(null);
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

    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch orientation changes from resize
  useEffect(() => {
    const checkOrientation = () => {
      const newOrientation =
        window.innerWidth < 960 ? "portrait" : "landscape";
      if (newOrientation !== orientation && !isRotating) {
        handleOrientationChange(newOrientation);
      }
    };
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, [orientation, isRotating, handleOrientationChange]);

  // Watermark items
  const watermarkRows = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="ipad-viewport">
      {/* ─── White background with "Caleb Newton" watermark ─── */}
      <div className="watermark-bg" aria-hidden="true">
        {watermarkRows.map((i) => (
          <span key={i}>Caleb Newton</span>
        ))}
      </div>

      {/* ─── iPad ─── */}
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
