import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { PROJECTS } from "@/content/projects";
import { getCaseStudy } from "@/lib/caseStudy";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return { title: p?.name };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <Header path={[{ label: "projects", href: "/projects" }, { label: cs.project.name }]} />
      <CaseStudy cs={cs} />
    </>
  );
}
