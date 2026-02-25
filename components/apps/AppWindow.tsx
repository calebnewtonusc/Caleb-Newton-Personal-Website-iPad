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

export default function AppWindow({ appId, onClose, orientation }: Props) {
  const AppComponent = appMap[appId];
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Returns true if the pointer is within the pill's bounding box
    const overPill = (clientX: number, clientY: number) => {
      const pr = pillRef.current?.getBoundingClientRect();
      if (!pr) return false;
      return clientX >= pr.left && clientX <= pr.right && clientY >= pr.top && clientY <= pr.bottom;
    };

    const onWheel = (e: WheelEvent) => {
      if (!container.contains(e.target as Node)) return;
      if (overPill(e.clientX, e.clientY)) safeClose();
    };

    const onMouseMove = (e: MouseEvent) => {
      setPillHovered(overPill(e.clientX, e.clientY));

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

    const onMouseUp = () => { dragRef.current.active = false; };

    const onTouchStart = (e: TouchEvent) => {
      touchRef.current = { startY: e.touches[0].clientY, startX: e.touches[0].clientX };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchRef.current.startY - e.changedTouches[0].clientY;
      const dx = Math.abs(touchRef.current.startX - e.changedTouches[0].clientX);
      if (dy > 80 && dy > dx) safeClose();
    };

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

      {/* Home indicator — centered pill-width hit area only */}
      <div
        ref={pillRef}
        onClick={safeClose}
        onWheel={() => safeClose()}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 140,
          height: 28,
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
