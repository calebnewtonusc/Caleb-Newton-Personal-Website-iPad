"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

export default function ProjectsApp({ onClose, orientation }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const isLandscape = orientation === "landscape";
  const selectedProject = projects.find((p) => p.id === selected);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      {/* Nav Bar */}
      <div className="ios-nav-bar">
        <button
          onClick={selected ? () => setSelected(null) : onClose}
          style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {selected ? "Projects" : "Home"}
        </button>
        <span className="ios-headline" style={{ color: "#1c1c1e" }}>
          {selected ? selectedProject?.title : "Projects"}
        </span>
        <div style={{ width: 60 }} />
      </div>

      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "16px 16px 32px" }}
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
                <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>
                  Projects
                </h1>
                <p style={{ fontSize: 15, color: "#636366" }}>Building things that matter</p>
              </motion.div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isLandscape ? "repeat(2, 1fr)" : "1fr",
                  gap: 16,
                }}
              >
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(project.id)}
                    style={{
                      background: "white",
                      borderRadius: 20,
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    {/* Project image */}
                    <div style={{ height: 130, background: `${project.color}22`, position: "relative", overflow: "hidden" }}>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(135deg, ${project.color}44 0%, ${project.color}11 100%)`,
                        }}
                      />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover", opacity: 0.8 }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: project.color,
                          color: "white",
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: 8,
                          letterSpacing: 0.3,
                        }}
                      >
                        {project.category}
                      </div>
                    </div>

                    {/* Project info */}
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <h3 className="font-poppins" style={{ fontSize: 16, fontWeight: 700, color: "#1c1c1e" }}>
                          {project.title}
                        </h3>
                        <span style={{ fontSize: 11, color: "#8e8e93" }}>{project.year}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#636366", marginBottom: 10, fontWeight: 500 }}>
                        {project.subtitle}
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          color: "#3a3a3c",
                          lineHeight: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginBottom: 10,
                        }}
                      >
                        {project.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {project.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 10,
                              color: project.color,
                              background: `${project.color}15`,
                              borderRadius: 6,
                              padding: "2px 6px",
                              fontWeight: 600,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              style={{ padding: "0 0 32px" }}
            >
              {selectedProject && (
                <>
                  {/* Hero image */}
                  <div
                    style={{
                      height: 200,
                      background: `${selectedProject.color}22`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      style={{ objectFit: "cover", opacity: 0.85 }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 80,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                      }}
                    />
                    <div style={{ position: "absolute", bottom: 16, left: 20 }}>
                      <span
                        style={{
                          background: selectedProject.color,
                          color: "white",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 8,
                        }}
                      >
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: "16px 16px 0" }}>
                    <h2 className="font-poppins" style={{ fontSize: 24, fontWeight: 700, color: "#1c1c1e", marginBottom: 4 }}>
                      {selectedProject.title}
                    </h2>
                    <p style={{ fontSize: 14, color: "#636366", marginBottom: 16 }}>
                      {selectedProject.subtitle} · {selectedProject.year}
                    </p>

                    <p style={{ fontSize: 15, color: "#3a3a3c", lineHeight: 1.65, marginBottom: 20 }}>
                      {selectedProject.description}
                    </p>

                    {/* Tech stack */}
                    <p className="ios-section-header" style={{ paddingLeft: 0, marginBottom: 8 }}>
                      Tech Stack
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: selectedProject.color,
                            background: `${selectedProject.color}18`,
                            border: `1px solid ${selectedProject.color}33`,
                            borderRadius: 10,
                            padding: "5px 12px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div style={{ display: "flex", gap: 12 }}>
                      {selectedProject.live && (
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            background: selectedProject.color,
                            color: "white",
                            borderRadius: 14,
                            padding: "14px",
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          Live Demo ↗
                        </a>
                      )}
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            background: "#f2f2f7",
                            color: "#1c1c1e",
                            border: "1.5px solid #e5e5ea",
                            borderRadius: 14,
                            padding: "14px",
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
