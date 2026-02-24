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

  const updateScale = useCallback((orient: "landscape" | "portrait") => {
    const ipad = orient === "landscape" ? IPAD_LANDSCAPE : IPAD_PORTRAIT;
    const scaleW = (window.innerWidth * 0.95) / ipad.w;
    const scaleH = (window.innerHeight * 0.92) / ipad.h;
    setScale(Math.min(scaleW, scaleH, 1));
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
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.96 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
          zIndex: 10,
        }}
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
  );
}
