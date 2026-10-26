import ScrollShot from "./ScrollShot";
import OnThisPage from "./OnThisPage";
import CaseChapter from "./CaseChapter";
import NextProject from "./NextProject";
import UnderlineLink from "./UnderlineLink";
import styles from "./CaseStudy.module.css";

// The case study template for /work/[slug] (UPDATE §6). `cs` comes from
// getCaseStudy() in src/lib/caseStudy.js.
export default function CaseStudy({ cs }) {
  const { project: p } = cs;
  const chapters = cs.chapters.map((c, i) => ({ ...c, id: `chapter-${i + 1}` }));

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{p.name}</h1>
          <span className={styles.position}>{cs.position}</span>
        </div>
        <p className={styles.lede}>{cs.lede}</p>
        <dl
          className={styles.meta}
          style={{ gridTemplateColumns: cs.meta.map((m) => m.width).join(" ") }}
        >
          {cs.meta.map((m) => (
            <div key={m.key} className={styles.metaCell}>
              <dt>{m.label}</dt>
              <dd>
                {m.links ? (
                  <span className={styles.metaLinks}>
                    {m.links.map((l) => (
                      <UnderlineLink key={l.label} href={l.href} external>
                        {l.label}
                      </UnderlineLink>
                    ))}
                  </span>
                ) : (
                  m.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className={styles.heroFigure}>
        <ScrollShot
          src={cs.hero}
          alt={cs.heroCaption ?? `[${p.name} screenshot]`}
          sizes="(min-width: 900px) 1328px, 100vw"
          className={styles.heroShot}
          preload
        />
        {cs.heroCaption && <figcaption className={styles.caption}>{cs.heroCaption}</figcaption>}
      </figure>

      {chapters.length > 0 && <OnThisPage chapters={chapters} row />}

      {cs.facts.length > 0 && (
        <dl className={styles.facts}>
          {cs.facts.map((f) => (
            <div key={f.label} className={styles.fact}>
              <dt className={styles.factLabel}>{f.label}</dt>
              <dd className={styles.factN}>{f.n}</dd>
            </div>
          ))}
        </dl>
      )}

      {chapters.length > 0 && (
        <div className={styles.bodyGrid}>
          <aside className={styles.aside}>
            <OnThisPage chapters={chapters} />
          </aside>
          <div className={styles.chapters}>
            {chapters.map((c) => (
              <CaseChapter key={c.id} chapter={c} name={p.name} />
            ))}
            {cs.credit && <p className={styles.credit}>{cs.credit}</p>}
          </div>
        </div>
      )}

      <NextProject {...cs.next} />
    </main>
  );
}
