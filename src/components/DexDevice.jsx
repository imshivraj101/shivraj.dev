"use client";

import { useCallback, useRef, useState } from "react";
import { useIsDesktop } from "../lib/useMediaQuery";
import ProjectDex from "./ProjectDex";
import ExperiencePanel from "./ExperiencePanel";
import WritingPanel from "./WritingPanel";
import { projects } from "../data/projects";
import styles from "./DexDevice.module.css";

const MODES = [
  { id: "projects", label: "Project Index" },
  { id: "experience", label: "Trainer Card" },
  { id: "writing", label: "Writing Log" },
];

export default function DexDevice() {
  const isDesktop = useIsDesktop();
  const [mode, setMode] = useState("projects");

  // Selection lives here so the D-pad on the shell can drive the
  // list inside the screen.
  const [selected, setSelected] = useState(0);
  const openRef = useRef(null);

  const move = useCallback(
    (delta) =>
      setSelected((i) => (i + delta + projects.length) % projects.length),
    []
  );

  const panels = {
    projects: (
      <ProjectDex
        selected={selected}
        onSelect={setSelected}
        openRef={openRef}
        compact={isDesktop}
      />
    ),
    experience: <ExperiencePanel compact={isDesktop} />,
    writing: <WritingPanel compact={isDesktop} />,
  };

  /* Mobile keeps the plain stacked sections. No shell, no tabs, every
     panel visible - which is also the render Googlebot indexes. */
  if (!isDesktop) {
    return (
      <div className={styles.stack}>
        <section id="projects" className="section">
          <div className="wrap">{panels.projects}</div>
        </section>
        <section id="experience" className="section">
          <div className="wrap">{panels.experience}</div>
        </section>
        <section id="writing" className="section">
          <div className="wrap">{panels.writing}</div>
        </section>
      </div>
    );
  }

  const active = MODES.find((m) => m.id === mode);

  return (
    <section id="projects" className={styles.stage} aria-label="Portfolio index">
      <div className={styles.shell}>
        {/* ---- Top bezel ---- */}
        <div className={styles.bezel}>
          <span className={styles.lampMain} aria-hidden="true" />
          <span className={styles.lampRow} aria-hidden="true">
            <i className={styles.lampRed} />
            <i className={styles.lampAmber} />
            <i className={styles.lampGreen} />
          </span>

          <div className={styles.tabs} role="tablist" aria-label="Sections">
            {MODES.map((m) => (
              <button
                key={m.id}
                role="tab"
                type="button"
                id={`tab-${m.id}`}
                aria-selected={mode === m.id}
                aria-controls={`panel-${m.id}`}
                tabIndex={mode === m.id ? 0 : -1}
                className={styles.tab}
                onClick={() => setMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          <span className={styles.counter} aria-hidden="true">
            {mode === "projects"
              ? `No.${String(selected + 1).padStart(3, "0")} / ${String(projects.length).padStart(3, "0")}`
              : active.label}
          </span>
        </div>

        {/* ---- Screen: a fixed window, not a growing box ---- */}
        <div className={styles.screenWrap}>
          <div className={styles.screen}>
            {MODES.map((m) => (
              <div
                key={m.id}
                role="tabpanel"
                id={`panel-${m.id}`}
                aria-labelledby={`tab-${m.id}`}
                hidden={mode !== m.id}
                className={styles.panel}
              >
                {panels[m.id]}
              </div>
            ))}
          </div>
        </div>

        {/* ---- Control deck ---- */}
        <div className={styles.deck}>
          <div className={styles.dpad}>
            <button
              type="button"
              className={`${styles.dBtn} ${styles.dUp}`}
              onClick={() => move(-1)}
              disabled={mode !== "projects"}
              aria-label="Previous entry"
            >
              <span aria-hidden="true">&#9650;</span>
            </button>
            <button
              type="button"
              className={`${styles.dBtn} ${styles.dDown}`}
              onClick={() => move(1)}
              disabled={mode !== "projects"}
              aria-label="Next entry"
            >
              <span aria-hidden="true">&#9660;</span>
            </button>
            <button
              type="button"
              className={`${styles.dBtn} ${styles.dLeft}`}
              onClick={() => {
                const i = MODES.findIndex((m) => m.id === mode);
                setMode(MODES[(i - 1 + MODES.length) % MODES.length].id);
              }}
              aria-label="Previous section"
            >
              <span aria-hidden="true">&#9664;</span>
            </button>
            <button
              type="button"
              className={`${styles.dBtn} ${styles.dRight}`}
              onClick={() => {
                const i = MODES.findIndex((m) => m.id === mode);
                setMode(MODES[(i + 1) % MODES.length].id);
              }}
              aria-label="Next section"
            >
              <span aria-hidden="true">&#9654;</span>
            </button>
            <span className={styles.dHub} aria-hidden="true" />
          </div>

          <span className={styles.grill} aria-hidden="true">
            <i /><i /><i /><i /><i /><i />
          </span>

          <div className={styles.abRow}>
            <button
              type="button"
              className={styles.btnA}
              onClick={() => openRef.current?.()}
              disabled={mode !== "projects"}
            >
              A
              <span className="visually-hidden"> - open selected case study</span>
            </button>
            <span className={styles.btnB} aria-hidden="true">
              B
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
