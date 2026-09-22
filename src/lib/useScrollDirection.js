"use client";

import { useSyncExternalStore } from "react";

/* Scroll position is external state. Reading it through
   useSyncExternalStore keeps the no-setState-in-effect rule satisfied
   and gives a correct server snapshot, same as useMediaQuery. */

const TOP_ZONE = 80; // always show the bar near the top of the page
const THRESHOLD = 6; // ignore sub-pixel jitter and rubber-banding

let direction = "up";
let lastY = 0;

function subscribe(cb) {
  lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    const delta = y - lastY;

    if (Math.abs(delta) < THRESHOLD) return;

    const next = y <= TOP_ZONE ? "up" : delta > 0 ? "down" : "up";
    lastY = y;

    if (next !== direction) {
      direction = next;
      cb();
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export function useScrollDirection() {
  return useSyncExternalStore(
    subscribe,
    () => direction,
    () => "up"
  );
}
