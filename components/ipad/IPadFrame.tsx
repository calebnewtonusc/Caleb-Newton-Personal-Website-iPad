"use client";

import { ReactNode } from "react";
import StatusBar from "./StatusBar";
import DynamicIsland from "./DynamicIsland";

interface Props {
  orientation: "landscape" | "portrait";
  children: ReactNode;
}

// iPad Pro 11" (2024) proportions
// Portrait: ~630 × 900 outer frame
// Landscape: ~900 × 630 outer frame

export default function IPadFrame({ orientation, children }: Props) {
  const isLandscape = orientation === "landscape";

  const outerW = isLandscape ? 900 : 630;
  const outerH = isLandscape ? 630 : 900;
  const screenW = isLandscape ? 860 : 590;
  const screenH = isLandscape ? 590 : 860;

  return (
    <div
      style={{
        width: outerW,
        height: outerH,
        // Green aluminum frame using gradients
        background: `
          radial-gradient(ellipse at 30% 20%, #4a9b52 0%, transparent 60%),
          radial-gradient(ellipse at 70% 80%, #1e5a28 0%, transparent 60%),
          linear-gradient(135deg, #3a8a42 0%, #2d6e35 40%, #1e5228 70%, #2a7033 100%)
        `,
        borderRadius: isLandscape ? 28 : 36,
        padding: "0",
        position: "relative",
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.12) inset,
          0 0 0 1px rgba(0,0,0,0.5),
          0 30px 80px rgba(0,0,0,0.45),
          0 10px 30px rgba(0,0,0,0.3),
          4px 4px 0 rgba(255,255,255,0.06) inset
        `,
        flexShrink: 0,
      }}
    >
      {/* ─── Side buttons ─── */}
      {/* Power button */}
      <div
        style={{
          position: "absolute",
          right: -3,
          top: isLandscape ? 60 : 180,
          width: 3,
          height: 55,
          background:
            "linear-gradient(90deg, #1e5228 0%, #3a8a42 30%, #2d7035 100%)",
          borderRadius: "0 3px 3px 0",
          boxShadow: "2px 0 4px rgba(0,0,0,0.3)",
        }}
      />
      {/* Volume up */}
      <div
        style={{
          position: "absolute",
          left: -3,
          top: isLandscape ? 50 : 160,
          width: 3,
          height: 38,
          background:
            "linear-gradient(-90deg, #1e5228 0%, #3a8a42 30%, #2d7035 100%)",
          borderRadius: "3px 0 0 3px",
          boxShadow: "-2px 0 4px rgba(0,0,0,0.3)",
        }}
      />
      {/* Volume down */}
      <div
        style={{
          position: "absolute",
          left: -3,
          top: isLandscape ? 100 : 215,
          width: 3,
          height: 38,
          background:
            "linear-gradient(-90deg, #1e5228 0%, #3a8a42 30%, #2d7035 100%)",
          borderRadius: "3px 0 0 3px",
          boxShadow: "-2px 0 4px rgba(0,0,0,0.3)",
        }}
      />

      {/* ─── Screen container ─── */}
      <div
        style={{
          position: "absolute",
          top: (outerH - screenH) / 2,
          left: (outerW - screenW) / 2,
          width: screenW,
          height: screenH,
          borderRadius: isLandscape ? 16 : 22,
          overflow: "hidden",
          background: "#f2f2f7",
          boxShadow: "0 0 0 1.5px rgba(0,0,0,0.6) inset",
        }}
      >
        {/* Status bar */}
        <StatusBar orientation={orientation} />

        {/* Dynamic Island */}
        <DynamicIsland />

        {/* App content area */}
        <div
          style={{
            position: "absolute",
            top: 50, // below status bar
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            background: "#f2f2f7",
          }}
        >
          {children}
        </div>
      </div>

      {/* ─── Frame shine overlay ─── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
