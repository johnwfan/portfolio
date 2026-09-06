import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ABOUT, PROFILE, STACK, PROJECTS } from "@/lib/content";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary";

const iconLinkClass =
  "flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary";

export const metadata = {
  title: "about • john fan",
};

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-border py-6 sm:grid-cols-[140px_1fr] sm:gap-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-foreground">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  const building = PROJECTS.find((p) => p.flagship);
  const tools = [...STACK.languages, ...STACK.tools].map((t) => t.label);

  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 sm:py-20">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">about</h1>
      <p className="mt-4 max-w-[640px] leading-relaxed text-muted-foreground">{ABOUT.subhead}</p>

      <div className="mt-10 max-w-[640px] space-y-5 leading-relaxed">
        {ABOUT.bio.map((p) => (
          <p key={p}>{p.trim()}</p>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
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
        <a href={PROFILE.links.resume} target="_blank" rel="noreferrer" className={linkClass}>
          resume <ArrowUpRight size={13} className="text-primary" />
        </a>
      </div>

      <div className="mt-14">
        {building ? (
          <Row label="now">
            <p>
              building <span className="text-primary">→</span>{" "}
              <a
                href={`/projects/${building.slug}`}
                className="underline underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {building.title}
              </a>
            </p>
          </Row>
        ) : null}

        <Row label="elsewhere">
          <p>{ABOUT.elsewhere.join(" · ")}</p>
        </Row>

        <Row label="things i like">
          <p>{ABOUT.likes.join(" · ")}</p>
        </Row>

        <Row label="tools">
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            {tools.join(" · ")}
          </p>
        </Row>
      </div>
    </main>
  );
}
