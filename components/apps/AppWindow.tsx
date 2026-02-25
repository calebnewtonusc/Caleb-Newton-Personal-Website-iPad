"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
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

export default function AppWindow({ appId, onClose, orientation }: Props) {
  const AppComponent = appMap[appId];
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startY: 0, startX: 0 });
  const touchRef = useRef({ startY: 0, startX: 0 });
  const isNearBottomRef = useRef(false);
  const closedRef = useRef(false);

  const safeClose = useCallback(() => {
    if (!closedRef.current) {
      closedRef.current = true;
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    closedRef.current = false;
  }, [appId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track if cursor is near the bottom zone
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      isNearBottomRef.current = e.clientY > rect.bottom - 80;

      // Handle drag-up to close
      if (dragRef.current.active) {
        const dy = dragRef.current.startY - e.clientY;
        if (dy > 120) {
          dragRef.current.active = false;
          safeClose();
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      dragRef.current = { active: true, startY: e.clientY, startX: e.clientX };
    };

    const handleMouseUp = () => {
      dragRef.current.active = false;
    };

    // Scroll up near bottom → exit
    const handleWheel = (e: WheelEvent) => {
      if (isNearBottomRef.current && e.deltaY < 0) {
        e.stopPropagation();
        safeClose();
      }
    };

    // Touch: swipe up to exit
    const handleTouchStart = (e: TouchEvent) => {
      touchRef.current = { startY: e.touches[0].clientY, startX: e.touches[0].clientX };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const dy = touchRef.current.startY - e.changedTouches[0].clientY;
      const dx = Math.abs(touchRef.current.startX - e.changedTouches[0].clientX);
      // Swipe up at least 80px, and more vertical than horizontal
      if (dy > 80 && dy > dx) {
        safeClose();
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
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
        borderRadius: "inherit",
        overflow: "hidden",
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

      {/* Home Indicator - clickable, also acts as visual swipe target */}
      <motion.div
        onClick={onClose}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 20,
          paddingBottom: 4,
        }}
        whileHover={{ scaleX: 1.18, opacity: 0.85 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div style={{ width: 120, height: 5, borderRadius: 3, background: "rgba(150,150,150,0.45)" }} />
      </motion.div>
    </motion.div>
  );
}
