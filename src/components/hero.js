import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/lib/content";

function GlowBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-28 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-gradient-to-r from-muted/35 via-muted/15 to-muted/35 blur-3xl opacity-70" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.10)_1px,transparent_0)] [background-size:24px_24px] opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative">
      <GlowBg />

      <div className="relative mx-auto max-w-5xl px-6 pt-14 pb-10 sm:pt-20 sm:pb-14">
        <div className="animate-[fade-in_600ms_ease-out_both] inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          {PROFILE.role} • based in {PROFILE.location} • {PROFILE.status}
        </div>

        <h1 className="mt-6 animate-[fade-up_700ms_ease-out_both] text-4xl font-semibold tracking-tight sm:text-6xl">
          hi, i’m {PROFILE.name}!
        </h1>

        <p className="mt-4 animate-[fade-up_850ms_ease-out_both] max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          <span className="text-foreground">{PROFILE.headline}</span> {PROFILE.about}
        </p>

        <div className="mt-6 animate-[fade-up_1000ms_ease-out_both] flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/projects">view projects</Link>
          </Button>

          <Button variant="secondary" asChild>
            <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
              resume pdf
            </a>
          </Button>

          <Button variant="outline" asChild>
            <a href={`mailto:${PROFILE.email}`}>email me</a>
          </Button>
        </div>

        <div className="mt-7 animate-[fade-up_1150ms_ease-out_both] flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full">ships code</Badge>
          <Badge variant="secondary" className="rounded-full">likes ux</Badge>
          <Badge variant="secondary" className="rounded-full">lowkey silly</Badge>
          <Badge variant="secondary" className="rounded-full">highkey locked in</Badge>
        </div>
      </div>
    </section>
  );
}
