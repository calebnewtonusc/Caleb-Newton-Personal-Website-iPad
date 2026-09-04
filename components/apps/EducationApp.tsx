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
    body: `The Academy takes seventy students a year and it is built for people who do not fit cleanly into art, technology, or business, which was my exact problem when I applied. I did not have a tidy story for why I belonged there.

I got in anyway, and I credit God for the door being open.`,
  },
  smhs: {
    body: `Almost everything I actually learned in those four years happened outside a classroom.`,
  },
  huntington: {
    body: `Middle school was the hard part. I got bullied, and it taught me early that being the smart kid and being liked were not the same thing.

What I actually took from it: stop performing for rooms that were never going to clap, and pay attention to who shows up when there is nothing in it for them. I still sort people that way.`,
  },
  carver: {
    body: `Peak nerd era, and I would not trade it. I memorized 200 digits of pi at ten, solved Rubik's cubes, and built Lego robotics.

The part worth keeping is that none of it was self-conscious. I liked what I liked at full volume. Getting back to that has been most of the work of the last few years.`,
  },
  stjohns: {
    body: `Where it started. Block towers, the tricycle racing league, and roughly 47 uses of the word why per day.

I ask about the same number of questions now, just about different things.`,
  },
};

// Format date for notes: use the END of the period, which is when he left
function noteDate(period: string): string {
  const pairs = [...period.matchAll(/([A-Z][a-z]{2,8})\s+(\d{4})/g)];
  if (pairs.length === 0) {
    const y = period.match(/\d{4}/);
    return y ? y[0] : "";
  }
  const [, month, year] = pairs[pairs.length - 1];
  return `${month.slice(0, 3)} ${year}`;
}

export default function EducationApp({}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedEd = education.find((e) => e.id === selected);
  const recent = education[0]; // USC is most recent

  return (
    <LazyMotion features={domAnimation}>
      <div className="app-window" style={{ background: "var(--surface-sunken)" }}>
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
                    style={{ color: "var(--label)" }}
                  >
                    Education
                  </h1>
                </m.div>

                {/* Featured card */}
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  style={{ margin: "0 16px 22px" }}
                >
                  <div
                    style={{
                      background: "var(--surface)",
                      borderRadius: 18,
                      padding: 18,
                      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Title */}
                    <h2
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: "var(--label)",
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
                        color: "var(--label-3)",
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
                          background: "var(--surface)",
                          border: "none",
                          borderRadius: 20,
                          padding: "7px 18px",
                          fontSize: 14,
                          fontWeight: 600,
                          color: "var(--label)",
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

                {/* Entries */}
                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  style={{ margin: "0 16px" }}
                >
                  <div
                    style={{
                      background: "var(--surface)",
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* List rows */}
                    {education
                      .filter((ed) => ed.id !== recent.id)
                      .map((ed, i) => (
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
                              ? "0.5px solid var(--separator)"
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
                              color: "var(--label)",
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
                              color: "var(--label-4)",
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
                        <svg aria-hidden="true"
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
                background: "var(--surface)",
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
                    color: "var(--label-4)",
                    fontSize: 16,
                    fontWeight: 400,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "-apple-system, sans-serif",
                    padding: 0,
                  }}
                >
                  <svg aria-hidden="true" width="8" height="13" viewBox="0 0 8 13" fill="none">
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
                        color: "var(--label-3)",
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
                      color: "var(--label)",
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
                          color: "var(--label)",
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
                              color: "var(--label)",
                              flexShrink: 0,
                              marginTop: -1,
                            }}
                          >
                            •
                          </span>
                          <p
                            style={{
                              fontSize: 16,
                              color: "var(--label)",
                              lineHeight: 1.55,
                              margin: 0,
                            }}
                          >
                            {h}
                          </p>
                        </div>
                      ))}

                    {selectedEd.website && (
                      <a
                        href={selectedEd.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 18,
                          fontSize: 15,
                          fontWeight: 600,
                          color: "#007aff",
                          textDecoration: "none",
                        }}
                      >
                        {selectedEd.school} {"\u2197"}
                      </a>
                    )}
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
