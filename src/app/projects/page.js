import ProjectsGrid from "@/components/projects-grid";
import { PROJECTS } from "@/lib/content";

export const metadata = { title: "projects • john fan" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="animate-[fade-up_700ms_ease-out_both]">
        <h1 className="text-3xl font-semibold tracking-tight">My Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Click any project for the full breakdown + screenshots.
        </p>
      </header>

      <div className="mt-8">
        <ProjectsGrid projects={PROJECTS} />
      </div>
    </main>
  );
}
