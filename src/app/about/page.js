import { FileDown } from "lucide-react";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";
import TechStack from "@/components/tech-stack";
import { ABOUT, PROFILE } from "@/lib/content";

export const metadata = {
  title: "about • john fan",
};

export default function AboutPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <Reveal as="header">
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            about
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">{ABOUT.subhead}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 rounded-2xl border border-border bg-secondary/40 p-8 sm:p-10">
          <div className="space-y-5 leading-relaxed text-muted-foreground">
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
        </Reveal>
      </div>

      <TechStack />
      {/* <Timeline /> — off for now, component kept in codebase for later */}
    </main>
  );
}
