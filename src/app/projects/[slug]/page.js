import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import GlowLink from "@/components/glow-link";
import { PROJECTS } from "@/lib/content";

export default async function ProjectPage({ params }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← back to projects
      </Link>

      <header className="mt-6 animate-[fade-up_700ms_ease-out_both]">
        <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>

        {project.overview ? (
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {project.overview}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {(project.stack ?? []).map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
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
        <div className="mt-10 overflow-hidden rounded-2xl border bg-muted/20">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full object-cover"
            draggable={false}
          />
        </div>
      ) : null}

      {project.bullets?.length ? (
        <section className="mt-10 animate-[fade-up_900ms_ease-out_both]">
          <h2 className="text-2xl font-semibold tracking-tight">highlights</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
