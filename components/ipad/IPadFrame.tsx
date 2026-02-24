"use client";

import { ReactNode } from "react";

interface Props {
  orientation: "landscape" | "portrait";
  children: ReactNode;
}

// iPad Pro 11" (M4) Space Gray — realistic proportions
// Portrait:  630 × 900  outer frame
// Landscape: 900 × 630  outer frame

export default function IPadFrame({ orientation, children }: Props) {
  const isLandscape = orientation === "landscape";

  const outerW = isLandscape ? 900 : 630;
  const outerH = isLandscape ? 630 : 900;

  // Thin bezels matching real iPad Pro 11"
  const bezelH = isLandscape ? 19 : 22;
  const bezelV = isLandscape ? 22 : 19;
  const screenW = outerW - bezelV * 2;
  const screenH = outerH - bezelH * 2;

  // Titanium / Space Gray frame gradient
  const frameGrad = `
    radial-gradient(ellipse at 20% 10%, #4a4a4c 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, #111113 0%, transparent 55%),
    linear-gradient(155deg, #3a3a3c 0%, #2c2c2e 30%, #1c1c1e 60%, #131315 80%, #1e1e20 100%)
  `;

  const btnGrad = isLandscape
    ? "linear-gradient(90deg, #141416 0%, #3a3a3c 50%, #2c2c2e 100%)"
    : "linear-gradient(180deg, #141416 0%, #3a3a3c 50%, #2c2c2e 100%)";

  return (
    <div
      style={{
        width: outerW,
        height: outerH,
        background: frameGrad,
        borderRadius: isLandscape ? 30 : 40,
        position: "relative",
        flexShrink: 0,
        boxShadow: `
          0 0 0 0.5px rgba(255,255,255,0.1) inset,
          0 0 0 1px rgba(0,0,0,0.9),
          0 50px 120px rgba(0,0,0,0.7),
          0 20px 60px rgba(0,0,0,0.5),
          0 8px 24px rgba(0,0,0,0.4),
          inset 0 1px 0 rgba(255,255,255,0.12),
          inset 0 -1px 0 rgba(0,0,0,0.4)
        `,
      }}
    >
      {/* ── Side / Top Buttons ── */}
      {/* Power button (right side landscape / top-right portrait) */}
      <div
        style={{
          position: "absolute",
          ...(isLandscape
            ? { right: -3, top: 64, width: 3, height: 60 }
            : { right: -3, top: 160, width: 3, height: 66 }),
          background: btnGrad,
          borderRadius: isLandscape ? "0 3px 3px 0" : "0 3px 3px 0",
          boxShadow: "2px 0 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />
      {/* Volume Up */}
      <div
        style={{
          position: "absolute",
          ...(isLandscape
            ? { left: -3, top: 54, width: 3, height: 42 }
            : { left: -3, top: 148, width: 3, height: 44 }),
          background: btnGrad,
          borderRadius: isLandscape ? "3px 0 0 3px" : "3px 0 0 3px",
          boxShadow: "-2px 0 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />
      {/* Volume Down */}
      <div
        style={{
          position: "absolute",
          ...(isLandscape
            ? { left: -3, top: 108, width: 3, height: 42 }
            : { left: -3, top: 208, width: 3, height: 44 }),
          background: btnGrad,
          borderRadius: isLandscape ? "3px 0 0 3px" : "3px 0 0 3px",
          boxShadow: "-2px 0 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />

      {/* ── Screen Container ── */}
      <div
        style={{
          position: "absolute",
          top: bezelH,
          left: bezelV,
          width: screenW,
          height: screenH,
          borderRadius: isLandscape ? 18 : 26,
          overflow: "hidden",
          background: "#0a0a0c",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.9) inset",
        }}
      >
        {/* Full-screen content — edge to edge */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>

      {/* ── Frame specular / shine overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, transparent 35%, rgba(0,0,0,0.05) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Camera pill (top-center in portrait, left-center in landscape) ── */}
      <div
        style={{
          position: "absolute",
          ...(isLandscape
            ? {
                left: bezelV / 2 - 5,
                top: "50%",
                transform: "translateY(-50%)",
                width: 10,
                height: 10,
              }
            : {
                top: bezelH / 2 - 5,
                left: "50%",
                transform: "translateX(-50%)",
                width: 10,
                height: 10,
              }),
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #2a2a2c, #0a0a0c)",
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.06), inset 0 0 4px rgba(0,0,0,0.8)",
        }}
      />
    </div>
  );
}
