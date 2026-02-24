"use client";

import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
  orientation: string;
}

const VERSES = [
  { num: 1,  text: "Now concerning the times and the seasons, brothers, you have no need to have anything written to you." },
  { num: 2,  text: "For you yourselves are fully aware that the day of the Lord will come like a thief in the night." },
  { num: 3,  text: "While people are saying, \"There is peace and security,\" then sudden destruction will come upon them as labor pains come upon a pregnant woman, and they will not escape." },
  { num: 4,  text: "But you are not in darkness, brothers, for that day to surprise you like a thief." },
  { num: 5,  text: "For you are all children of light, children of the day. We are not of the night or of the darkness." },
  { num: 6,  text: "So then let us not sleep, as others do, but let us keep awake and be sober." },
  { num: 7,  text: "For those who sleep, sleep at night, and those who get drunk, are drunk at night." },
  { num: 8,  text: "But since we belong to the day, let us be sober, having put on the breastplate of faith and love, and for a helmet the hope of salvation." },
  { num: 9,  text: "For God has not destined us for wrath, but to obtain salvation through our Lord Jesus Christ," },
  { num: 10, text: "who died for us so that whether we are awake or asleep we might live with him." },
  { num: 11, text: "Therefore encourage one another and build one another up, just as you are doing." },
  { num: 12, text: "We ask you, brothers, to respect those who labor among you and are over you in the Lord and admonish you," },
  { num: 13, text: "and to esteem them very highly in love because of their work. Be at peace among yourselves." },
  { num: 14, text: "And we urge you, brothers, admonish the idle, encourage the fainthearted, help the weak, be patient with them all." },
  { num: 15, text: "See that no one repays anyone evil for evil, but always seek to do good to one another and to everyone." },
  { num: 16, text: "Rejoice always," },
  { num: 17, text: "pray without ceasing," },
  { num: 18, text: "give thanks in all circumstances; for this is the will of God in Christ Jesus for you." },
  { num: 19, text: "Do not quench the Spirit." },
  { num: 20, text: "Do not despise prophecies," },
  { num: 21, text: "but test everything; hold fast what is good." },
  { num: 22, text: "Abstain from every form of evil." },
  { num: 23, text: "Now may the God of peace himself sanctify you completely, and may your whole spirit and soul and body be kept blameless at the coming of our Lord Jesus Christ." },
  { num: 24, text: "He who calls you is faithful; he will surely do it." },
  { num: 25, text: "Brothers, pray for us." },
  { num: 26, text: "Greet all the brothers with a holy kiss." },
  { num: 27, text: "I charge you by the Lord to have this letter read to all the brothers." },
  { num: 28, text: "The grace of our Lord Jesus Christ be with you." },
];

const HIGHLIGHT = 17;

export default function BibleApp({ onClose: _onClose }: Props) {
  return (
    <div
      className="app-window"
      style={{ background: "#faf8f4", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <div
        style={{
          background: "#faf8f4",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
          padding: "14px 20px 10px",
          flexShrink: 0,
        }}
      >
        {/* Translation badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#8B6914",
              letterSpacing: 1.2,
              textTransform: "uppercase",
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            ESV
          </span>
          <a
            href="https://www.bible.com/bible/59/1TH.5.ESV"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              color: "#8B6914",
              fontFamily: "-apple-system, sans-serif",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Open in App ↗
          </a>
        </div>

        {/* Book + Chapter */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#1c1c1e",
            fontFamily: "Georgia, 'Times New Roman', serif",
            letterSpacing: -0.3,
            lineHeight: 1.1,
          }}
        >
          1 Thessalonians
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "#636366",
            fontFamily: "Georgia, 'Times New Roman', serif",
            marginTop: 2,
          }}
        >
          Chapter 5
        </p>
      </div>

      {/* Scripture body */}
      <div
        className="ios-scroll"
        style={{ flex: 1, overflowY: "auto", padding: "20px 22px 48px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {VERSES.map((v, i) => {
            const isHighlighted = v.num === HIGHLIGHT;
            return (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.012, duration: 0.25 }}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: v.num === 11 || v.num === 22 ? 18 : 10,
                  padding: isHighlighted ? "8px 10px" : "0",
                  borderRadius: isHighlighted ? 8 : 0,
                  background: isHighlighted ? "rgba(212,160,23,0.15)" : "transparent",
                  borderLeft: isHighlighted ? "3px solid #D4A017" : "none",
                  marginLeft: isHighlighted ? -10 : 0,
                }}
              >
                {/* Verse number */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isHighlighted ? "#8B6914" : "#b0a090",
                    fontFamily: "-apple-system, sans-serif",
                    lineHeight: 1.8,
                    minWidth: 18,
                    flexShrink: 0,
                  }}
                >
                  {v.num}
                </span>

                {/* Verse text */}
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.75,
                    color: isHighlighted ? "#1c1c1e" : "#2c2c2e",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontWeight: isHighlighted ? 500 : 400,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {v.text}
                </p>
              </motion.div>
            );
          })}

          {/* Footer note */}
          <div
            style={{
              marginTop: 28,
              paddingTop: 16,
              borderTop: "0.5px solid rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: "#8e8e93",
                fontFamily: "-apple-system, sans-serif",
                letterSpacing: 0.3,
              }}
            >
              English Standard Version (ESV)
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#aeaeb2",
                fontFamily: "-apple-system, sans-serif",
                marginTop: 3,
              }}
            >
              © 2001 Crossway Bibles
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
