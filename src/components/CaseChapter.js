import ScrollShot from "./ScrollShot";
import Pipeline from "./Pipeline";
import ValidationDiagram from "./ValidationDiagram";
import styles from "./CaseStudy.module.css";

// One chapter: mono title, lead sentence, body, then any of a pipeline line, a
// screen, the validation diagram, a list, numbered steps or stack chips.
export default function CaseChapter({ chapter: c, name }) {
  return (
    <section id={c.id} className={styles.chapter}>
      <div className={styles.chapterText}>
        <h2 className={styles.chapterTitle}>{c.title}</h2>
        {c.lead && <p className={styles.lead}>{c.lead}</p>}
        {c.body && <p className={styles.body}>{c.body}</p>}
        {c.list?.length > 0 && (
          <ul className={styles.list}>
            {c.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {c.steps?.length > 0 && (
          <ol className={styles.steps}>
            {c.steps.map((step, i) => (
              <li key={step}>
                <span className={styles.stepN}>{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
        {c.chips?.length > 0 && (
          <ul className={styles.chips}>
            {c.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        )}
      </div>
      {c.pipeline && <Pipeline nodes={c.pipeline} />}
      {c.screen && (
        <figure className={styles.figure}>
          <ScrollShot
            src={c.screen}
            alt={c.caption ?? `${name} screenshot`}
            sizes="(min-width: 900px) 984px, 100vw"
            className={styles.chapterShot}
          />
          {c.caption && <figcaption className={styles.caption}>{c.caption}</figcaption>}
        </figure>
      )}
      {c.diagram && <ValidationDiagram {...c.diagram} />}
    </section>
  );
}
