"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "../data/site";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);

  // Close the menu whenever the route changes. Adjusting state during
  // render is the pattern React recommends here: an effect would cost
  // an extra commit and trip react-hooks/set-state-in-effect.
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  // Escape closes; body scroll locks while the sheet is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" className={styles.logo}>
          {site.name.split(" ")[0]}
          <span className={styles.logoDot}>.dev</span>
        </Link>

        <ul className={styles.links}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.link}
                data-active={isActive(item.href) || undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.controls}>
          <ThemeToggle />

          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open || undefined} />
            <span data-open={open || undefined} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={styles.sheet}
        data-open={open || undefined}
        hidden={!open}
      >
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.sheetLink}
                data-active={isActive(item.href) || undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          className={`btn ${styles.sheetCta}`}
          href={site.mailto}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
