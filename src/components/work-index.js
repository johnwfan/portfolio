"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/content";

function Row({ project, isHovered, onEnter, onLeave }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      className="group flex items-start justify-between gap-4 border-t border-border py-6 first:border-t-0"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <span
            className={`inline-flex items-center gap-1.5 font-display text-2xl font-semibold tracking-tight transition-colors sm:text-3xl ${
              isHovered ? "text-primary" : "text-foreground"
            }`}
          >
            {project.title}
            <ArrowUpRight
              size={16}
              className={`transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>
        <p className="mt-2 max-w-md text-muted-foreground leading-relaxed">{project.teaser}</p>
      </div>

      {/* Mobile-only companion thumbnail — fixed box, natural proportions via
          object-contain, so a wide shot and a near-square shot don't get
          forced into the same crop. */}
      <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden sm:hidden">
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
      </div>
    </Link>
  );
}

export default function WorkIndex() {
  const flagship = PROJECTS.find((p) => p.flagship) ?? PROJECTS[0];
  const [activeSlug, setActiveSlug] = useState(flagship.slug);
  const [hoveredSlug, setHoveredSlug] = useState(null);

  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          things i&apos;ve made
        </h2>

        <div className="mt-8 grid gap-10 sm:grid-cols-[1.4fr_1fr] sm:gap-12">
          <div>
            {PROJECTS.map((project) => (
              <Row
                key={project.slug}
                project={project}
                isHovered={hoveredSlug === project.slug}
                onEnter={() => {
                  setActiveSlug(project.slug);
                  setHoveredSlug(project.slug);
                }}
                onLeave={() => setHoveredSlug(null)}
              />
            ))}
          </div>

          <div className="relative hidden aspect-[3/2] overflow-hidden border border-border bg-secondary sm:block">
            {PROJECTS.map((project) => (
              <img
                key={project.slug}
                src={project.image}
                alt=""
                aria-hidden={project.slug !== activeSlug}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 motion-reduce:transition-none ${
                  project.slug === activeSlug ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
