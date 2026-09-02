"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mentors } from "@/data/content";

interface Props {
  onClose: () => void;
  orientation: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Avatar({
  name,
  color,
  size = 44,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
      }}
    >
      <span
        style={{
          fontSize: size * 0.36,
          fontWeight: 700,
          color: "white",
          fontFamily: "-apple-system, sans-serif",
          letterSpacing: 0.3,
        }}
      >
        {initials(name)}
      </span>
    </div>
  );
}

function MentorDetail({
  mentor,
  onBack,
  showBack,
}: {
  mentor: (typeof mentors)[0];
  onBack: () => void;
  showBack: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {showBack && (
        <div style={{ padding: "14px 16px 8px", flexShrink: 0 }}>
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "#007aff",
              fontSize: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            <svg aria-hidden="true" width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path
                d="M7 1L1 6.5L7 12"
                stroke="#007aff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Mentors
          </button>
        </div>
      )}
      <div
        className="ios-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: showBack ? "8px 20px 32px" : "24px 20px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Avatar name={mentor.name} color={mentor.color} size={86} />
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1c1c1e",
              marginTop: 12,
              fontFamily: "-apple-system, sans-serif",
              letterSpacing: -0.4,
              textAlign: "center",
            }}
          >
            {mentor.name}
          </h2>
          <p style={{ fontSize: 14, color: "#8e8e93", marginTop: 3 }}>
            {mentor.role}
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#8e8e93",
              fontWeight: 600,
              letterSpacing: 0.5,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            Grateful for
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#3a3a3c",
              lineHeight: 1.6,
              fontFamily: "-apple-system, sans-serif",
            }}
          >
            {mentor.gratitude}
          </p>
        </div>

        {mentor.link && (
          <a
            href={mentor.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#1c1c1e",
              color: "white",
              borderRadius: 14,
              padding: "13px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {mentor.linkLabel} {"↗"}
          </a>
        )}
      </div>
    </div>
  );
}

function MentorList({
  compact,
  selectedId,
  onSelect,
}: {
  compact?: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {mentors.map((m, i) => (
        <motion.button
          key={m.id}
          type="button"
          whileTap={{ backgroundColor: "#f2f2f7" }}
          onClick={() => onSelect(m.id)}
          aria-label={`${m.name}, ${m.role}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: compact ? 10 : 13,
            padding: compact ? "10px 12px" : "12px 16px",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            border: "none",
            font: "inherit",
            borderTop: i > 0 ? "0.5px solid rgba(60,60,67,0.08)" : "none",
            background:
              selectedId === m.id ? "rgba(0,122,255,0.07)" : "transparent",
          }}
        >
          <Avatar name={m.name} color={m.color} size={compact ? 34 : 44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: compact ? 13 : 16,
                fontWeight: selectedId === m.id ? 600 : 400,
                color: "#1c1c1e",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: "-apple-system, sans-serif",
              }}
            >
              {m.name}
            </p>
            <p style={{ fontSize: compact ? 11 : 13, color: "#8e8e93" }}>
              {m.role}
            </p>
          </div>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true">
            <path d="M1 1l5 5L1 10" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      ))}
    </>
  );
}

export default function MentorsApp({ orientation }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isLandscape = orientation === "landscape";
  const selected = selectedId
    ? (mentors.find((m) => m.id === selectedId) ?? null)
    : null;

  if (isLandscape) {
    return (
      <div
        className="app-window"
        style={{ background: "#f2f2f7", display: "flex", flexDirection: "row" }}
      >
        <div
          style={{
            width: 230,
            borderRight: "0.5px solid rgba(60,60,67,0.18)",
            background: "white",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "14px 14px 8px" }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1c1c1e",
                fontFamily: "-apple-system, sans-serif",
                letterSpacing: -0.3,
              }}
            >
              Mentors
            </h2>
            <p style={{ fontSize: 12, color: "#8e8e93", marginTop: 2 }}>
              People I owe a lot to
            </p>
          </div>
          <div className="ios-scroll" style={{ flex: 1, overflowY: "auto" }}>
            <MentorList compact selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#f7f7f7",
            minWidth: 0,
          }}
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: "100%" }}
              >
                <MentorDetail
                  mentor={selected}
                  onBack={() => setSelectedId(null)}
                  showBack={false}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  height: "100%",
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "#8e8e93",
                    fontFamily: "-apple-system, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  None of this happened alone.
                  <br />
                  Pick a name.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="app-window" style={{ background: "#f2f2f7" }}>
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div
              className="ios-scroll"
              style={{ flex: 1, overflowY: "auto", padding: "16px 16px 32px" }}
            >
              <h1
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#1c1c1e",
                  fontFamily: "-apple-system, sans-serif",
                  letterSpacing: -0.5,
                }}
              >
                Mentors
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "#8e8e93",
                  marginBottom: 18,
                  marginTop: 4,
                }}
              >
                People I owe a lot to
              </p>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <MentorList selectedId={selectedId} onSelect={setSelectedId} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ height: "100%" }}
          >
            <MentorDetail
              mentor={selected}
              onBack={() => setSelectedId(null)}
              showBack
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
