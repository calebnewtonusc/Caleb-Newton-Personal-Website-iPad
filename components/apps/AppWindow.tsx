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
      className="app-window"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <AppComponent onClose={onClose} orientation={orientation} />
    </motion.div>
  );
}
