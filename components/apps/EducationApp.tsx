"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { education } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

// Map each education entry to a full-text "note"
const noteContent: Record<string, { body: string }> = {
  usc: {
    body: `I'm a freshman at the University of Southern California studying Computer Science and Applied Mathematics in the Viterbi School of Engineering. USC is where everything is clicking together - the theory I learned in high school is now becoming real systems I can build.

This semester I'm taking Multivariable Calculus, Linear Algebra, C++, and Discrete Methods simultaneously. It's dense, but I love how each course feeds the others. Linear algebra shows up in every ML paper I read. Calculus is the backbone of optimization. C++ is making me think about memory and performance in a way Python never did.

Outside class, I've found community through faith groups and meeting people who are serious about both their faith and their work. Building friendships with people who share my values while being serious about academics and building things is exactly what I was hoping for at USC.

My goal isn't just to graduate. I want to leave USC having built things that matter, contributed to real research, and grown into an engineer who solves hard problems.`,
  },
  smhs: {
    body: `San Marino High School shaped me more than I realized at the time. I graduated with a 4.0+ GPA, was named AP Scholar with Distinction, and received the Promethean Award - the highest honor for a graduating student.

But the numbers aren't what I remember most. I remember building ACTS Christian Club from a small group into something that connected students across the whole San Gabriel Valley. I remember baseball - pitching under pressure, learning to compete with composure. I remember wrestling, which taught me that the only way out is through.

SMHS gave me the academic foundation (AP Calculus, AP Computer Science, AP Physics) and the character development (leadership, faith, teamwork) that I'm drawing on every day at USC.

If I could go back and tell my freshman self anything: stay curious, invest in people, and don't wait to start building things.`,
  },
  berkeley: {
    body: `In June 2024, I attended UC Berkeley's Summer Computer Science Academy - an intensive program grounded in the Beauty and Joy of Computing (BJC) curriculum.

The course covered abstraction, recursion, and algorithms through Snap! before transitioning into Python. There was also an introductory machine learning module that genuinely lit a spark in me. Seeing how you could train a model to recognize patterns in data felt like discovering a superpower.

Berkeley's campus is electric. The energy of being surrounded by people obsessed with building and understanding things pushed me to think bigger about what I wanted to study and build.

This program confirmed that CS was my path - and that machine learning was the specific frontier I wanted to explore.`,
  },
  cnsi: {
    body: `In July 2023, I spent two weeks at the California Nanosystems Institute at UCLA for their Nanotechnology + Entrepreneurship Summer Program.

Our team built AquaShield - a hydrophobic water bottle that repels bacteria and self-cleans. We went from concept to prototype to investor pitch in two weeks. I handled MATLAB analysis for surface contact angle measurements and helped design the pitch deck.

The investor pitch was terrifying and exhilarating. Standing up and defending a technical product to people who could fund or kill it in 60 seconds forces you to know your material cold. It also taught me that the best technical ideas die without clear communication.

The program planted a seed: technology is most powerful when it solves a real problem, and the best engineers learn to pitch as well as they code.`,
  },
  stjohns: {
    body: `St. John's Nursery School, August 2010 to June 2011. Where it all began.

I tested gravity extensively using block towers of increasing height. My research consistently confirmed Newton's law - blocks do, in fact, fall. I submitted multiple informal peer reviews on the topic to my fellow students, primarily through demonstrations.

I also competed in the Tricycle Racing League (informal, no official standings), participated in the Story Time Enthusiasts collective, and graduated with full honors in the Fundamentals of Sharing and Naptime Negotiation curriculum.

The seeds of my love for building things, testing hypotheses, and collaborating with others were planted in sandbox form right here. I've come a long way from block towers, but the curiosity is the same.`,
  },
};

