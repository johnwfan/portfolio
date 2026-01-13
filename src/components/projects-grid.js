import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ParallaxCard from "@/components/parallax-card";

function ProjectThumb({ p }) {
  if (!p.image) return <div className="h-48 rounded-xl border bg-muted/25" />;

  return (
    <div className="relative h-48 overflow-hidden rounded-xl border bg-muted/25">
      <img
        src={p.image}
        alt={`${p.title} preview`}
        className="h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/35 to-transparent" />
    </div>
  );
}

/**
 * If you pass onSelect(project), cards become buttons that open a modal (no URL change).
 * If you DON'T pass onSelect, cards are Links to /projects/[slug].
 */
export default function ProjectsGrid({ projects = [], onSelect }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => {
        const CardInner = (
          <ParallaxCard className="h-full">
            <Card className="relative h-full overflow-hidden border bg-background/40 backdrop-blur transition-colors hover:border-border/80">
              <CardContent className="relative p-6 space-y-4">
                <ProjectThumb p={p} />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {p.blurb}
                    </p>
                  </div>

                  {p.metric ? (
                    <span className="shrink-0 text-xs text-muted-foreground rounded-full border px-2 py-1">
                      {p.metric}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {(p.tags ?? []).map((t) => (
                    <Badge key={t} variant="outline" className="rounded-full">
                      {t}
                    </Badge>
                  ))}
                </div>

                <p className="pt-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Read case study →
                </p>
              </CardContent>
            </Card>
          </ParallaxCard>
        );

        // HOME mode (modal): button, no navigation
        if (onSelect) {
          return (
            <button
              key={p.slug}
              type="button"
              className="group block text-left"
              onClick={() => onSelect(p)}
            >
              {CardInner}
            </button>
          );
        }

        // PROJECTS page mode: real route navigation
        return (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group block">
            {CardInner}
          </Link>
        );
      })}
    </div>
  );
}
