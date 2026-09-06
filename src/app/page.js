import Link from "next/link";
import Entrance from "@/components/entrance";
import WorkIndex from "@/components/work-index";
import ContactCTA from "@/components/contact-cta";
import Reveal from "@/components/reveal";
import { PROFILE } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <Entrance />
      <WorkIndex />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {PROFILE.aboutTeaser}{" "}
              <Link href="/about" className="font-medium text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition-colors hover:decoration-primary">
                more about me →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
