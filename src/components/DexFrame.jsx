import styles from "./DexFrame.module.css";

/**
 * Device chrome for a major section: bezel, indicator lights, a label
 * plate and a recessed screen holding the children.
 *
 * Purely presentational - the lights and plate are aria-hidden so a
 * screen reader gets the section content without the costume.
 */
export default function DexFrame({ label, entry, children }) {
  return (
    <div className={styles.frame}>
      <div className={styles.bezel} aria-hidden="true">
        <span className={`${styles.lamp} ${styles.lampMain}`} />
        <span className={styles.lamp} />
        <span className={styles.lamp} />
        <span className={styles.plate}>{label}</span>
        <span className={styles.grill}>
          <i /><i /><i /><i />
        </span>
        {entry && <span className={styles.entry}>{entry}</span>}
      </div>

      <div className={styles.screen}>{children}</div>
    </div>
  );
}
