"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile, social } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: "easeOut" as const },
});

export default function AboutApp({ onClose }: Props) {
  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto", padding: "20px 16px 32px" }}
      >
        {/* Profile hero - Laolu-inspired */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: "24px 20px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
              display: "flex",
              gap: 18,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "3px solid #34c759",
                boxShadow: "0 0 0 4px rgba(52,199,89,0.2)",
              }}
            >
              <Image
                src={profile.photo}
                alt="Caleb Newton"
                width={90}
                height={90}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h1
                className="font-poppins"
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#1c1c1e",
                  letterSpacing: -0.5,
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                Caleb Newton
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: "#636366",
                  marginBottom: 8,
                }}
              >
                {profile.tagline}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {profile.skills.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#34c759",
                      background: "rgba(52,199,89,0.1)",
                      borderRadius: 8,
                      padding: "3px 8px",
                      border: "1px solid rgba(52,199,89,0.25)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Roles */}
        <motion.div {...fadeUp(0.06)} style={{ marginBottom: 24 }}>
          <p
            className="ios-section-header ios-grouped-list"
            style={{ paddingTop: 0 }}
          >
            I am a
          </p>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "16px 20px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            {profile.roles.map((role, i) => (
              <div
                key={role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom:
                    i < profile.roles.length - 1
                      ? "0.5px solid rgba(60,60,67,0.1)"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#34c759",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-poppins"
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#1c1c1e",
                  }}
                >
                  {role}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: 24 }}>
          <p className="ios-section-header" style={{ paddingLeft: 16 }}>
            Bio
          </p>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "16px 20px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "#3a3a3c",
                fontFamily: "var(--font-sf)",
              }}
            >
              {profile.bio}
            </p>
          </div>
        </motion.div>

        {/* Currently */}
        <motion.div {...fadeUp(0.14)} style={{ marginBottom: 24 }}>
          <p className="ios-section-header" style={{ paddingLeft: 16 }}>
            Currently
          </p>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "16px 20px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            {[
              "Expanding my taste in music and film (RateYourMusic & Letterboxd)",
              "Hiking trails and finding God in creation",
              "Playing board games, spikeball, and pickleball",
              "Exploring biohacking and optimizing daily routines",
              "Building holographic video systems at AINA Tech",
            ].map((item, i, arr) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "8px 0",
                  borderBottom:
                    i < arr.length - 1
                      ? "0.5px solid rgba(60,60,67,0.1)"
                      : "none",
                }}
              >
                <span style={{ color: "#34c759", fontSize: 14, marginTop: 1 }}>
                  {"\u2192"}
                </span>
                <span style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div {...fadeUp(0.18)}>
          <p className="ios-section-header" style={{ paddingLeft: 16 }}>
            Find Me
          </p>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            {[
              {
                label: "GitHub",
                value: "calebnewtonusc",
                url: social.github,
                color: "#24292e",
              },
              {
                label: "LinkedIn",
                value: "caleb-newton",
                url: social.linkedin,
                color: "#0a66c2",
              },
              {
                label: "YouTube",
                value: "The Lines",
                url: social.youtube,
                color: "#ff0000",
              },
              {
                label: "Letterboxd",
                value: "cnewt",
                url: social.letterboxd,
                color: "#ff8000",
              },
              {
                label: "RateYourMusic",
                value: "~cnewt",
                url: social.rateyourmusic,
                color: "#ed1c24",
              },
              {
                label: "X",
                value: "@klubnootuhn",
                url: social.x,
                color: "#000000",
              },
            ].map((link, i, arr) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "13px 20px",
                  gap: 12,
                  borderBottom:
                    i < arr.length - 1
                      ? "0.5px solid rgba(60,60,67,0.15)"
                      : "none",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: link.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: "white",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {link.label[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#1c1c1e" }}>
                    {link.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#8e8e93" }}>
                    {link.value}
                  </div>
                </div>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                  <path
                    d="M1 1L7 6.5L1 12"
                    stroke="#c7c7cc"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
