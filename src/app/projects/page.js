import ProjectsGrid from "@/components/projects-grid";
import Reveal from "@/components/reveal";
import { PROJECTS } from "@/lib/content";

export const metadata = { title: "my work • john fan" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-8 pb-16 sm:pt-10 sm:pb-20">
      <Reveal as="header">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          my work
        </h1>
        <p className="mt-3 text-muted-foreground">
          a few things i&apos;ve built recently — click into any of them for the full breakdown.
        </p>
      </Reveal>

      <div className="mt-10">
        <ProjectsGrid projects={PROJECTS} />
      </div>
    </main>
  );
}
