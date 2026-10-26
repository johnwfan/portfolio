import Image from "next/image";
import Link from "./TransitionLink";
import styles from "./CaseStudy.module.css";

// The next project as one big link: its name thin (220) with a blurred preview
// of its first screen; on hover the name gains weight and the preview focuses.
export default function NextProject({ project, position }) {
  const shot = project.screens[0];
  return (
    <Link href={`/work/${project.slug}`} className={styles.next}>
      <div className={styles.nextText}>
        <span className={styles.nextLabel}>next project · {position}</span>
        <span className={styles.nextName}>{project.name}</span>
        <span className={styles.nextLine}>{project.line}</span>
      </div>
      <div className={styles.nextShot}>
        {shot ? (
          <Image src={shot} alt="" fill sizes="520px" className={styles.nextImg} />
        ) : (
          <span className={styles.nextPlaceholder}>[{project.name} screenshot]</span>
        )}
      </div>
    </Link>
  );
}
