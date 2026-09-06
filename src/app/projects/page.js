import WorkArchive from "@/components/work-archive";
import Reveal from "@/components/reveal";

export const metadata = { title: "work • john fan" };

export default function ProjectsPage() {
  return (
    <main>
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-8 sm:pt-20">
        <Reveal as="header">
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
            work
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
            things i&apos;ve shipped, experiments i&apos;ve tried, and a few ideas that got slightly out of hand.
          </p>
        </Reveal>
      </div>

      <WorkArchive />
    </main>
  );
}
