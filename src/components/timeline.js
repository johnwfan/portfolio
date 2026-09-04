import Reveal from "@/components/reveal";
import { TIMELINE } from "@/lib/content";

export default function Timeline() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          timeline
        </h2>
        {/* [TIMELINE SUBHEAD — JOHN TO WRITE]: 1 short line. */}
        <p className="mt-2 text-muted-foreground">[TIMELINE SUBHEAD — JOHN TO WRITE]</p>
      </Reveal>

      <div className="mt-8 space-y-6 border-l border-border pl-6">
        {TIMELINE.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.06} className="relative">
            <div className="absolute -left-[29px] top-1.5 size-3.5 rounded-full border-2 border-primary bg-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-semibold tracking-tight">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.subtitle}</p>
              </div>
              <p className="text-sm text-muted-foreground">{e.time}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
