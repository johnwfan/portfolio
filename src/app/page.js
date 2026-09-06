import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE, TIMELINE, PROJECTS } from "@/lib/content";
import { ProjectList } from "@/components/project-list";

const iconLinkClass =
  "flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary";

const experience = TIMELINE.find((entry) => entry.title.startsWith("Screenz.ai"));

export default function Home() {
  return (
    <main className="mx-auto max-w-[900px] px-6">
      {/* intro */}
      <section className="py-12 sm:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          hey, i&apos;m john!
        </h1>
        <p className="mt-5 max-w-[650px] text-lg leading-relaxed text-foreground/90">
          i&apos;m a computer science student at Rice and a software engineer.
          i&apos;ve worked on production software at{" "}
          <a
            href="https://screenz.ai"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            screenz.ai
          </a>
          , and spend my time building full-stack, data, and machine learning projects.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary"
          >
            github <ArrowUpRight size={13} className="text-primary" />
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary"
          >
            linkedin <ArrowUpRight size={13} className="text-primary" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary"
          >
            email <ArrowUpRight size={13} className="text-primary" />
          </a>
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-primary"
          >
            resume <ArrowUpRight size={13} className="text-primary" />
          </a>
        </div>
      </section>

      {/* experience */}
      <section id="experience" className="scroll-mt-20 py-9 sm:py-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-primary">
          experience
        </h2>
        {experience ? (
          <div className="mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-medium">{experience.title}</p>
              <span className="text-sm text-muted-foreground">{experience.time}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{experience.subtitle}</p>
            {experience.bullets?.length ? (
              <ul className="mt-3 max-w-[640px] list-disc space-y-1.5 pl-5 leading-relaxed text-foreground/90">
                {experience.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </section>

      {/* projects */}
      <section id="projects" className="scroll-mt-20 py-9 sm:py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-primary">
            projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-foreground underline underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            all projects <span className="text-primary">→</span>
          </Link>
        </div>
        <ProjectList projects={PROJECTS} />
      </section>

      {/* about teaser */}
      <section className="py-9 sm:py-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-primary">
          about
        </h2>
        <p className="mt-4 max-w-[640px] leading-relaxed text-foreground/90">
          i&apos;m interested in software, systems, data, and understanding how the
          things i use actually work.{" "}
          <Link
            href="/about"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            more about me <span className="text-primary">→</span>
          </Link>
        </p>
      </section>

      {/* say hi */}
      <section id="contact" className="scroll-mt-20 py-9 sm:py-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-primary">
          say hi
        </h2>
        <p className="mt-3 text-foreground/90">feel free to reach out!</p>
        <div className="mt-4 flex items-center gap-3">
          <a href={`mailto:${PROFILE.email}`} aria-label="email" className={iconLinkClass}>
            <Mail size={16} />
          </a>
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="github"
            className={iconLinkClass}
          >
            <Github size={16} />
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="linkedin"
            className={iconLinkClass}
          >
            <Linkedin size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
