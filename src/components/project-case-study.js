import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCaseStudy({ project }) {
  const isTeam = Boolean(project.credit);

  return (
    <div className="space-y-10">
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
          <span className="rounded-full border px-2.5 py-1">
            {isTeam ? "team project" : "solo project"}
          </span>
          {project.duration ? (
            <span className="rounded-full border px-2.5 py-1">{project.duration}</span>
          ) : null}
        </div>

        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>

        {project.overview ? (
          <p className="max-w-3xl text-muted-foreground leading-relaxed">{project.overview}</p>
        ) : null}

        {isTeam ? (
          <p className="text-sm text-muted-foreground italic">{project.credit}</p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {(project.stack ?? project.tags ?? []).map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          {project.links?.github ? (
            <Button variant="outline" asChild>
              <a href={project.links.github} target="_blank" rel="noreferrer">
                <Github /> github
              </a>
            </Button>
          ) : null}

          {project.links?.live ? (
            <Button variant="outline" asChild>
              <a href={project.links.live} target="_blank" rel="noreferrer">
                <ExternalLink /> live demo
              </a>
            </Button>
          ) : null}
        </div>
      </header>

      {project.image ? (
        <div className="overflow-hidden rounded-2xl border bg-muted">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full object-cover"
            draggable={false}
          />
        </div>
      ) : null}

      {project.bullets?.length ? (
        <section>
          <h2 className="font-display text-xl font-semibold tracking-tight">highlights</h2>
          <ul className="mt-4 space-y-2.5 text-muted-foreground leading-relaxed">
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.architecture?.length ? (
        <section>
          <h2 className="font-display text-xl font-semibold tracking-tight">how it works</h2>
          <ol className="mt-4 space-y-3">
            {project.architecture.map((step, i) => (
              <li key={step} className="flex gap-4 text-muted-foreground leading-relaxed">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium text-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
