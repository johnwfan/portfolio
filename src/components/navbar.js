import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/lib/content";

const LINKS = [
  { href: "/#experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
];

const linkClass =
  "text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline";

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
            <Link key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}
          <a
            href={PROFILE.links.resume}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-1 ${linkClass}`}
          >
            resume <ArrowUpRight size={13} className="text-primary" />
          </a>
        </div>
      </div>
    </nav>
  );
}
