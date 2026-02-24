"use client";

import { motion } from "framer-motion";
import type { AppId } from "@/data/content";

// App imports
import AboutApp from "./AboutApp";
import WorkApp from "./WorkApp";
import ProjectsApp from "./ProjectsApp";
import EducationApp from "./EducationApp";
import SkillsApp from "./SkillsApp";
import MusicApp from "./MusicApp";
import PhotosApp from "./PhotosApp";
import ContactApp from "./ContactApp";
import SettingsApp from "./SettingsApp";

interface Props {
  appId: AppId;
  onClose: () => void;
  orientation: "landscape" | "portrait";
}

const appMap: Record<string, React.ComponentType<{ onClose: () => void; orientation: string }>> = {
  about: AboutApp,
  work: WorkApp,
  projects: ProjectsApp,
  education: EducationApp,
  skills: SkillsApp,
  music: MusicApp,
  photos: PhotosApp,
  contact: ContactApp,
  settings: SettingsApp,
};

export default function AppWindow({ appId, onClose, orientation }: Props) {
  const AppComponent = appMap[appId];

  if (!AppComponent) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: "inherit",
        overflow: "hidden",
      }}
      initial={{ scale: 0.88, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.88, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    >
      {/* App content — takes all available space above home indicator */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <AppComponent onClose={onClose} orientation={orientation} />
      </div>

      {/* ── Home Indicator — tap/swipe to go home ── */}
      <motion.div
        onClick={onClose}
        style={{
          height: 20,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "rgba(242,242,247,0.95)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "0.5px solid rgba(60,60,67,0.12)",
        }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.div
          whileHover={{ scaleX: 1.15, background: "rgba(0,0,0,0.35)" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            width: 120,
            height: 5,
            borderRadius: 3,
            background: "rgba(0,0,0,0.2)",
            transition: "background 0.2s",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
