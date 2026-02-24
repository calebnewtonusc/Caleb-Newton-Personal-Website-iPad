# 3D iPad Drag-to-Rotate

## Goal
When user grabs the iPad border/frame and drags, the whole iPad rotates in 3D. Release springs back to flat.

## Reference
Old site: `/Users/joelnewton/Desktop/2026-Code/projects/Personal-Website/src/pages/About.js`
- Uses `rotateX = ((y - centerY) / centerY) * -10` and `rotateY = ((x - centerX) / centerX) * 10`
- Mouse move on element → calculate rotation from cursor offset from center
- Mouse leave → reset to 0

## Implementation Plan

### 1. IPadPage.tsx — add 3D drag logic

```tsx
import { useRef, useState, useCallback, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

// Inside IPadPage():
const ipadRef = useRef<HTMLDivElement>(null);
const isDragging = useRef(false);
const dragStart = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

const rotX = useMotionValue(0);
const rotY = useMotionValue(0);
const springX = useSpring(rotX, { stiffness: 260, damping: 28 });
const springY = useSpring(rotY, { stiffness: 260, damping: 28 });

// Detect mousedown on the FRAME only (not inner screen content)
const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
  const target = e.target as HTMLElement;
  // Only drag if clicking on the frame, not an app window inside
  if (target.closest(".app-window")) return;
  isDragging.current = true;
  dragStart.current = { x: e.clientX, y: e.clientY, rx: rotX.get(), ry: rotY.get() };
  e.preventDefault();
}, [rotX, rotY]);

useEffect(() => {
  const onMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    rotY.set(dragStart.current.ry + dx * 0.25);   // horizontal drag → Y rotation
    rotX.set(dragStart.current.rx + dy * -0.25);  // vertical drag → X rotation
  };
  const onUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    rotX.set(0);  // spring back to flat
    rotY.set(0);
  };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
  return () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };
}, [rotX, rotY]);
```

### 2. Wrap the iPad motion.div with perspective + 3D style

```tsx
// Outer container needs perspective:
<div style={{ perspective: 1200, perspectiveOrigin: "center center" }}>
  <motion.div
    ref={ipadRef}
    onMouseDown={onMouseDown}
    style={{
      rotateX: springX,
      rotateY: springY,
      transformStyle: "preserve-3d",
      cursor: "grab",
      // existing scale/opacity animate stays
    }}
    animate={{ opacity: visible ? 1 : 0, scale: visible ? scale : scale * 0.97 }}
    ...
  >
    <IPadFrame ...>
      ...
    </IPadFrame>
  </motion.div>
</div>
```

### 3. Nice extras
- Add a subtle dynamic drop shadow that shifts with rotation angle (makes depth feel real)
- Cursor: `grab` on frame hover, `grabbing` while dragging
- Clamp max rotation to ±30 degrees so it doesn't flip
- Touch support: add `onTouchStart`/`onTouchMove`/`onTouchEnd` equivalents

### 4. Shadow that reacts to tilt
```tsx
const shadowX = useTransform(springY, [-30, 30], [-40, 40]);
const shadowY = useTransform(springX, [-30, 30], [40, -40]);
// Apply as filter on the iPad div:
// filter: `drop-shadow(${shadowX}px ${shadowY}px 60px rgba(0,0,0,0.6))`
```

## Notes
- Don't let 3D drag interfere with app interactions (`.app-window` guard)
- The `scale` state from orientation changes should still work — just multiply/compose with the 3D transform
- Framer Motion's `useSpring` handles the snap-back animation automatically
