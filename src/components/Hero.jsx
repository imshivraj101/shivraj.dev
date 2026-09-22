import Image from "next/image";
import Link from "next/link";
import profile from "../assets/profile.jpeg";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { blogs } from "../data/blogs";
import { college, spanOf, work } from "../data/experience";
import { stack } from "../data/stack";
import styles from "./Hero.module.css";

/* Three of the four things a hiring manager checks in the first ten
   seconds. The fourth - what he builds with - is the rail underneath,
   because eleven tool names set as running text was the row that made
   the old panel look like a spreadsheet. */
const facts = [
  { label: "Now", value: `${site.employer.role} @ ${site.employer.name}` },
  { label: "Focus", value: site.focus.join(" · ") },
  { label: "Study", value: site.education },
];

/* Countable proof, every figure derived at build time from the data
   that renders further down the page. Nothing here is a claim I made
   up: if a project is removed the number moves with it. */
const proof = [
  { n: projects.length, label: "Projects shipped" },
  { n: blogs.length, label: "Articles published" },
  { n: college.length, label: "Campus roles held" },
  { n: spanOf(work[0].start), label: "At " + site.employer.name },
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* Two columns on desktop. A single centred column left roughly
          a third of a 1920 screen empty; the spec readout now occupies
          that space instead of stacking underneath. */}
      <div className={styles.inner}>
        <div className={styles.main}>
          {/* The portrait sits beside the name at every width. */}
          <div className={styles.identity}>
            <figure className={styles.polaroid}>
              <Image
                src={profile}
                alt="Shivraj Talekar"
                className={styles.portrait}
                sizes="(max-width: 600px) 34vw, (max-width: 1023px) 30vw, 260px"
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

          <div className={styles.copy}>
            <p className={styles.lede}>
              I build AI systems end to end &mdash; retrieval, knowledge graphs
              and the product that ships them. Currently {site.employer.role} at{" "}
              {site.employer.name}, after starting there in cloud and DevOps.
            </p>

            <div className={styles.actions}>
              <Link href="/projects" className="btn btn-primary">
                See the work
              </Link>
              {/* Contact should not cost a detour through LinkedIn. */}
              <a
                className="btn"
                href={site.mailto}
                target="_blank"
                rel="noopener noreferrer"
              >
                Email me
              </a>
              <a
                className={`btn ${styles.ghost}`}
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className={styles.specWrap}>
          <dl className={styles.facts}>
            {facts.map((row) => (
              <div key={row.label} className={styles.factCard}>
                <dt className={styles.factLabel}>{row.label}</dt>
                <dd className={styles.factValue}>{row.value}</dd>
              </div>
            ))}
          </dl>

          {/* Marks render in currentColor, not brand colour. Half of
              these brands are a shade of sky blue - React, Docker,
              Neo4j, LangChain - which the palette rules out. */}
          <div className={styles.rail}>
            <p className={styles.railLabel}>Built with</p>
            <ul className={styles.railList}>
              {stack.map((tool) => (
                <li key={tool.name}>
                  <span className={styles.chip} title={tool.name}>
                    <svg
                      viewBox="0 0 24 24"
                      width="21"
                      height="21"
                      role="img"
                      aria-label={tool.name}
                    >
                      <path d={tool.d} fill="currentColor" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <dl className={styles.proof}>
        {proof.map((item) => (
          <div key={item.label} className={styles.proofItem}>
            <dt className={styles.proofN}>{item.n}</dt>
            <dd className={styles.proofLabel}>{item.label}</dd>
          </div>
        ))}
      </dl>

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
