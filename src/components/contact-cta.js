import { Mail, Linkedin, Github, FileDown } from "lucide-react";
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
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      {showHeading ? (
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            let&apos;s connect
          </h2>
          <p className="mt-2 text-muted-foreground">
            always happy to chat about internships, projects, or anything else — pick whatever&apos;s easiest for you.
          </p>
        </Reveal>
      ) : null}

      <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map(({ key, label, detail, icon: Icon, href, external }) => (
          <a
            key={key}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="group flex flex-col gap-3 rounded-xl border border-border p-5 transition-colors hover:border-primary/40 hover:bg-secondary/50"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon size={17} />
            </span>
            <span>
              <span className="block font-medium">{label}</span>
              <span className="block text-sm text-muted-foreground">{detail}</span>
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
