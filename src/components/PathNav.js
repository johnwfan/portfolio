import Link from "next/link";
import styles from "./PathNav.module.css";

// Where you are, in mono: `john fan / work / scuttle.gg` (UPDATE §1).
// Every piece but the last is a link; the last is the current page.
export default function PathNav({ items }) {
  return (
    <nav className={styles.path} aria-label="breadcrumb">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.label} className={styles.piece}>
            {i > 0 && (
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
            )}
            {last ? (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
