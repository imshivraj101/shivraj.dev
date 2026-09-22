import Image from "next/image";
import Link from "next/link";
import profile from "../assets/profile.jpeg";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { blogs } from "../data/blogs";
import styles from "./Hero.module.css";

// Counts come from the data so they cannot drift out of date.
const proof = [
  { value: site.employer.name, label: "AI Product Engineer" },
  { value: "Agentic RAG", label: "Knowledge-graph systems" },
  { value: String(projects.length), label: "Shipped projects" },
  { value: String(blogs.length), label: "Published articles" },
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`decor-star star-cool ${styles.starOne}`} />
      <div className={`decor-star star-accent ${styles.starTwo}`} />
      <div className={`decor-star star-highlight ${styles.starThree}`} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className="eyebrow">Nashik, India &middot; Available for work</p>

          <h1 id="hero-title" className={`${styles.name} outline`}>
            Shivraj
            <br />
            Talekar
          </h1>

          <p className={styles.role}>{site.role}</p>

          <p className={styles.lede}>
            Agentic RAG, knowledge graphs, and the systems to serve them in
            production. Currently building AI products and platforms as an{" "}
            {site.employer.role} at {site.employer.name}.
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

        <div className={styles.portraitCol}>
          <figure className={styles.polaroid}>
            <Image
              src={profile}
              alt="Shivraj Talekar"
              className={styles.portrait}
              sizes="(max-width: 1023px) 60vw, 320px"
              placeholder="blur"
              priority
            />
            <figcaption className={styles.caption}>{site.handle}</figcaption>
          </figure>
        </div>
      </div>

      {/* Proof bar - concrete claims instead of adjectives */}
      <dl className={styles.proof}>
        {proof.map((item) => (
          <div key={item.label} className={styles.proofItem}>
            <dt className={styles.proofValue}>{item.value}</dt>
            <dd className={styles.proofLabel}>{item.label}</dd>
          </div>
        ))}
      </dl>

      <a href="#projects" className={styles.scrollCue} aria-label="Scroll to projects">
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
