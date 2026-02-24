"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { photos } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

export default function PhotosApp({ onClose, orientation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const isLandscape = orientation === "landscape";
  const cols = isLandscape ? 3 : 2;

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "16px 16px 32px" }}
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
                <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>Photos</h1>
                <p style={{ fontSize: 15, color: "#636366" }}>Life outside the code</p>
              </motion.div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: 10,
                }}
              >
                {photos.map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelected(i)}
                    style={{
                      aspectRatio: "1",
                      borderRadius: 14,
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
                      position: "relative",
                      transform: `rotate(${photo.rotation}deg)`,
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: "0 0 32px" }}
            >
              {/* Back button */}
              <div style={{ padding: "12px 16px 0" }}>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    color: "#007aff", fontSize: 16, background: "none",
                    border: "none", cursor: "pointer", padding: 0,
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  <svg width="8" height="13" viewBox="0 0 10 17" fill="none">
                    <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Photos
                </button>
              </div>

              {/* Full photo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{
                  margin: "16px 16px 0",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <div style={{ aspectRatio: "4/3", position: "relative" }}>
                  <Image
                    src={photos[selected].src}
                    alt={photos[selected].caption}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "40px 20px 20px",
                  }}
                >
                  <p style={{ color: "white", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    {photos[selected].caption}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
                    {photos[selected].date} &middot; {photos[selected].location}
                  </p>
                </div>
              </motion.div>

              {/* Navigation */}
              <div style={{ padding: "16px 16px 0", display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={() => setSelected(Math.max(0, selected - 1))}
                  disabled={selected === 0}
                  style={{
                    color: selected === 0 ? "#c7c7cc" : "#007aff",
                    fontSize: 17,
                    background: "none",
                    border: "none",
                    cursor: selected === 0 ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {"\u2190"} Previous
                </button>
                <span style={{ fontSize: 13, color: "#8e8e93" }}>
                  {selected + 1} / {photos.length}
                </span>
                <button
                  onClick={() => setSelected(Math.min(photos.length - 1, selected + 1))}
                  disabled={selected === photos.length - 1}
                  style={{
                    color: selected === photos.length - 1 ? "#c7c7cc" : "#007aff",
                    fontSize: 17,
                    background: "none",
                    border: "none",
                    cursor: selected === photos.length - 1 ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Next {"\u2192"}
                </button>
              </div>

              {/* Filmstrip thumbnails */}
              <div style={{ padding: "16px 16px 0", display: "flex", gap: 8, overflowX: "auto" }}>
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setSelected(i)}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 10,
                      overflow: "hidden",
                      cursor: "pointer",
                      flexShrink: 0,
                      border: i === selected ? "2.5px solid #007aff" : "2px solid transparent",
                      position: "relative",
                    }}
                  >
                    <Image src={photo.src} alt={photo.caption} fill style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
