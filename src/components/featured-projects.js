import Link from "next/link";
import ProjectsGrid from "@/components/projects-grid";
import { FEATURED_PROJECTS } from "@/lib/content";

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="animate-[fade-up_700ms_ease-out_both] flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">featured projects</h2>
          <p className="mt-2 text-muted-foreground">
            the ones i’d click first if i were you.
          </p>
        </div>

        <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          see all →
        </Link>
      </div>

      <div className="mt-6">
        <ProjectsGrid projects={FEATURED_PROJECTS} />
      </div>
    </section>
  );
}
