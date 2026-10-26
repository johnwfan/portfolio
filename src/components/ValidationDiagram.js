import styles from "./CaseStudy.module.css";

// Rolling-forward validation (scuttle): per patch window, a bar split into
// train (grey) and test (blue) that moves right from card to card.
export default function ValidationDiagram({ windows, legend, caption }) {
  return (
    <figure className={styles.diagram}>
      <div className={styles.windows}>
        {windows.map((w) => (
          <div key={w.label} className={styles.window}>
            <span className={styles.windowLabel}>{w.label}</span>
            <div className={styles.bar} aria-hidden="true">
              <span style={{ flex: w.train }} className={styles.train} />
              <span style={{ flex: w.test }} className={styles.test} />
              <span style={{ flex: w.rest }} />
            </div>
            <span className={styles.legend}>{legend}</span>
          </div>
        ))}
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
