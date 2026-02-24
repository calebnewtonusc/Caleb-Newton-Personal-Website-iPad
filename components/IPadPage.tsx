"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IPadFrame from "./ipad/IPadFrame";
import HomeScreen from "./ipad/HomeScreen";
import AppWindow from "./apps/AppWindow";
import type { AppId } from "@/data/content";

const IPAD_LANDSCAPE = { w: 900, h: 630 };
const IPAD_PORTRAIT = { w: 630, h: 900 };

export default function IPadPage() {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">("landscape");
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(true);
  const [locked, setLocked] = useState(true);

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

  useEffect(() => {
    const initial = window.innerWidth < 960 ? "portrait" : "landscape";
    setOrientation(initial);
    updateScale(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let pending = false;
    const onResize = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const next = window.innerWidth < 960 ? "portrait" : "landscape";
        setOrientation((cur) => {
          if (next !== cur) handleOrientationChange(next);
          else updateScale(next);
          return cur;
        });
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [handleOrientationChange, updateScale]);

  return (
    <div className="ipad-viewport">
      {/* Background */}
      <div className="page-bg" aria-hidden="true">
        <div className="page-label-left">Caleb&apos;s</div>
        <div className="page-label-right">iPad</div>
      </div>

      {/* iPad */}
      <motion.div
        animate={{ opacity: visible ? 1 : 0, scale: visible ? scale : scale * 0.97 }}
        initial={{ opacity: 0, scale: scale * 0.97 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{
          transformOrigin: "center center",
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <IPadFrame orientation={orientation}>
          {/* HomeScreen is always mounted - never remounts when app closes */}
          <HomeScreen
            orientation={orientation}
            onOpenApp={setOpenApp}
            locked={locked}
            onUnlock={() => setLocked(false)}
          />
          <AnimatePresence>
            {openApp && (
              <AppWindow
                key={openApp}
                appId={openApp}
                onClose={() => setOpenApp(null)}
                orientation={orientation}
              />
            )}
          </AnimatePresence>
        </IPadFrame>
      </motion.div>
    </div>
  );
}
