"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DynamicIsland() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        cursor: "pointer",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      <motion.div
        animate={{
          width: expanded ? 260 : 126,
          height: expanded ? 70 : 37,
          borderRadius: expanded ? 30 : 20,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        style={{
          background: "#1c1c1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 16px",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #34c759, #30d158)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                👋
              </div>
              <div>
                <div
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0.2,
                  }}
                >
                  Caleb Newton
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 11,
                    letterSpacing: 0.1,
                  }}
                >
                  Innovation · ML · Math · Cyber · Entrepreneurship
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
