"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { music } from "@/data/content";

type Tab = "new" | "old";

interface Props {
  onClose: () => void;
  orientation: string;
}

export default function SpotifyApp({ onClose: _onClose }: Props) {
  const [tab, setTab] = useState<Tab>("new");

  const albums = tab === "new" ? music.favoriteNewAlbums : music.favoriteOldAlbums;

  return (
    <div className="app-window" style={{ background: "#121212" }}>
      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto", padding: "0 0 32px" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "20px 16px 0" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            {/* Spotify logo mark */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#1DB954",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Simple speaker bars */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
            <div>
              <h1
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: 800,
                  fontFamily: "-apple-system, sans-serif",
                  lineHeight: 1,
                  letterSpacing: -0.5,
                }}
              >
                Music
              </h1>
              <p style={{ color: "#b3b3b3", fontSize: 13, marginTop: 2 }}>
                Caleb&apos;s listening
              </p>
            </div>
          </div>
        </motion.div>

        {/* Now Playing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{ margin: "16px 16px 0" }}
        >
          <p
            style={{
              color: "#1DB954",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              marginBottom: 8,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            Now Playing
          </p>
          <iframe
            src={`${music.currentlyPlaying.spotifyEmbed}&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ borderRadius: 12, display: "block" }}
          />
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ padding: "20px 16px 14px", display: "flex", gap: 8 }}
        >
          {(["new", "old"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "-apple-system, sans-serif",
                background: tab === t ? "#1DB954" : "#282828",
                color: tab === t ? "#000" : "#b3b3b3",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {t === "new" ? "New Favorites" : "Classic Favorites"}
            </button>
          ))}
        </motion.div>

        {/* Album list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}
          >
            {albums.map((album, i) => (
              <motion.div
                key={album.embedUrl}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <p
                  style={{
                    color: "#b3b3b3",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    marginBottom: 7,
                    fontFamily: "-apple-system, sans-serif",
                  }}
                >
                  {album.artist}
                </p>
                <iframe
                  src={`${album.embedUrl}&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  style={{ borderRadius: 12, display: "block" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
