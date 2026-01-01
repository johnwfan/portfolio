"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProjectsGrid from "@/components/projects-grid";
import ProjectPreviewModal from "@/components/project-preview-modal";
import { FEATURED_PROJECTS } from "@/lib/content";

export default function FeaturedProjects() {
  const projects = useMemo(() => FEATURED_PROJECTS ?? [], []);
  const [openSlug, setOpenSlug] = useState(null);

  const active = useMemo(
    () => projects.find((p) => p.slug === openSlug) ?? null,
    [projects, openSlug]
  );

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="animate-[fade-up_700ms_ease-out_both] flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">some of my projects</h2>
          <p className="mt-2 text-muted-foreground">
            stuff i've been working on!
          </p>
        </div>

        <Link
          href="/projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          see all →
        </Link>
      </div>

      <div className="mt-6">
        <ProjectsGrid
          projects={projects}
          onSelect={(p) => setOpenSlug(p.slug)} // ✅ home opens modal, no URL change
        />
      </div>

      <ProjectPreviewModal
        open={!!active}
        project={active}
        onClose={() => setOpenSlug(null)}
      />
    </section>
  );
}
