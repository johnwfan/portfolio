import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/content";

export default function ContactCTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <div className="group relative overflow-hidden rounded-2xl border bg-background/40 backdrop-blur">
        {/* soft glow behind */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70"
          style={{
            background:
              "radial-gradient(600px circle at 20% 20%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(700px circle at 80% 60%, rgba(99,102,241,0.14), transparent 60%)",
          }}
        />

        {/* animated shine sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div
            className="absolute inset-y-0 left-[-60%] w-[60%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              transform: "skewX(-18deg)",
              animation: "contact-shine 1400ms ease-out",
            }}
          />
        </div>

        {/* crisp gradient border */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            padding: 1,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.22), rgba(99,102,241,0.28), rgba(255,255,255,0.18))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Want to work? Feel free to contact me!
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            If you’re a recruiter, builder, or just curious — my inbox is open.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={`mailto:${PROFILE.email}`}>Email me</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
                My Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
