import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEATURED_PROJECTS } from "@/lib/content";
import ParallaxCard from "@/components/parallax-card";

function ProjectCard({ p, index }) {
  return (
    <Link href={p.href} className="group block">
      <ParallaxCard className="h-full">
        <Card
          className="relative h-full overflow-hidden border bg-background/40 backdrop-blur transition-colors group-hover:border-border/80"
          style={{ animationDelay: `${index * 90}ms` }}
        >

          <CardContent className="relative p-6 space-y-4">
            <div className="relative h-40 overflow-hidden rounded-xl border bg-muted/25">
                <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.blurb}
                </p>
              </div>

              <span className="shrink-0 text-xs text-muted-foreground rounded-full border px-2 py-1">
                {p.metric}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {p.tags.map((t) => (
                <Badge key={t} variant="outline" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>

            <p className="pt-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              read case study →
            </p>
          </CardContent>
        </Card>
      </ParallaxCard>
    </Link>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="animate-[fade-up_700ms_ease-out_both] flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">featured projects</h2>
          <p className="mt-2 text-muted-foreground">
            some cool projects i've worked on!
          </p>
        </div>

        <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          see all →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
