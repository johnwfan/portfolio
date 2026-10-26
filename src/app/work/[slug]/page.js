import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CoverResolve from "@/components/CoverResolve";
import { PROJECTS } from "@/content/projects";
import styles from "@/components/CaseStudy.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return { title: p?.name };
}

// Not designed yet: title, year, role, stack, one-line, the cover's final frame
// and a way back. John designs the real page next.
export default async function Page({ params }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <>
      <Header path={[{ label: "work", href: "/work" }, { label: p.name }]} />
      <main className={styles.page}>
        <div className={styles.text}>
          <h1 className={styles.title}>{p.name}</h1>
          <p className={styles.line}>{p.line}</p>
          <dl className={styles.rows}>
            <div className={styles.row}>
              <dt>role</dt>
              <dd>{p.role}</dd>
            </div>
            <div className={styles.row}>
              <dt>stack</dt>
              <dd>{p.stack}</dd>
            </div>
            <div className={styles.row}>
              <dt>year</dt>
              <dd>{p.year}</dd>
            </div>
          </dl>
        </div>
        <div className={styles.cover}>
          <CoverResolve slug={p.slug} name={p.name} resolve={false} priority />
        </div>
      </main>
    </>
  );
}
