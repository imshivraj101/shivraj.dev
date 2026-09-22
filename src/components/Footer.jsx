import { site } from "../data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.lead}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 className={styles.heading}>
            Wanna chat?
            <br />
            Hit me up.
          </h2>
          <p className={styles.sub}>
            Open to frontend and product design work, internships, and the
            occasional hackathon.
          </p>
          <a
            className="btn btn-primary"
            href={site.mailto}
            target="_blank"
            rel="noopener noreferrer"
          >
            Write me a message
          </a>
          <a className={styles.email} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <nav className={styles.social} aria-label="Social links">
          <h3 className={styles.socialTitle}>Find me on</h3>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  className={styles.socialLink}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{s.label}</span>
                  <span aria-hidden="true" className={styles.arrow}>
                    &#8599;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`wrap ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} {site.name}</p>
        <p className={styles.built}>Built with Next.js &middot; Nashik, India</p>
      </div>
    </footer>
  );
}
