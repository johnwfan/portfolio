import { TIMELINE } from "@/lib/content";

export default function Timeline() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="animate-[fade-up_700ms_ease-out_both]">
        <h2 className="text-2xl font-semibold tracking-tight">timeline</h2>
        <p className="mt-2 text-muted-foreground">
          a quick “where i’ve been” without making you scroll forever.
        </p>
      </div>

      <div className="mt-8 space-y-6 border-l pl-6">
        {TIMELINE.map((e) => (
          <div key={e.title} className="relative">
            <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border bg-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-semibold tracking-tight">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.subtitle}</p>
              </div>
              <p className="text-sm text-muted-foreground">{e.time}</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {e.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
