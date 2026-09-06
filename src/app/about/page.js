import { FileDown } from "lucide-react";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { ABOUT, PROFILE, STACK, PROJECTS } from "@/lib/content";

export const metadata = {
  title: "about • john fan",
};

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-border py-6 sm:grid-cols-[140px_1fr] sm:gap-6">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
      <div className="text-foreground">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  const building = PROJECTS.find((p) => p.flagship);
  const tools = [...STACK.languages, ...STACK.tools].map((t) => t.label);

  return (
    <main>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <Reveal as="header">
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
            about
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">{ABOUT.subhead}</p>
        </Reveal>

        <div className="mt-12 space-y-5 border-l-2 border-primary/30 pl-6 leading-relaxed text-foreground">
          {ABOUT.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-7">
          <Button variant="outline" asChild>
            <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
              <FileDown /> download resume
            </a>
          </Button>
        </div>

        <div className="mt-16">
          <Row label="now">
            <div className="space-y-1.5">
              {building ? (
                <p>
                  building →{" "}
                  <a
                    href={`/projects/${building.slug}`}
                    className="underline decoration-primary/40 decoration-2 underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    {building.title.toLowerCase()}
                  </a>
                </p>
              ) : null}
              <p>learning → {ABOUT.now.learning}</p>
              <p>playing → {ABOUT.now.playing}</p>
            </div>
          </Row>

          <Row label="elsewhere">
            <p>{ABOUT.elsewhere.join(" · ")}</p>
          </Row>

          <Row label="things i like">
            <p>{ABOUT.likes.join(" · ")}</p>
          </Row>

          <Row label="tools i reach for">
            <p className="font-mono text-sm leading-relaxed text-muted-foreground">
              {tools.join(" · ")}
            </p>
          </Row>
        </div>
      </div>
    </main>
  );
}