// Format date for notes
function noteDate(period: string): string {
  const yearMatch = period.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : "2025";
  const months: Record<string, string> = {
    Jan: "Jan", Feb: "Feb", Mar: "Mar", Apr: "Apr", May: "May", Jun: "Jun",
    July: "Jul", Aug: "Aug", Sep: "Sep", Oct: "Oct", Nov: "Nov", Dec: "Dec",
    August: "Aug", June: "Jun", January: "Jan",
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
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <AnimatePresence mode="wait">
        {!selected ? (
          /* LIST VIEW */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 0 32px" }}>
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: "4px 16px 18px" }}
              >
                <h1 className="ios-large-title font-poppins" style={{ color: "#1c1c1e" }}>Notes</h1>
              </motion.div>

              {/* Recent Note featured card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 }}
                style={{ margin: "0 16px 22px" }}
              >
                <div
                  style={{
                    background: "#fffde8",
                    border: "1px solid rgba(255,196,0,0.35)",
                    borderRadius: 18,
                    padding: 18,
                    boxShadow: "0 2px 16px rgba(255,196,0,0.12)",
                  }}
                >
                  {/* Label */}
                  <div style={{ marginBottom: 12 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "rgba(255,196,0,0.2)",
                        borderRadius: 20,
                        padding: "4px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#b8860b",
                      }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#c8960b", flexShrink: 0, display: "block" }} />
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
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                      letterSpacing: -0.4,
                    }}
                  >
                    {recent.school}
                  </h2>

                  {/* Preview */}
                  <p style={{ fontSize: 14, color: "#636366", lineHeight: 1.55, marginBottom: 14 }}>
                    {noteContent[recent.id]?.body.slice(0, 100).trim()}...
                  </p>

                  {/* Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#aeaeb2" }}>{noteDate(recent.period)}</span>
                    <motion.button
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
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* All Notes section */}
              <motion.div
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
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#1c1c1e", fontFamily: "-apple-system, sans-serif" }}>
                      All Notes
                    </span>
                    <span style={{ fontSize: 13, color: "#8e8e93" }}>{education.length} total</span>
                  </div>

                  {/* List rows */}
                  {education.map((ed, i) => (
                    <motion.div
                      key={ed.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.04 }}
                      whileTap={{ background: "rgba(0,0,0,0.04)" }}
                      onClick={() => setSelected(ed.id)}
                      style={{
                        padding: "12px 16px",
                        borderBottom: i < education.length - 1 ? "0.5px solid rgba(60,60,67,0.1)" : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#1c1c1e",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              flex: 1,
                              fontFamily: "-apple-system, sans-serif",
                            }}
                          >
                            {ed.school}
                          </span>
                          <span style={{ fontSize: 12, color: "#aeaeb2", flexShrink: 0 }}>{noteDate(ed.period)}</span>
                        </div>
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
                      <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M1 1L7 6.5L1 12" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* DETAIL VIEW */
          <motion.div
            key={`detail-${selected}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ display: "flex", flexDirection: "column", height: "100%", background: "white" }}
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
                  <path d="M7 1L1 6.5L7 12" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </button>
            </div>

            {selectedEd && (
              <div className="ios-scroll" style={{ flex: 1, overflowY: "auto", padding: "8px 20px 32px" }}>
                {/* Title */}
                <h1
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: selectedEd.color,
                    letterSpacing: -0.6,
                    lineHeight: 1.2,
                    marginBottom: 8,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  }}
                >
                  {selectedEd.school}
                </h1>

                {/* Subtitle + date */}
                <p style={{ fontSize: 13, color: "#aeaeb2", marginBottom: 4 }}>
                  {noteDate(selectedEd.period)}
                </p>
                {selectedEd.subtitle && (
                  <p style={{ fontSize: 13, color: "#636366", marginBottom: 20, fontStyle: "italic" }}>
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
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                  }}
                >
                  {noteContent[selectedEd.id]?.body.split("\n\n").map((para, i) => (
                    <p key={i} style={{ marginBottom: 18 }}>{para}</p>
                  ))}
                </div>

                {/* Highlights as inline bullets */}
                {selectedEd.highlights.length > 0 && (
                  <div
                    style={{
                      background: `${selectedEd.color}0d`,
                      borderLeft: `3px solid ${selectedEd.color}`,
                      borderRadius: 4,
                      padding: "12px 16px",
                      marginTop: 8,
                    }}
                  >
                    <p style={{ fontSize: 12, fontWeight: 700, color: selectedEd.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      Highlights
                    </p>
                    {selectedEd.highlights.map((h, i) => (
                      <p key={i} style={{ fontSize: 14, color: "#3a3a3c", lineHeight: 1.55, marginBottom: 6 }}>
                        &middot; {h}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
