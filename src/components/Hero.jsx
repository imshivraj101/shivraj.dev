import Image from "next/image";
import Link from "next/link";
import profile from "../assets/profile.jpeg";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { blogs } from "../data/blogs";
import styles from "./Hero.module.css";

/* Spec readout. Counts derive from the data so they cannot drift.
   This replaces the old proof bar, which led on "Agentic RAG" - one
   technique, and silent on the full-stack half of the work. */
const spec = [
  { label: "Type", value: site.discipline },
  {
    label: "Role",
    value: `${site.employer.role} @ ${site.employer.name}`,
  },
  { label: "Stack", value: site.stack.join(" · ") },
  {
    label: "Shipped",
    value: `${projects.length} projects · ${blogs.length} articles`,
  },
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`decor-star star-accent ${styles.starOne}`} />
      <div className={`decor-star star-highlight ${styles.starTwo}`} />

      <div className={styles.inner}>
        {/* Zone 1: portrait beside the name, at every width. */}
        <div className={styles.identity}>
          <figure className={styles.polaroid}>
            <Image
              src={profile}
              alt="Shivraj Talekar"
              className={styles.portrait}
              sizes="(max-width: 600px) 34vw, (max-width: 1023px) 30vw, 300px"
              placeholder="blur"
              priority
            />
            <figcaption className={styles.caption}>{site.handle}</figcaption>
          </figure>

          <div className={styles.nameBlock}>
            <p className="eyebrow">Nashik, India &middot; Available for work</p>

            <h1 id="hero-title" className={`${styles.name} outline`}>
              Shivraj
              <br />
              Talekar
            </h1>

            <p className={styles.role}>{site.role}</p>
          </div>
        </div>

        {/* Zone 2: copy and actions, full width underneath. */}
        <div className={styles.copy}>
          <p className={styles.lede}>
            I build AI systems end to end &mdash; retrieval, knowledge graphs
            and the product that ships them. Currently{" "}
            {site.employer.role} at {site.employer.name}, after starting there
            in cloud and DevOps.
          </p>

          <div className={styles.actions}>
            <Link href="/projects" className="btn btn-primary">
              See the work
            </Link>
            <a
              className="btn"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&rsquo;s connect
            </a>
          </div>
        </div>
      </div>

      {/* Spec readout - the device panel under the identity block. */}
      <div className={styles.specWrap}>
        <dl className={styles.spec}>
          {spec.map((row) => (
            <div key={row.label} className={styles.specRow}>
              <dt className="readout-label">{row.label}</dt>
              <dd className="readout-value">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#projects"
        className={styles.scrollCue}
        aria-label="Scroll to projects"
      >
        <span>Scroll</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M12 4v14m0 0l-6-6m6 6l6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
