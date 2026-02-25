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

  // All close/hover detection via container-level listeners.
  // Wheel + Y-position check: no click required to trigger close.
  // Mouse events bubble from child elements up to the container, so this works
  // even if app content has its own scroll handlers.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY >= 0) return; // only upward scroll triggers close
      const rect = container.getBoundingClientRect();
      if (e.clientY >= rect.bottom - CLOSE_ZONE_PX) {
        safeClose();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setPillHovered(e.clientY >= rect.bottom - HOVER_ZONE_PX);

      if (dragRef.current.active) {
        const dy = dragRef.current.startY - e.clientY;
        if (dy > 120) {
          dragRef.current.active = false;
          safeClose();
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      dragRef.current = { active: true, startY: e.clientY, startX: e.clientX };
    };

    const onMouseLeave = () => {
      setPillHovered(false);
      dragRef.current.active = false;
    };

    const onMouseUp = () => { dragRef.current.active = false; };

    const onTouchStart = (e: TouchEvent) => {
      touchRef.current = { startY: e.touches[0].clientY, startX: e.touches[0].clientX };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchRef.current.startY - e.changedTouches[0].clientY;
      const dx = Math.abs(touchRef.current.startX - e.changedTouches[0].clientX);
      if (dy > 80 && dy > dx) safeClose();
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [safeClose]);

  if (!AppComponent) return null;

  return (
    <motion.div
      ref={containerRef}
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
      <div
        onClick={safeClose}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 34,
          display: "flex",
          alignItems: "center",
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
