import ProjectsGrid from "@/components/projects-grid";
import { PROJECTS } from "@/lib/content";

export const metadata = { title: "projects • john fan" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="animate-[fade-up_700ms_ease-out_both]">
        <h1 className="text-4xl font-semibold tracking-tight">projects</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          click any project for the full breakdown + screenshots.
        </p>
      </header>

      <section className="mt-10">
        <ProjectsGrid projects={PROJECTS} />
      </section>
    </main>
  );
}
