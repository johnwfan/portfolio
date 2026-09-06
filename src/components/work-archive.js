import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/content";

function findProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

function Meta({ project }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {project.title}
      </h3>
      <span className="shrink-0 text-xs text-muted-foreground">
        {project.year}
      </span>
    </div>
  );
}

function OpenLink() {
  return (
    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-primary">
      open project <ArrowUpRight size={13} />
    </span>
  );
}

function Frame({ project, className = "" }) {
  return (
    <div className={`overflow-hidden border border-border transition-colors group-hover:border-primary/40 ${className}`}>
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className="h-auto w-full"
        draggable={false}
      />
    </div>
  );
}

/* Scuttle: widest real aspect ratio (2.1:1) and the flagship — gets the
   fullest width, text stacked above a full-width image. */
function ScuttleEntry() {
  const project = findProject("scuttle");
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Meta project={project} />
        <p className="mt-3 max-w-md text-muted-foreground leading-relaxed">{project.teaser}</p>
        <Frame project={project} className="mt-8" />
        <OpenLink />
      </div>
    </Link>
  );
}

/* StudioFlow: contained, image-right and larger than the text column —
   calmer, inset composition. */
function StudioFlowEntry() {
  const project = findProject("studioflow");
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 sm:grid-cols-5 sm:items-center sm:gap-10">
          <div className="order-2 sm:order-1 sm:col-span-2">
            <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{project.teaser}</p>
            <span className="mt-3 block text-xs text-muted-foreground">
              {project.year}
            </span>
            <OpenLink />
          </div>
          <Frame project={project} className="order-1 sm:order-2 sm:col-span-3" />
        </div>
      </div>
    </Link>
  );
}

/* Outfit Picker: the real screenshot is near-square (1:1), so it's the one
   entry that's deliberately smaller and offset rather than stretched to
   match the others — its actual shape is the variety, not an invented theme. */
function OutfitPickerEntry() {
  const project = findProject("outfit-picker");
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="sm:max-w-sm">
          <Meta project={project} />
          <p className="mt-3 text-muted-foreground leading-relaxed">{project.teaser}</p>
        </div>
        <Frame project={project} className="mt-8 ml-auto max-w-[22rem] sm:max-w-sm" />
        <div className="ml-auto max-w-[22rem] sm:max-w-sm">
          <OpenLink />
        </div>
      </div>
    </Link>
  );
}

/* Storm: wide again like Scuttle, but arranged as the mirror of StudioFlow
   (image-left this time) so the two similarly-shaped screenshots don't read
   as a repeated left/right template. */
function StormEntry() {
  const project = findProject("storm");
  return (
    <Link href={`/projects/${project.slug}`} className="group block border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 sm:grid-cols-5 sm:items-center sm:gap-10">
          <Frame project={project} className="order-1 sm:col-span-3" />
          <div className="order-2 sm:col-span-2">
            <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{project.teaser}</p>
            <span className="mt-3 block text-xs text-muted-foreground">
              {project.year}
            </span>
            <OpenLink />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function WorkArchive() {
  return (
    <div>
      <ScuttleEntry />
      <StudioFlowEntry />
      <OutfitPickerEntry />
      <StormEntry />
    </div>
  );
}
