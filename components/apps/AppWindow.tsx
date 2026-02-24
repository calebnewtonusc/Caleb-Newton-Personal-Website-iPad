"use client";

import { motion } from "framer-motion";
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

  if (!AppComponent) return null;

  return (
    <motion.div
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
      {/* App content -fills full AppWindow area */}
      <div style={{ position: "absolute", inset: 0 }}>
        <AppComponent onClose={onClose} orientation={orientation} />
      </div>

      {/* ── Home Indicator -overlays app at bottom, no white strip ── */}
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
