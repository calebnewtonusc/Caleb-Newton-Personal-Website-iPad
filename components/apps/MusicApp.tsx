"use client";

import { motion } from "framer-motion";
import { music, social } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

function AlbumCard({ artist, album, color, delay }: { artist: string; album: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      style={{
        background: "white",
        borderRadius: 16,
        padding: "14px 16px",
        boxShadow: "0 3px 16px rgba(0,0,0,0.08)",
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          color: "white",
          fontFamily: "-apple-system, sans-serif",
          flexShrink: 0,
        }}
      >
        {artist[0]}
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1c1c1e", marginBottom: 2 }}>{artist}</p>
        <p style={{ fontSize: 12, color: "#8e8e93" }}>{album}</p>
      </div>
    </motion.div>
  );
}

const albumColors = ["#FF2D55", "#AF52DE", "#FF9500", "#007AFF", "#34C759", "#FF3B30", "#5AC8FA", "#FFCC00"];

export default function MusicApp({ onClose }: Props) {
  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div className="ios-nav-bar">
        <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 4, color: "#007aff", fontSize: 17 }}>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path d="M8.5 1L1 8.5L8.5 16" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
          <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>Music</h1>
          <p style={{ fontSize: 15, color: "#636366" }}>Vinyl, concerts & carefully curated playlists</p>
        </motion.div>

        {/* Vinyl collector badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          style={{
            background: "linear-gradient(135deg, #FF2D55, #AF52DE)",
            borderRadius: 20,
            padding: "20px 20px",
            marginBottom: 20,
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "white", fontFamily: "-apple-system, sans-serif" }}>
              V
            </div>
            <div>
              <p className="font-poppins" style={{ fontSize: 18, fontWeight: 700 }}>Vinyl Collector</p>
              <p style={{ fontSize: 13, opacity: 0.85 }}>Jazz - Hip-Hop - Gospel - R&B - Indie</p>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.9 }}>
            Music isn&apos;t just background noise - it&apos;s how I process the world. Collecting vinyl since high school.
          </p>
        </motion.div>

        {/* Spotify link */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: 20 }}>
          <a
            href={social.spotify}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#1DB954",
              borderRadius: 16,
              padding: "14px 18px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(29,185,84,0.35)",
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white", fontFamily: "-apple-system, sans-serif" }}>
              S
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Listen on Spotify</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Follow along</p>
            </div>
            <svg style={{ marginLeft: "auto" }} width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path d="M1 1L7 6.5L1 12" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </motion.div>

        {/* RateYourMusic */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} style={{ marginBottom: 20 }}>
          <a
            href={social.rateyourmusic}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#ED1C24",
              borderRadius: 16,
              padding: "14px 18px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(237,28,36,0.3)",
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white", fontFamily: "-apple-system, sans-serif" }}>
              R
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>RateYourMusic</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>~cnewt &middot; ratings & reviews</p>
            </div>
            <svg style={{ marginLeft: "auto" }} width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path d="M1 1L7 6.5L1 12" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </motion.div>

        {/* Favorite new albums */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} style={{ marginBottom: 20 }}>
          <p className="ios-section-header" style={{ paddingLeft: 0 }}>Current Rotation</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {music.favoriteNewAlbums.map((album, i) => (
              <AlbumCard key={album.artist} artist={album.artist} album={album.album} color={albumColors[i]} delay={0.2 + i * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* All-time favorites */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="ios-section-header" style={{ paddingLeft: 0 }}>All-Time Greats</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {music.favoriteOldAlbums.map((album, i) => (
              <AlbumCard key={album.artist} artist={album.artist} album={album.album} color={albumColors[i + 4]} delay={0.32 + i * 0.05} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
