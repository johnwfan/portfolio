import { Badge } from "@/components/ui/badge";
import GlowLink from "@/components/glow-link";

export default function ProjectCaseStudy({ project, showBackLink = false }) {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>

        {project.overview ? (
          <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {(project.stack ?? project.tags ?? []).map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.links?.github ? (
            <GlowLink href={project.links.github} target="_blank" rel="noreferrer">
              github ↗
            </GlowLink>
          ) : null}

          {project.links?.live ? (
            <GlowLink href={project.links.live} target="_blank" rel="noreferrer">
              live demo ↗
            </GlowLink>
          ) : null}
        </div>
      </header>

      {project.image ? (
        <div className="overflow-hidden rounded-2xl border bg-muted/20">
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
          <h2 className="text-xl font-semibold tracking-tight">highlights</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
