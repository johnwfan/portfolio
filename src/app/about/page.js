import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ABOUT, PROFILE, STACK, PROJECTS } from "@/lib/content";
import AboutPhotoStack from "@/components/about-photo-stack";
import AbxyMark from "@/components/abxy-mark";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary";

const iconLinkClass =
  "flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-xbox-yellow hover:bg-xbox-yellow-soft";

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
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[640px] lg:max-w-[560px]">
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">about</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{ABOUT.subhead}</p>

          <div className="mt-10 space-y-5 leading-relaxed">
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
              resume <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <AboutPhotoStack className="self-center lg:mt-2 lg:self-auto" />
      </div>

      <div className="mt-14">
        {building ? (
          <Row label="now">
            <p>
              building{" "}
              <a
                href={`/projects/${building.slug}`}
                className="group underline underline-offset-4 transition-colors hover:decoration-primary"
              >
                <span className="group-hover:text-primary">→</span> {building.title}
              </a>
            </p>
          </Row>
        ) : null}

        <Row label="elsewhere">
          <p>{ABOUT.elsewhere.join(" · ")}</p>
        </Row>

        <Row label="things i like">
          <p>{ABOUT.likes.join(" · ")}</p>
          <div className="mt-3">
            <AbxyMark />
          </div>
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
