import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/reveal";

function ProjectThumb({ p, tall = false }) {
  if (!p.image) {
    return <div className={tall ? "h-64 rounded-xl border bg-muted sm:h-80" : "h-48 rounded-xl border bg-muted"} />;
  }

  return (
    <div
      className={
        "relative overflow-hidden rounded-xl border bg-muted " + (tall ? "h-64 sm:h-80" : "h-48")
      }
    >
      <img
        src={p.image}
        alt={`${p.title} preview`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

function ProjectMeta({ p }) {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
          {p.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.blurb}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap gap-2">
          {(p.tags ?? []).map((t) => (
            <Badge key={t} variant="outline" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>
        {p.duration ? (
          <span className="shrink-0 text-xs text-muted-foreground">{p.duration}</span>
        ) : null}
      </div>
    </>
  );
}

function ProjectCard({ p, featured = false }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border bg-card transition-colors hover:border-primary/40 hover:shadow-md">
        <CardContent
          className={featured ? "grid gap-6 p-6 sm:grid-cols-2 sm:items-center" : "space-y-4 p-6"}
        >
          <ProjectThumb p={p} tall={featured} />
          <div className={featured ? "space-y-4" : "space-y-4"}>
            <ProjectMeta p={p} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ProjectsGrid({ projects = [] }) {
  const flagship = projects.find((p) => p.flagship);
  const rest = projects.filter((p) => !p.flagship);

  return (
    <div className="space-y-6">
      {flagship ? (
        <Reveal>
          <ProjectCard p={flagship} featured />
        </Reveal>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
