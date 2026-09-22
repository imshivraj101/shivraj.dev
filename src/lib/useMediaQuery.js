"use client";

import { useSyncExternalStore } from "react";

/* A media query is external state React does not own. useSyncExternalStore
   renders the server snapshot during hydration and swaps to the client
   snapshot straight after, so there is no markup mismatch and no setState
   inside an effect - the rule that has failed this build before.
   Same pattern as src/components/ThemeToggle.jsx. */

export function useMediaQuery(query, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

/* Server snapshot is false, i.e. mobile-first. That is also what
   Googlebot indexes, so the crawlable render is the stacked one with
   every section visible rather than a tabbed device with hidden panels. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)", false);
