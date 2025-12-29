import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/content";
import ProjectCaseStudy from "@/components/project-case-study";

export default async function ProjectPage({ params }) {
  const { slug } = await params; // Next can require unwrapping
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← back to projects
      </Link>

      <div className="mt-8">
        <ProjectCaseStudy project={project} />
      </div>
    </main>
  );
}
