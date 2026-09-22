import { work, college, rangeOf, spanOf } from "../data/experience";
import styles from "./ExperiencePanel.module.css";

export default function ExperiencePanel({ compact }) {
  const job = work[0];

  return (
    <div className={styles.panel} data-compact={compact || undefined}>
      {/* ---- Current posting ---- */}
      <section className={styles.now}>
        <header className={styles.nowTop}>
          <h3 className={styles.org}>{job.org}</h3>
          <span className={styles.badge}>Current</span>
        </header>
        <p className={styles.facts}>
          {job.employment} &middot; {job.arrangement} &middot;{" "}
          {spanOf(job.start, job.end)}
        </p>

        <ol className={styles.track}>
          {job.roles.map((r) => (
            <li
              key={r.role}
              className={styles.trackItem}
              data-current={r.current || undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
              <h4 className={styles.role}>{r.role}</h4>
              <p className={styles.when}>
                {rangeOf(r.start, r.end)}
                <span className={styles.span}>
                  {" "}
                  &middot; {spanOf(r.start, r.end)}
                </span>
              </p>
              {r.summary && <p className={styles.blurb}>{r.summary}</p>}
            </li>
          ))}
        </ol>
      </section>

      {/* ---- College archive ---- */}
      <section className={styles.archive}>
        <h3 className={styles.archiveTitle}>
          <span>College days at KKWIEER</span>
          <span className={styles.rule} aria-hidden="true" />
          <span className={styles.count}>{college.length}</span>
        </h3>
        <p className={styles.archiveLede}>CS &amp; Design, class of 2026.</p>

        <ul className={styles.list}>
          {college.map((c) => (
            <li key={`${c.role}-${c.org}`} className={styles.item}>
              <span className={styles.itemRole}>{c.role}</span>
              <span className={styles.itemOrg}>{c.org}</span>
              <span className={styles.itemWhen}>{c.duration}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
