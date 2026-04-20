"use client";

import { useState } from "react";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import { education } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

// Map each education entry to a full-text "note"
const noteContent: Record<string, { body: string }> = {
  usc: {
    body: `Aug 2025 - May 2029. Freshman at USC. Taking Multivariable Calculus, Linear Algebra, C++, and Discrete Methods simultaneously - dense, but each course feeds the others.

C++ is making me think about memory in ways Python never did. Linear algebra shows up in every AI paper. Building things here that I couldn't have imagined in high school.`,
  },
  smhs: {
    body: `Aug 2021 - June 2025. Graduated with 4.0+ GPA, AP Scholar with Distinction, and the Promethean Award - highest honor for a graduating student.

Led ACTS Christian Club, pitched for the baseball team, and wrestled. The academics gave me the foundation; everything else gave me the character.`,
  },
  berkeley: {
    body: `Summer CS Academy at UC Berkeley, June 2024. Covered abstraction, recursion, and algorithms through Snap! and Python.

The intro AI module lit a spark - seeing how a model learns patterns from data felt like discovering a superpower. Confirmed CS was my path.`,
  },
  cnsi: {
    body: `Two-week nanotechnology + entrepreneurship program at UCLA's CNSI in July 2023. Our team built AquaShield, a hydrophobic self-cleaning water bottle.

Handled MATLAB contact angle analysis and pitched to investors. Learned that great technical ideas die without clear communication.`,
  },
  stjohns: {
    body: `August 2010 to June 2011. Where it all began.

I tested gravity with block towers, competed in the Tricycle Racing League, and graduated with honors in Naptime Negotiation. The curiosity hasn't changed - just the tools.`,
  },
};

// Format date for notes
function noteDate(period: string): string {
  const yearMatch = period.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : "2025";
  const months: Record<string, string> = {
    Jan: "Jan",
    Feb: "Feb",
    Mar: "Mar",
    Apr: "Apr",
    May: "May",
    Jun: "Jun",
    July: "Jul",
    Aug: "Aug",
    Sep: "Sep",
    Oct: "Oct",
    Nov: "Nov",
    Dec: "Dec",
    August: "Aug",
    June: "Jun",
    January: "Jan",
  };
  for (const [k, v] of Object.entries(months)) {
    if (period.includes(k)) return `${v} ${year}`;
  }
  return year;
}

