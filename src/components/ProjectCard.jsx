import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.css";

export default function ProjectCard({ project, priority = false }) {
  const { slug, title, role, year, summary, tags, image, live, github } =
    project;

  return (
    <article className={`card ${styles.card}`}>
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
        <div className={styles.meta}>
          <span className={styles.role}>{role}</span>
          <span className={styles.year}>{year}</span>
        </div>

        <h3 className={styles.title}>
          {/* Whole-card affordance without nesting interactive elements */}
          <Link href={`/projects/${slug}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>

        <p className={styles.summary}>{summary}</p>

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
