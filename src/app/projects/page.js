import { PROJECTS } from "@/lib/content";
import { ProjectList } from "@/components/project-list";

export const metadata = { title: "work • john fan" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-20">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">projects</h1>
      <p className="mt-4 max-w-[640px] leading-relaxed text-muted-foreground">
        some things that i&apos;ve been working on.
      </p>
      <div className="mt-10">
        <ProjectList projects={PROJECTS} expanded />
      </div>
    </main>
  );
}
