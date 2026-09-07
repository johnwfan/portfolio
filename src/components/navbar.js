import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/lib/content";
import { ACCENT } from "@/lib/accent";

const LINKS = [
  { href: "/#experience", label: "experience", accent: "green" },
  { href: "/projects", label: "projects", accent: "blue" },
  { href: "/about", label: "about", accent: "yellow" },
];

const sectionLinkClass =
  "relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 motion-reduce:after:transition-none hover:after:scale-x-100";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[900px] flex-wrap items-baseline justify-between gap-x-6 gap-y-3 px-6 py-6">
        <Link href="/" className="group font-display text-base font-semibold tracking-tight">
          <span className="inline-block will-change-transform group-hover:animate-[name-wiggle_450ms_ease-in-out] group-focus-visible:animate-[name-wiggle_450ms_ease-in-out]">
            john fan
          </span>
        </Link>

        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${sectionLinkClass} ${ACCENT[l.accent].afterBg}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1 ${sectionLinkClass} ${ACCENT.blue.afterBg}`}
          >
            resume <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </nav>
  );
}
