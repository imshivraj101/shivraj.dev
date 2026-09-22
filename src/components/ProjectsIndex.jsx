"use client";

import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

const disciplines = ["All", "AI/ML", "Design", "Development"];

export default function ProjectsIndex() {
  const [active, setActive] = useState("All");

  const shown = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.discipline === active),
    [active]
  );

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter projects">
        {disciplines.map((d) => {
          const count =
            d === "All"
              ? projects.length
              : projects.filter((p) => p.discipline === d).length;

          return (
            <button
              key={d}
              type="button"
              className={styles.filter}
              aria-pressed={active === d}
              onClick={() => setActive(d)}
            >
              {d} ({count})
            </button>
          );
        })}
      </div>

      <p className={styles.count} aria-live="polite">
        Showing {shown.length} of {projects.length} projects
      </p>

      <div className={styles.grid}>
        {shown.map((project, i) => (
          <ProjectCard key={project.slug} project={project} priority={i < 2} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className={styles.empty}>Nothing here yet under {active}.</p>
      )}
    </>
  );
}
