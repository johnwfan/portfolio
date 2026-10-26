import styles from "./CaseStudy.module.css";

// A tiny architecture line: mono boxes joined by short hairlines; one box can
// be highlighted.
export default function Pipeline({ nodes }) {
  return (
    <div className={styles.pipeline}>
      <ol className={styles.pipelineRow}>
        {nodes.map((n, i) => (
          <li key={n.label} className={styles.pipelineStep}>
            {i > 0 && <span aria-hidden="true" className={styles.pipelineLink} />}
            <span className={`${styles.node} ${n.highlight ? styles.nodeOn : ""}`}>{n.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
