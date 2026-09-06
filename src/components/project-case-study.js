import { Github, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/content";

function isPlaceholder(text) {
  return typeof text === "string" && text.startsWith("[") && text.endsWith("]");
}

export default function ProjectCaseStudy({ project }) {
  const isTeam = Boolean(project.credit);
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div>
      <header className="space-y-6">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-muted-foreground">{number}</span>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
        </div>

        {project.blurb ? (
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {project.blurb}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
          <span>{isTeam ? "team project" : "solo project"}</span>
          {project.year ? <span>{project.year}</span> : null}
          {project.links?.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
            >
              <Github size={13} /> github
            </a>
          ) : null}
          {project.links?.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-primary"
            >
              <ExternalLink size={13} /> live demo
            </a>
          ) : null}
        </div>

        {isTeam ? (
          <p className="text-xs italic text-muted-foreground">{project.credit}</p>
        ) : null}
      </header>

      {project.image ? (
        <div className="mt-10 overflow-hidden border border-border">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full object-cover"
            draggable={false}
          />
        </div>
      ) : null}

      {project.stack?.length ? (
        <p className="mt-6 font-mono text-sm text-muted-foreground">
          {project.stack.join(" · ")}
        </p>
      ) : null}

      {project.overview ? (
        <section className="mt-16">
          <h2 className="text-sm font-medium text-muted-foreground">
            why i built it
          </h2>
          <p className="mt-4 max-w-2xl text-foreground leading-relaxed">{project.overview}</p>
        </section>
      ) : null}

      {project.bullets?.length ? (
        <section className="mt-16">
          <h2 className="text-sm font-medium text-muted-foreground">
            selected details
          </h2>
          <ul className="mt-4 max-w-2xl space-y-4">
            {project.bullets.map((b, i) => (
              <li key={b} className="flex gap-4">
                <span className="pt-0.5 font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.architecture?.length ? (
        <section className="mt-16">
          <h2 className="text-sm font-medium text-muted-foreground">
            how it works
          </h2>
          <ol className="mt-4 max-w-2xl space-y-4">
            {project.architecture.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="pt-0.5 font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.learned && !isPlaceholder(project.learned) ? (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-sm font-medium text-muted-foreground">
            what i learned
          </h2>
          <p className="mt-4 max-w-2xl italic text-foreground leading-relaxed">
            {project.learned}
          </p>
        </section>
      ) : null}
    </div>
  );
}
