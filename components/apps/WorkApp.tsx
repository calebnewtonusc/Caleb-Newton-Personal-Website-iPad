"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { experience } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

export default function WorkApp({ onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedExp = experience.find((e) => e.id === selected);

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      {/* Nav Bar */}
      <div className="ios-nav-bar">
        <button
          onClick={selected ? () => setSelected(null) : onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#007aff",
            fontSize: 17,
          }}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path
              d="M8.5 1L1 8.5L8.5 16"
              stroke="#007aff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {selected ? "Work" : "Home"}
        </button>
        <span className="ios-headline" style={{ color: "#1c1c1e" }}>
          {selected ? selectedExp?.company : "Experience"}
        </span>
        <div style={{ width: 60 }} />
      </div>

      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto" }}
      >
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              style={{ padding: "16px 16px 32px" }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 20 }}
              >
                <h1
                  className="ios-large-title font-poppins"
                  style={{ color: "#1c1c1e", marginBottom: 4 }}
                >
                  Work
                </h1>
                <p style={{ fontSize: 15, color: "#636366" }}>
                  Research, engineering, and more
                </p>
              </motion.div>

              {/* Timeline */}
              <div style={{ position: "relative" }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: "absolute",
                    left: 18,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background:
                      "linear-gradient(180deg, #34c759 0%, rgba(52,199,89,0.1) 100%)",
                    borderRadius: 1,
                  }}
                />

                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      display: "flex",
                      gap: 16,
                      marginBottom: 16,
                      cursor: "pointer",
                    }}
                    onClick={() => setSelected(exp.id)}
                  >
                    {/* Timeline dot */}
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: exp.color,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 0 3px rgba(52,199,89,0.2)`,
                        zIndex: 1,
                        overflow: "hidden",
                      }}
                    >
                      {exp.logo ? (
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={38}
                          height={38}
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>
                          {exp.company[0]}
                        </span>
                      )}
                    </div>

                    {/* Card */}
                    <div
                      style={{
                        flex: 1,
                        background: "white",
                        borderRadius: 16,
                        padding: "14px 16px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: exp.color,
                            background: `${exp.color}18`,
                            padding: "2px 8px",
                            borderRadius: 6,
                          }}
                        >
                          {exp.year}
                        </span>
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                          <path
                            d="M1 1L7 6.5L1 12"
                            stroke="#c7c7cc"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h3
                        className="font-poppins"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "#1c1c1e",
                          marginBottom: 2,
                          lineHeight: 1.3,
                        }}
                      >
                        {exp.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "#636366", marginBottom: 6 }}>
                        {exp.company} · {exp.period}
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
                        }}
                      >
                        {exp.description}
                      </p>
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
              style={{ padding: "16px 16px 32px" }}
            >
              {selectedExp && (
                <>
                  {/* Header card */}
                  <div
                    style={{
                      background: "white",
                      borderRadius: 20,
                      padding: 20,
                      marginBottom: 16,
                      boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center",
                        marginBottom: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          background: selectedExp.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        {selectedExp.logo ? (
                          <Image
                            src={selectedExp.logo}
                            alt={selectedExp.company}
                            width={52}
                            height={52}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ color: "white", fontSize: 22, fontWeight: 700 }}>
                            {selectedExp.company[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <h2
                          className="font-poppins"
                          style={{ fontSize: 18, fontWeight: 700, color: "#1c1c1e" }}
                        >
                          {selectedExp.company}
                        </h2>
                        <p style={{ fontSize: 13, color: "#636366" }}>
                          {selectedExp.period}
                        </p>
                      </div>
                    </div>
                    <p
                      style={{ fontSize: 15, fontWeight: 600, color: "#1c1c1e", marginBottom: 8 }}
                    >
                      {selectedExp.title}
                    </p>
                    <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.6 }}>
                      {selectedExp.description}
                    </p>
                  </div>

                  {/* Achievements */}
                  {selectedExp.achievements.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <p className="ios-section-header" style={{ paddingLeft: 4 }}>
                        Key Achievements
                      </p>
                      <div
                        style={{
                          background: "white",
                          borderRadius: 16,
                          padding: "8px 16px",
                          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        }}
                      >
                        {selectedExp.achievements.map((a, i, arr) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              gap: 10,
                              padding: "10px 0",
                              borderBottom:
                                i < arr.length - 1
                                  ? "0.5px solid rgba(60,60,67,0.1)"
                                  : "none",
                            }}
                          >
                            <span
                              style={{
                                color: selectedExp.color,
                                fontSize: 16,
                                flexShrink: 0,
                                marginTop: 1,
                              }}
                            >
                              ✓
                            </span>
                            <p style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.5 }}>
                              {a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {selectedExp.skills.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <p className="ios-section-header" style={{ paddingLeft: 4 }}>
                        Skills Used
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {selectedExp.skills.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: selectedExp.color,
                              background: `${selectedExp.color}18`,
                              border: `1px solid ${selectedExp.color}33`,
                              borderRadius: 10,
                              padding: "5px 12px",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photos */}
                  {selectedExp.photos.length > 0 && (
                    <div>
                      <p className="ios-section-header" style={{ paddingLeft: 4 }}>
                        Photos
                      </p>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {selectedExp.photos.map((photo, i) => (
                          <div
                            key={i}
                            style={{
                              width: 120,
                              height: 90,
                              borderRadius: 12,
                              overflow: "hidden",
                              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Image
                              src={photo}
                              alt={`${selectedExp.company} photo ${i + 1}`}
                              width={120}
                              height={90}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
