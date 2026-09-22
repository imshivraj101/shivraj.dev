import Image from "next/image";
import Link from "next/link";
import { entryNoOf } from "../data/projects";
import styles from "./Projects.module.css";

/* Type chips are separated by fill weight rather than three new
   hues - the palette has one job per colour and no spare one. */
export const TYPE_CLASS = {
  "AI/ML": "type-ai",
  Design: "type-design",
  Development: "type-dev",
};

export default function ProjectCard({ project, priority = false }) {
  const {
    slug,
    title,
    role,
    year,
    discipline,
    summary,
    tags,
    image,
    live,
    github,
  } = project;

  return (
    <article className={`card ${styles.card}`}>
      {/* Dex entry header */}
      <div className={styles.entryBar}>
        <span className="entry-no">
          No.<b>{entryNoOf(slug)}</b>
        </span>

        <span className={styles.status}>
          <span className={`led ${live ? "led-on" : ""}`} aria-hidden="true" />
          <span className={styles.statusText}>{live ? "Live" : "Source"}</span>
        </span>

        <span className={`type-chip ${TYPE_CLASS[discipline] ?? ""}`}>
          {discipline}
        </span>
      </div>

      <Link href={`/projects/${slug}`} className={styles.media}>
        <Image
          src={image}
          alt={`${title} - ${role}`}
          className={styles.image}
          sizes="(max-width: 767px) 92vw, (max-width: 1139px) 46vw, 520px"
          placeholder="blur"
          priority={priority}
        />
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          {/* Whole-card affordance without nesting interactive elements */}
          <Link href={`/projects/${slug}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>

        <p className={styles.summary}>{summary}</p>

        {/* Spec strip */}
        <dl className={styles.spec}>
          <div>
            <dt className="readout-label">Year</dt>
            <dd className="readout-value">{year}</dd>
          </div>
          <div>
            <dt className="readout-label">Stack</dt>
            <dd className="readout-value">{tags.length}</dd>
          </div>
          <div>
            <dt className="readout-label">Role</dt>
            <dd className={styles.specRole}>{role}</dd>
          </div>
        </dl>

        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className={styles.links}>
          <Link href={`/projects/${slug}`} className={`btn ${styles.cta}`}>
            Case study
          </Link>

          {live && (
            <a
              className={styles.quiet}
              href={live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
              <span aria-hidden="true"> &#8599;</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}

          {github && (
            <a
              className={styles.quiet}
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
              <span aria-hidden="true"> &#8599;</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
