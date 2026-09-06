import { Mail, Linkedin, Github, FileDown, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal";
import { PROFILE } from "@/lib/content";

const TILES = [
  {
    key: "email",
    label: "email",
    detail: PROFILE.email,
    icon: Mail,
    href: `mailto:${PROFILE.email}`,
    external: false,
  },
  {
    key: "linkedin",
    label: "linkedin",
    detail: "connect with me",
    icon: Linkedin,
    href: PROFILE.links.linkedin,
    external: true,
  },
  {
    key: "github",
    label: "github",
    detail: "see my code",
    icon: Github,
    href: PROFILE.links.github,
    external: true,
  },
  {
    key: "resume",
    label: "resume",
    detail: "download pdf",
    icon: FileDown,
    href: PROFILE.links.resume,
    external: true,
  },
];

export default function ContactCTA({ showHeading = true }) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      {showHeading ? (
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            let&apos;s connect
          </h2>
          <p className="mt-2 text-muted-foreground">
            always happy to chat about internships, projects, or anything else — pick whatever&apos;s easiest for you.
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.1} className="mt-8 border-t border-border">
        {TILES.map(({ key, label, detail, icon: Icon, href, external }) => (
          <a
            key={key}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="group flex items-center justify-between gap-4 border-b border-border py-5 transition-colors hover:border-b-primary/40"
          >
            <span className="flex items-center gap-4">
              <Icon size={17} className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">
                  {label}
                </span>
                <span className="mt-0.5 block text-foreground">{detail}</span>
              </span>
            </span>
            <ArrowUpRight
              size={16}
              className="shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </a>
        ))}
      </Reveal>
    </section>
  );
}
