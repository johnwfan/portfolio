import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function ProjectListItem({ project, expanded }) {
  const stack = expanded ? project.stack : project.stackShort;

  return (
    <div className={`py-8 ${expanded ? "border-t border-border/60 first:border-t-0" : ""}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {project.title}
        </h3>
        <span className="text-sm text-muted-foreground">{project.year}</span>
      </div>
      <p className="mt-2 max-w-[640px] text-foreground/90 leading-relaxed">
        {project.teaser}
      </p>
      <p className="mt-2 max-w-[640px] leading-relaxed">
        {expanded ? project.overview : project.summary}
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">{stack.join(" · ")}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="text-foreground underline underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          view project <span className="text-primary">→</span>
        </Link>
        {project.links?.github ? (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            github <ArrowUpRight size={12} className="text-primary" />
          </a>
        ) : null}
        {project.links?.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            live <ArrowUpRight size={12} className="text-primary" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectList({ projects, expanded = false }) {
  return (
    <div>
      {projects.map((project) => (
        <ProjectListItem key={project.slug} project={project} expanded={expanded} />
      ))}
    </div>
  );
}