export default function EducationApp({ onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedEd = education.find((e) => e.id === selected);
  const recent = education[0]; // USC is most recent

  return (
    <LazyMotion features={domAnimation}>
      <div className="app-window" style={{ background: "#f2f2f7" }}>
        <AnimatePresence mode="wait">
          {!selected ? (
            /* LIST VIEW */
            <m.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                className="ios-scroll"
                style={{ flex: 1, overflowY: "auto", padding: "16px 0 32px" }}
              >
                {/* Title */}
                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ padding: "4px 16px 18px" }}
                >
                  <h1
                    className="ios-large-title font-poppins"
                    style={{ color: "#1c1c1e" }}
                  >
                    Notes
                  </h1>
                </m.div>

                {/* Recent Note featured card */}
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  style={{ margin: "0 16px 22px" }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: 18,
                      padding: 18,
                      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Label */}
                    <div style={{ marginBottom: 10 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#8e8e93",
                          letterSpacing: 0.2,
                        }}
                      >
                        Recent Note
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#1c1c1e",
                        lineHeight: 1.2,
                        marginBottom: 10,
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                        letterSpacing: -0.4,
                      }}
                    >
                      {recent.school}
                    </h2>

                    {/* Preview */}
                    <p
                      style={{
                        fontSize: 14,
                        color: "#636366",
                        lineHeight: 1.55,
                        marginBottom: 14,
                      }}
                    >
                      {noteContent[recent.id]?.body.slice(0, 100).trim()}...
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "#aeaeb2" }}>
                        {recent.period}
                      </span>
                      <m.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelected(recent.id)}
                        style={{
                          background: "white",
                          border: "none",
                          borderRadius: 20,
                          padding: "7px 18px",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1c1c1e",
                          cursor: "pointer",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                          fontFamily: "-apple-system, sans-serif",
                        }}
                      >
                        Open
                      </m.button>
                    </div>
                  </div>
                </m.div>

                {/* All Notes section */}
                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  style={{ margin: "0 16px" }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Section header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 16px 10px",
                        borderBottom: "0.5px solid rgba(60,60,67,0.12)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: "#1c1c1e",
                          fontFamily: "-apple-system, sans-serif",
                        }}
                      >
                        All Notes
                      </span>
                      <span style={{ fontSize: 13, color: "#8e8e93" }}>
                        {education.length} total
                      </span>
                    </div>

                    {/* List rows */}
                    {education.map((ed, i) => (
                      <m.div
                        key={ed.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.04 }}
                        whileTap={{ background: "rgba(0,0,0,0.04)" }}
                        onClick={() => setSelected(ed.id)}
                        style={{
                          padding: "12px 16px",
                          borderBottom:
                            i < education.length - 1
                              ? "0.5px solid rgba(60,60,67,0.1)"
                              : "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span
                            style={{
                              display: "block",
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#1c1c1e",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              marginBottom: 3,
                              fontFamily: "-apple-system, sans-serif",
                            }}
                          >
                            {ed.school}
                          </span>
                          <p
                            style={{
                              fontSize: 13,
                              color: "#8e8e93",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {noteContent[ed.id]?.body.slice(0, 60).trim()}...
                          </p>
                        </div>
                        {/* Date + arrow on same row, vertically centered together */}
                        <span
                          style={{
                            fontSize: 12,
                            color: "#aeaeb2",
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {noteDate(ed.period)}
                        </span>
                        <svg
                          width="8"
                          height="13"
                          viewBox="0 0 8 13"
                          fill="none"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M1 1L7 6.5L1 12"
                            stroke="#c7c7cc"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </m.div>
                    ))}
                  </div>
                </m.div>
              </div>
            </m.div>
          ) : (
            /* DETAIL VIEW */
            <m.div
              key={`detail-${selected}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "white",
              }}
            >
              {/* Back button - floating */}
              <div style={{ padding: "14px 16px 4px", flexShrink: 0 }}>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: "#8e8e93",
                    fontSize: 16,
                    fontWeight: 400,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "-apple-system, sans-serif",
                    padding: 0,
                  }}
                >
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                    <path
                      d="M7 1L1 6.5L7 12"
                      stroke="#8e8e93"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back
                </button>
              </div>

              {selectedEd && (
                <div
                  className="ios-scroll"
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "8px 20px 32px",
                  }}
                >
                  {/* Title */}
                  <h1
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: selectedEd.color,
                      letterSpacing: -0.6,
                      lineHeight: 1.2,
                      marginBottom: 8,
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    }}
                  >
                    {selectedEd.school}
                  </h1>

                  {/* Subtitle + date */}
                  <p
                    style={{
                      fontSize: 13,
                      color: "#aeaeb2",
                      marginBottom: 4,
                      letterSpacing: 0.1,
                    }}
                  >
                    {selectedEd.period}
                  </p>
                  {selectedEd.subtitle && (
                    <p
                      style={{
                        fontSize: 13,
                        color: "#636366",
                        marginBottom: 20,
                        fontStyle: "italic",
                      }}
                    >
                      {selectedEd.subtitle}
                    </p>
                  )}
                  {!selectedEd.subtitle && <div style={{ marginBottom: 20 }} />}

                  {/* Note body */}
                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.75,
                      color: "#1c1c1e",
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                    }}
                  >
                    {noteContent[selectedEd.id]?.body
                      .split("\n\n")
                      .map((para, paraNum) => (
                        <p key={`para-${paraNum}`} style={{ marginBottom: 18 }}>
                          {para}
                        </p>
                      ))}
                  </div>

                  {/* Highlights */}
                  {selectedEd.highlights.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <p
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#1c1c1e",
                          marginBottom: 10,
                          fontFamily:
                            "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                        }}
                      >
                        Highlights
                      </p>
                      {selectedEd.highlights.map((h, hNum) => (
                        <div
                          key={`highlight-${hNum}`}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            marginBottom: 10,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 20,
                              lineHeight: "1.55",
                              color: "#1c1c1e",
                              flexShrink: 0,
                              marginTop: -1,
                            }}
                          >
                            •
                          </span>
                          <p
                            style={{
                              fontSize: 16,
                              color: "#1c1c1e",
                              lineHeight: 1.55,
                              margin: 0,
                            }}
                          >
                            {h}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
