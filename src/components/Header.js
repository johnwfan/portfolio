import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import RecruiterToggle from "./RecruiterToggle";
import styles from "./Header.module.css";

// Site header (HANDOFF §6). On home the recruiter switch toggles in place;
// elsewhere it links to /?recruiter=1 and `← menu` leads back home.
export default function Header({ home = false, onRecruiter, className = "" }) {
  return (
    <header className={`${styles.header} ${className}`}>
      {home ? (
        <h1 className={styles.name}>john fan</h1>
      ) : (
        <div className={styles.left}>
          <Link href="/" className={styles.back}>
            ← menu
          </Link>
          <span className={styles.name}>john fan</span>
        </div>
      )}
      <nav className={styles.nav} aria-label="site">
        <ThemeToggle className={styles.btn} />
        <SoundToggle className={styles.btn} />
        {home ? (
          <RecruiterToggle on={false} onToggle={onRecruiter} />
        ) : (
          <Link href="/?recruiter=1" className={styles.link}>
            recruiter mode
          </Link>
        )}
        <a href="/resume.pdf" target="_blank" rel="noopener" className={styles.link}>
          résumé ↗
        </a>
      </nav>
    </header>
  );
}
