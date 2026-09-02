"use client";

import { useSyncExternalStore } from "react";

/**
 * Ticking clock that is safe to render during SSR.
 *
 * Seeding state with `new Date()` renders one time on the server and another on
 * the client, which throws a hydration mismatch (React #418). useSyncExternalStore
 * uses the server snapshot for the hydration pass and swaps to the live value
 * immediately after, so the two renders always agree.
 *
 * Returns null on the server and during hydration; a Date once mounted.
 */

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

// Cached so getSnapshot is referentially stable between ticks.
let cachedSecond = 0;

function getSnapshot(): number {
  const second = Math.floor(Date.now() / 1000);
  if (second !== cachedSecond) cachedSecond = second;
  return cachedSecond;
}

function getServerSnapshot(): number {
  return 0;
}

export function useClock(): Date | null {
  const second = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return second === 0 ? null : new Date(second * 1000);
}
