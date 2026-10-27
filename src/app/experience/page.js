import Header from "@/components/Header";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import UnderlineLink from "@/components/UnderlineLink";
import { VisitorNo } from "@/components/VisitorCount";
import styles from "@/components/Experience.module.css";

export const metadata = { title: "experience" };

export default function Page() {
  return (
    <>
      <Header path={[{ label: "experience" }]} />
      <main className={styles.page}>
        <div className={styles.titleRow}>
          <div className={styles.titleBlock}>
            <h1 className={styles.heading}>experience</h1>
            <span className={styles.count}>2 roles · 3 externships · computer science at rice</span>
          </div>
          <UnderlineLink href="/resume.pdf" external className={styles.resume}>
            full résumé (pdf)
          </UnderlineLink>
        </div>

        <ExperienceTimeline />

        <div className={styles.bottom}>
          <p className={styles.more}>
            want the details? the{" "}
            <UnderlineLink href="/resume.pdf" external>
              full résumé
            </UnderlineLink>{" "}
            has everything, or see the <UnderlineLink href="/projects">projects</UnderlineLink>.
          </p>
          <UnderlineLink href="mailto:johnfan.dev@gmail.com" className={styles.mail}>
            johnfan.dev@gmail.com
          </UnderlineLink>
        </div>

        <footer className={styles.footer}>
          <span>john fan</span>
          <VisitorNo />
        </footer>
      </main>
    </>
  );
}
