"use client";

import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

const STORAGE_KEY = "theme";
const MQ = "(prefers-color-scheme: dark)";

/* The theme lives on <html data-theme>, which is external state that
   React does not own - the pre-paint script in layout.js sets it
   before hydration. useSyncExternalStore is the right primitive here:
   it renders the server snapshot during hydration and swaps to the
   client snapshot immediately after, so there is no markup mismatch
   and no setState inside an effect. */

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

function subscribe(cb) {
  listeners.add(cb);
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
}

function getSnapshot() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return window.matchMedia(MQ).matches ? "dark" : "light";
}

const getServerSnapshot = () => "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);

    // Private mode and blocked site data both throw on write.
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* the preference just will not persist; the toggle still works */
    }

    emit();
  };

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-pressed={isDark}
      title={label}
    >
      <span aria-hidden="true" className={styles.icon}>
        {isDark ? (
          <svg viewBox="0 0 24 24" width="17" height="17">
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2.2v2.1M12 19.7v2.1M2.2 12h2.1M19.7 12h2.1M5.1 5.1l1.5 1.5M17.4 17.4l1.5 1.5M18.9 5.1l-1.5 1.5M6.6 17.4l-1.5 1.5" />
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="17" height="17">
            <path
              d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
      <span className="visually-hidden">{label}</span>
    </button>
  );
}
