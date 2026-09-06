import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/content";
import ProjectCaseStudy from "@/components/project-case-study";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return { title: project ? `${project.title} • john fan` : "project • john fan" };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];

  if (!project) notFound();

  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={13} /> back to work
      </Link>

      <div className="mt-10">
        <ProjectCaseStudy project={project} />
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-between gap-4 border border-border p-6 transition-colors hover:border-primary/40"
        >
          <div>
            <p className="text-xs text-muted-foreground">
              next project
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={18}
            className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
          />
        </Link>
      </div>
    </main>
  );
}
