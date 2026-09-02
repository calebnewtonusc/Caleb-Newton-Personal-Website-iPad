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
    body: `I did not open this door myself. The Iovine and Young Academy takes roughly thirty students a year, and I got one of the spots. I believe God opened that door, and I have not stopped being grateful for it.

The most important lesson in my education so far has been the terrifying, awesome reality of infinite paths in college.

At my academically intense high school, the path to success seemed direct, because variability was not an option. All the nerds took the same AP classes, and there was no need to discern what I was actually interested in. My time was defined by factors the culture around me had already decided, so I never developed a sense of agency from my education. I led my baseball team and reached out to schools to form a 20 school Christian club coalition, but that was ambition pointed down siloed paths. It did not take creativity or agency to succeed in those avenues. It only took discipline.

When I got into the Iovine and Young Academy it was a no brainer. I knew I wanted to use redemptive faith-based entrepreneurship to fight the attention economy and help people, and I was a naturally ambitious leader, so it seemed like the best fit. What I did not realize was that being a naturally ambitious leader was not enough. For the first time I had to decide the direction myself. The ball was in my court on how to define my own reality. I remember looking forward to the freedom. I did not yet know the weight of it.

College has no defined rules and no correct way to channel ambition. Yes, there are pre-defined paths: doctor, lawyer, engineer. But even those require you to choose them for yourself. Being in IYA, I knew I was choosing not to have a traditional job. I did not realize it would take building my security and identity to the point where I could actually immerse myself in the world around me. Being a leader is only the starting point. What am I to lead? How? What skills should I learn? What opportunities should I explore? Where should I even start? What, what, what.

My brain, facing all these new questions, reached for the old pattern and decided that getting into an entrepreneurial club was the right next step. Instead of using the new freedom to define my own guidelines for the first time, I did not learn the lesson. I could not accept that the world was not binary. So when I got rejected from every club, I thought it was the end of the world. What was I supposed to do when the only door I believed in was closed?

I started losing track of my identity, because I had put so much of it into applying ambition to a track. With no track in front of me for the first time, I was so used to being low agency that I could not even fathom how blessed I was to have no pre-determined one. That was the beginning of a spiral into depression, which ended in hospitalization.

Even then I did not learn. When I came back in the spring my medication dosage was too high and it sent me into mania. In mania, everything feels right. I claimed insane things with confidence and did insane things with confidence, and once again I did not have to discern my own path. The chemicals did it for me. Medication brought me down from the mania, back into depression, and finally back to a normal state going into sophomore year.

Praise the Lord. For the first time, I have finally learned the lesson. A year ago people told me you do not need to do X, and you have plenty of time to do Y, and spend this time figuring out who you are. It went in one ear and out the other. I could not let go of my rigidity. Now, after everything, I know there is no other option. Life is not what it seemed to be in high school, and it never will be.

This lesson is reshaping my entire outlook. For once I can give my brain the freedom to think for itself. I am not comparing myself to other people to figure out my path. And most of all, I am loving the process of defining myself instead of missing the time when my environment defined me.

It took a hospitalization and a manic episode to learn it, and I would not have it any other way. I am forever grateful for the outlook God gave me through it, and I am still terrified of what is coming. Life is awesome.`,
  },
  smhs: {
    body: `Christian Club President, 90+ members. 1570 SAT. Baseball Team Captain. Founded the Screen Time League.

The academics gave me the foundation; everything else gave me the character.`,
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

The curiosity has not changed. Only the tools.`,
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
                      background: "white",
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

                {/* Entries */}
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
