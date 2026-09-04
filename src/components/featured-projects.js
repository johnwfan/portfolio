import Link from "next/link";
import ProjectsGrid from "@/components/projects-grid";
import Reveal from "@/components/reveal";
import { PROJECTS } from "@/lib/content";

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Reveal className="flex items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            my work
          </h2>
          <p className="mt-2 text-muted-foreground">a few of the things i&apos;ve been building lately.</p>
        </div>

        <Link
          href="/projects"
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          see all →
        </Link>
      </Reveal>

      <div className="mt-8">
        <ProjectsGrid projects={PROJECTS} />
      </div>
    </section>
  );
}
