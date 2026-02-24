"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile, social } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

export default function ContactApp({ onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Hi Caleb,\n\n${message}\n\nFrom: ${name} (${email})`);
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

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
          <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e", marginBottom: 4 }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: 15, color: "#636366" }}>
            I&apos;d love to hear from you
          </p>
        </motion.div>

        {/* Quick contact card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{ marginBottom: 24 }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #34c759, #30b050)",
              borderRadius: 20,
              padding: "20px",
              color: "white",
              marginBottom: 12,
            }}
          >
            <p className="font-poppins" style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              Let&apos;s connect!
            </p>
            <p style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>
              Whether it&apos;s ML research, internships, collaborations, or just to say hi - my inbox is open.
            </p>
          </div>

          <a
            href={`mailto:${profile.email}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "white",
              borderRadius: 16,
              padding: "14px 18px",
              textDecoration: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              marginBottom: 10,
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#007aff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect x="0.5" y="0.5" width="19" height="15" rx="3.5" stroke="white" strokeOpacity="0.8"/>
                <path d="M1 2L10 9L19 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1c1c1e" }}>Email</p>
              <p style={{ fontSize: 13, color: "#636366" }}>{profile.email}</p>
            </div>
            <svg style={{ marginLeft: "auto" }} width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>

          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "white",
              borderRadius: 16,
              padding: "14px 18px",
              textDecoration: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0a66c2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "white", fontWeight: 900 }}>
              in
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1c1c1e" }}>LinkedIn</p>
              <p style={{ fontSize: 13, color: "#636366" }}>caleb-newton-3680041a5</p>
            </div>
            <svg style={{ marginLeft: "auto" }} width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>
        </motion.div>

        {/* Contact form */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <p className="ios-section-header" style={{ paddingLeft: 0 }}>Send a Message</p>
          <form onSubmit={handleSubmit}>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              <div style={{ padding: "14px 18px", borderBottom: "0.5px solid rgba(60,60,67,0.15)" }}>
                <label style={{ fontSize: 12, color: "#8e8e93", display: "block", marginBottom: 4 }}>YOUR NAME</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: 16,
                    color: "#1c1c1e",
                    background: "transparent",
                    fontFamily: "var(--font-sf)",
                  }}
                />
              </div>
              <div style={{ padding: "14px 18px", borderBottom: "0.5px solid rgba(60,60,67,0.15)" }}>
                <label style={{ fontSize: 12, color: "#8e8e93", display: "block", marginBottom: 4 }}>YOUR EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: 16,
                    color: "#1c1c1e",
                    background: "transparent",
                    fontFamily: "var(--font-sf)",
                  }}
                />
              </div>
              <div style={{ padding: "14px 18px" }}>
                <label style={{ fontSize: 12, color: "#8e8e93", display: "block", marginBottom: 4 }}>MESSAGE</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Caleb, I wanted to reach out about..."
                  required
                  rows={4}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: 16,
                    color: "#1c1c1e",
                    background: "transparent",
                    fontFamily: "var(--font-sf)",
                    resize: "none",
                    lineHeight: 1.5,
                  }}
                />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              style={{
                width: "100%",
                background: sent ? "#34c759" : "#007aff",
                color: "white",
                borderRadius: 16,
                padding: "16px",
                fontSize: 17,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s",
                fontFamily: "var(--font-sf)",
              }}
            >
              {sent ? "Message Sent!" : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
