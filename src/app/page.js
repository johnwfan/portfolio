import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Hero from "@/components/hero";
import FeaturedProjects from "@/components/featured-projects";
import ContactCTA from "@/components/contact-cta";
import Reveal from "@/components/reveal";
import { TechIconStrip } from "@/components/tech-stack";
import { PROFILE } from "@/lib/content";

const TEASER_TOOLS = ["nextjs", "react", "tailwind", "python", "mongodb", "nodejs"];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-3xl px-6 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {PROFILE.aboutTeaser}{" "}
            <Link href="/about" className="font-medium text-foreground underline underline-offset-4">
              more about me →
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <TechIconStrip keys={TEASER_TOOLS} />
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
          <ArrowDown size={13} className="animate-bounce" />
          scroll to see more
        </Reveal>
      </section>

      <FeaturedProjects />
      <ContactCTA />
    </main>
  );
}
