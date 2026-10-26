import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import RecruiterToggle from "./RecruiterToggle";
import MobileMenu from "./MobileMenu";
import PathNav from "./PathNav";
import styles from "./Header.module.css";

// Site header (HANDOFF §6). On home the recruiter switch toggles in place;
// elsewhere it links to /?recruiter=1, and the top-left is the page's path:
// `path` lists the pieces after `john fan`, e.g. [{ label: "work", href: "/work" }, { label: "flow" }].
export default function Header({ home = false, path = [], onRecruiter, className = "" }) {
  return (
    <header className={`${styles.header} ${className}`}>
      {home ? (
        <h1 className={styles.name}>john fan</h1>
      ) : (
        <PathNav items={[{ label: "john fan", href: "/" }, ...path]} />
      )}
      <nav className={`${styles.nav} ${styles.desktopNav}`} aria-label="site">
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
          résumé
        </a>
      </nav>
      <div className={`${styles.nav} ${styles.mobileNav}`}>
        <MobileMenu home={home} onRecruiter={onRecruiter} />
      </div>
    </header>
  );
}
