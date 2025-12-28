import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/content";

export default function ContactCTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <div className="rounded-2xl border bg-background/40 backdrop-blur p-8 sm:p-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          want to work? feel free to contact me!
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          if you’re a recruiter, builder, or just curious — my inbox is open.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href={`mailto:${PROFILE.email}`}>email me</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
              resume pdf
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
