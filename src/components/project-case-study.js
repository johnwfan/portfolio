import { Github, ExternalLink } from "lucide-react";

function isPlaceholder(text) {
  return typeof text === "string" && text.startsWith("[") && text.endsWith("]");
}

export default function ProjectCaseStudy({ project }) {
  const isTeam = Boolean(project.credit);

  return (
    <div>
      <header className="space-y-6">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>

        {project.blurb ? (
          <p className="max-w-[640px] text-lg leading-relaxed text-foreground/90">
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
              <ExternalLink size={13} className="text-primary" /> live demo
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
        <section className="mt-14">
          <h2 className="text-sm font-medium text-muted-foreground">why i built it</h2>
          <p className="mt-3 max-w-[640px] leading-relaxed">{project.overview}</p>
        </section>
      ) : null}

      {project.bullets?.length ? (
        <section className="mt-14">
          <h2 className="text-sm font-medium text-muted-foreground">selected details</h2>
          <ul className="mt-3 max-w-[640px] list-disc space-y-3 pl-5">
            {project.bullets.map((b) => (
              <li key={b} className="leading-relaxed">
                {b}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.architecture?.length ? (
        <section className="mt-14">
          <h2 className="text-sm font-medium text-muted-foreground">how it works</h2>
          <ol className="mt-3 max-w-[640px] list-decimal space-y-3 pl-5">
            {project.architecture.map((step) => (
              <li key={step} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.learned && !isPlaceholder(project.learned) ? (
        <section className="mt-14 border-t border-border pt-8">
          <h2 className="text-sm font-medium text-muted-foreground">what i learned</h2>
          <p className="mt-3 max-w-[640px] italic leading-relaxed">{project.learned}</p>
        </section>
      ) : null}
    </div>
  );
}
