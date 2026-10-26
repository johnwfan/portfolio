import Link from "./TransitionLink";
import { PROJECTS } from "@/content/projects";
import RecruiterToggle from "./RecruiterToggle";
import styles from "./RecruiterView.module.css";

const EXPERIENCE = [
  { org: "screenz.ai / rankmonster.ai", role: "software engineering intern", when: "may–aug 2026" },
  { org: "icode pearland", role: "software & robotics instructor", when: "aug 2024–mar 2025" },
  { org: "amazon · google · digital.ai", role: "owl edge externships with rice alumni", when: "2025–26" },
];

// The plain, scannable version of the home page (HANDOFF §6.1).
export default function RecruiterView({ onToggle }) {
  return (
    <main className={styles.view}>
      <header className={styles.header}>
        <span className={styles.name}>john fan</span>
        <nav className={styles.nav} aria-label="site">
          <RecruiterToggle on onToggle={onToggle} />
          <a href="/resume.pdf" target="_blank" rel="noopener" className={styles.resume}>
            résumé
          </a>
        </nav>
      </header>

      <div className={styles.grid}>
        <div className={styles.col}>
          <div className={styles.intro}>
            <h1 className={styles.big}>john fan</h1>
            <p className={styles.sub}>software engineer · computer science at rice university</p>
          </div>

          <section className={styles.list}>
            <h2 className={styles.label}>experience</h2>
            {EXPERIENCE.map((e) => (
              <div key={e.org} className={styles.exp}>
                <span className={styles.expText}>
                  <span className={styles.org}>{e.org}</span>
                  <br />
                  <span className={styles.muted}>{e.role}</span>
                </span>
                <span className={styles.when}>{e.when}</span>
              </div>
            ))}
          </section>

          <div className={styles.links}>
            <a href="mailto:johnfan.dev@gmail.com">johnfan.dev@gmail.com</a>
            <a href="https://github.com/johnwfan" target="_blank" rel="noopener">
              github
            </a>
            <a href="https://www.linkedin.com/in/johnwfan/" target="_blank" rel="noopener">
              linkedin
            </a>
            <a href="https://x.com/johnwfan" target="_blank" rel="noopener">
              x
            </a>
          </div>
        </div>

        <section className={styles.list}>
          <h2 className={styles.label}>selected work</h2>
          {PROJECTS.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className={styles.project}>
              <span className={styles.pName}>{p.name}</span>
              <span className={styles.pLine}>
                {p.line}
                <br />
                <span className={styles.pStack}>{p.stack}</span>
              </span>
              <span className={styles.pYear}>{p.year}</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
