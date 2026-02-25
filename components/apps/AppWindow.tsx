"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";
import type { AppId } from "@/data/content";

// App imports
import WorkApp from "./WorkApp";
import ProjectsApp from "./ProjectsApp";
import EducationApp from "./EducationApp";
import FilesApp from "./FilesApp";
import PhotosApp from "./PhotosApp";
import ContactApp from "./ContactApp";
import SettingsApp from "./SettingsApp";
import CalebGPTApp from "./CalebGPTApp";
import SpotifyApp from "./SpotifyApp";
import BibleApp from "./BibleApp";

interface Props {
  appId: AppId;
  onClose: () => void;
  orientation: "landscape" | "portrait";
}

const appMap: Record<string, React.ComponentType<{ onClose: () => void; orientation: string }>> = {
  work: WorkApp,
  projects: ProjectsApp,
  education: EducationApp,
  files: FilesApp,
  photos: PhotosApp,
  contact: ContactApp,
  settings: SettingsApp,
  calebgpt: CalebGPTApp,
  spotify: SpotifyApp,
  bible: BibleApp,
};

// Bottom px: scroll-up here closes; hovered here shows pill highlight
// Keep equal so hovering anywhere the pill highlights = scroll-up closes
const CLOSE_ZONE_PX = 60;
const HOVER_ZONE_PX = 60;

export default function AppWindow({ appId, onClose, orientation }: Props) {
  const AppComponent = appMap[appId];
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startY: 0, startX: 0 });
  const touchRef = useRef({ startY: 0, startX: 0 });
  const closedRef = useRef(false);
  const [pillHovered, setPillHovered] = useState(false);

  const safeClose = useCallback(() => {
    if (!closedRef.current) {
      closedRef.current = true;
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    closedRef.current = false;
    setPillHovered(false);
  }, [appId]);

  // All close/hover detection via window-level listeners.
  // Containment uses container.contains(target) — DOM hierarchy is immune to
  // CSS transform/scale coordinate skew that can break getBoundingClientRect checks.
  // Pill hover still uses clientY vs rect.bottom for the zone threshold.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getRect = () => container.getBoundingClientRect();

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY >= 0) return;
      if (!container.contains(e.target as Node)) return;
      const r = getRect();
      if (e.clientY >= r.bottom - CLOSE_ZONE_PX) safeClose();
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = getRect();
      const inside = container.contains(e.target as Node);
      setPillHovered(inside && e.clientY >= r.bottom - HOVER_ZONE_PX);

      if (dragRef.current.active) {
        const dy = dragRef.current.startY - e.clientY;
        if (dy > 80) {
          dragRef.current.active = false;
          safeClose();
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (container.contains(e.target as Node)) {
        dragRef.current = { active: true, startY: e.clientY, startX: e.clientX };
      }
    };

    const onMouseUp = () => {
      dragRef.current.active = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchRef.current = { startY: e.touches[0].clientY, startX: e.touches[0].clientX };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchRef.current.startY - e.changedTouches[0].clientY;
      const dx = Math.abs(touchRef.current.startX - e.changedTouches[0].clientX);
      if (dy > 80 && dy > dx) safeClose();
    };

    // capture:true fires before any child stopPropagation can block us
    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [safeClose]);

  if (!AppComponent) return null;

  return (
    <motion.div
      ref={containerRef}
      onWheel={(e) => {
        if (e.deltaY < 0) {
          const r = containerRef.current?.getBoundingClientRect();
          if (r && e.clientY >= r.bottom - CLOSE_ZONE_PX) safeClose();
        }
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        overflow: "hidden",
        background: "#f2f2f7",
      }}
      initial={{ scale: 0.08, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.08, opacity: 0 }}
      transition={{ type: "spring", stiffness: 480, damping: 36 }}
    >
      {/* App content */}
      <div style={{ position: "absolute", inset: 0 }}>
        <AppComponent onClose={onClose} orientation={orientation} />
      </div>

      {/* Home indicator — click or hover+scroll-up to exit */}
      {/* Height matches CLOSE_ZONE_PX so onWheel fires across the full close zone */}
      <div
        onClick={safeClose}
        onWheel={(e) => { if (e.deltaY < 0) safeClose(); }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: CLOSE_ZONE_PX,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 20,
          paddingBottom: 6,
        }}
      >
        <motion.div
          animate={{
            scaleX: pillHovered ? 1.35 : 1,
            opacity: pillHovered ? 0.9 : 0.45,
          }}
          whileTap={{ scaleX: 0.8 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: 120,
            height: 5,
            borderRadius: 3,
            background: "rgba(60,60,67,0.5)",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.div>
  );
}
