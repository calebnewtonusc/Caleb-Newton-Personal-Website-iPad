"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { music, social } from "@/data/content";

type Tab = "new" | "old";

interface Props {
  onClose: () => void;
  orientation: string;
}

export default function SpotifyApp({ onClose: _onClose }: Props) {
  const [tab, setTab] = useState<Tab>("new");

  const albums = tab === "new" ? music.favoriteNewAlbums : music.favoriteOldAlbums;

  return (
    <div className="app-window" style={{ background: "#121212", display: "flex", flexDirection: "column" }}>
      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto", padding: "0 0 48px", background: "#121212", minHeight: 0 }}
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

        {/* Spotify Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{ margin: "14px 16px 0" }}
        >
          <a
            href={social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#1DB954",
              borderRadius: 14,
              padding: "12px 16px",
              textDecoration: "none",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.41c-.19.31-.6.4-.91.21-2.49-1.52-5.63-1.86-9.32-1.02-.36.08-.71-.14-.79-.49-.08-.36.14-.71.49-.79 4.04-.92 7.51-.53 10.32 1.18.3.19.4.6.21.91zm1.24-2.76c-.24.38-.74.5-1.12.27-2.85-1.75-7.19-2.26-10.56-1.24-.44.13-.9-.12-1.03-.55-.13-.44.12-.9.56-1.03 3.84-1.17 8.62-.6 11.89 1.43.38.24.5.74.26 1.12zm.11-2.87c-3.41-2.03-9.04-2.21-12.3-1.22-.52.16-1.07-.14-1.23-.66-.16-.52.14-1.07.66-1.23 3.74-1.14 9.96-.92 13.88 1.41.47.28.62.88.34 1.35-.28.47-.88.62-1.35.35z" />
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ color: "white", fontSize: 14, fontWeight: 700, fontFamily: "-apple-system, sans-serif" }}>
                Open My Spotify Profile
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "-apple-system, sans-serif" }}>
                @cnewt
              </p>
            </div>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path d="M1 1L7 6.5L1 12" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
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
