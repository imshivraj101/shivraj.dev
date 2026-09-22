"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { projects, entryNoOf } from "../data/projects";
import { TYPE_CLASS } from "./ProjectCard";

/* Type pills mirror TYPE_CLASS but in the dex pill shape. */
const PILL_CLASS = {
  "AI/ML": "dex-pill-ai",
  Design: "dex-pill-design",
  Development: "dex-pill-dev",
};
import styles from "./ProjectDex.module.css";

const MAX_TAGS = Math.max(...projects.map((p) => p.tags.length));

export default function ProjectDex({ selected, onSelect, openRef, compact }) {
  const router = useRouter();
  const project = projects[selected];
  const href = `/projects/${project.slug}`;

  // Let the shell's A button open whatever is selected.
  useEffect(() => {
    if (!openRef) return;
    openRef.current = () => router.push(href);
    return () => {
      openRef.current = null;
    };
  }, [openRef, router, href]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      onSelect((selected + 1) % projects.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      onSelect((selected - 1 + projects.length) % projects.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      onSelect(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onSelect(projects.length - 1);
    }
  };

  return (
    <div className={styles.dex} data-compact={compact || undefined}>
      {/* ---- Index: a single tab stop with roving selection ---- */}
      <ul
        className={styles.index}
        role="listbox"
        aria-label="Projects"
        aria-activedescendant={`entry-${project.slug}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {projects.map((p, i) => (
          <li
            key={p.slug}
            id={`entry-${p.slug}`}
            role="option"
            aria-selected={i === selected}
            className={styles.row}
            data-active={i === selected || undefined}
            onClick={() => onSelect(i)}
          >
            <span
              className={`pokeball ${p.live ? "pokeball-on" : ""}`}
              aria-hidden="true"
            />
            <span className={styles.rowNo}>{entryNoOf(p.slug)}</span>
            <span className={styles.rowName}>{p.title}</span>
          </li>
        ))}
      </ul>

      {/* ---- Detail ---- */}
      <div className={styles.detail}>
        <div className={styles.shot}>
          <Image
            src={project.image}
            alt={`${project.title} - ${project.role}`}
            className={styles.shotImg}
            sizes="(max-width: 1023px) 92vw, 460px"
            placeholder="blur"
            priority={selected === 0}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.infoTop}>
            <span className={styles.plate}>
              <span className="pokeball" aria-hidden="true" />
              <span className={styles.plateNo}>{entryNoOf(project.slug)}</span>
              <h3 className={styles.name}>{project.title}</h3>
            </span>
            <span className={`dex-pill ${PILL_CLASS[project.discipline] ?? ""}`}>
              {project.discipline}
            </span>
          </div>

          {/* The "Seed Pokemon" genus strip - here, the actual role */}
          <span className="dex-genus">{project.role}</span>

          <p className={`dex-desc ${styles.summary}`}>{project.summary}</p>

          {/* Laid out like the Height / Weight block. Values are real:
              the bar is styling, the number is the actual tag count. */}
          <dl className={`dex-stats ${styles.stats}`}>
            <div className="dex-stat-row">
              <dt>Stack</dt>
              <dd className={styles.barWrap}>
                <span className={styles.bar}>
                  <span
                    className={styles.barFill}
                    style={{
                      width: `${(project.tags.length / MAX_TAGS) * 100}%`,
                    }}
                  />
                </span>
                <b className={styles.barNum}>{project.tags.length}</b>
              </dd>
            </div>
            <div className="dex-stat-row">
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div className="dex-stat-row">
              <dt>Status</dt>
              <dd>{project.live ? "Live" : "Source"}</dd>
            </div>
          </dl>

          <ul className={styles.tags}>
            {project.tags.map((t) => (
              <li key={t} className="dex-pill">
                {t}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Link href={href} className={`btn ${styles.cta}`}>
              Case study
            </Link>
            {project.live && (
              <a
                className={styles.quiet}
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live <span aria-hidden="true">&#8599;</span>
              </a>
            )}
            {project.github && (
              <a
                className={styles.quiet}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code <span aria-hidden="true">&#8599;</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
