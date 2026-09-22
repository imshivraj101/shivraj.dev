import Image from "next/image";
import { work, college, rangeOf, spanOf } from "../data/experience";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import styles from "./Experience.module.css";

function initialsOf(org) {
  return org
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/** Tier 1 treatment - the professional track is the headline credential. */
function WorkCard({ job }) {
  return (
    <article className={styles.workCard}>
      <header className={styles.workTop}>
        <div>
          <span className={styles.workOrg}>{job.org}</span>
          <p className={styles.workFacts}>
            {job.employment} &middot; {job.arrangement} &middot;{" "}
            {spanOf(job.start, job.end)}
          </p>
        </div>
        {job.current && <span className={styles.badge}>Current</span>}
      </header>

      <ol className={styles.track}>
        {job.roles.map((r) => (
          <li key={r.role} className={styles.trackItem} data-current={r.current || undefined}>
            <span className={styles.dot} aria-hidden="true" />

            <h4 className={styles.workRole}>{r.role}</h4>

            <p className={styles.workWhen}>
              {rangeOf(r.start, r.end)}
              <span className={styles.sep} aria-hidden="true"> &middot; </span>
              <span className={styles.workSpan}>{spanOf(r.start, r.end)}</span>
            </p>

            <p className={styles.workWhere}>{r.location}</p>

            {r.summary && <p className={styles.workSummary}>{r.summary}</p>}
          </li>
        ))}
      </ol>
    </article>
  );
}

/** Tier 2 treatment - college roles, quieter by design. */
function CollegeCard({ exp }) {
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.logoWrap}>
        {exp.logo ? (
          <Image
            src={exp.logo}
            alt=""
            className={styles.logo}
            width={56}
            height={56}
            sizes="56px"
          />
        ) : (
          <span className={styles.initials} aria-hidden="true">
            {initialsOf(exp.org)}
          </span>
        )}
      </div>

      <div className={styles.text}>
        <h4 className={styles.role}>{exp.role}</h4>
        <p className={styles.org}>
          {exp.org}
          <span className={styles.duration}>{exp.duration}</span>
        </p>
      </div>
    </article>
  );
}

export default function Experience() {
  const groups = [
    { key: "co-curricular", label: "Co-curricular" },
    { key: "extracurricular", label: "Extracurricular" },
  ];

  return (
    <>
      <section id="experience" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Experience</p>
            <h2 className="section-title outline">Where I work</h2>
            <p className="section-lede">
              Shipping AI products and platforms in production.
            </p>
          </Reveal>

          <RevealGroup className={styles.workGrid}>
            {work.map((job) => (
              <RevealItem key={`${job.role}-${job.org}`}>
                <WorkCard job={job} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="college" className={`section ${styles.collegeSection}`}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Before this</p>
            <h2 className="section-title outline-cool">
              College days at KKWIEER
            </h2>
            <p className="section-lede">
              CS &amp; Design at KKWIEER, class of 2026 &mdash; spent running
              design teams, committees and a national hackathon alongside it.
            </p>
          </Reveal>

          {groups.map(({ key, label }) => {
            const items = college.filter((e) => e.type === key);
            if (items.length === 0) return null;

            return (
              <div key={key} className={styles.group}>
                <h3 className={styles.groupTitle}>
                  <span className={styles.groupLabel}>{label}</span>
                  <span className={styles.rule} aria-hidden="true" />
                  <span className={styles.groupCount}>{items.length}</span>
                </h3>

                <RevealGroup className={styles.grid}>
                  {items.map((exp) => (
                    <RevealItem key={`${exp.role}-${exp.org}`}>
                      <CollegeCard exp={exp} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
