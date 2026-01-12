import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link
    href="/"
    className="group relative font-semibold tracking-tight hover:opacity-95"
    >
    <span className="relative inline-block will-change-transform group-hover:animate-[name-wiggle_450ms_ease-in-out]">
        John Fan
        {/* shine overlay */}
        <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm"
        >
        <span
            aria-hidden
            className="absolute inset-y-0 left-[-120%] w-[120%] bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine-sweep_1100ms_ease-out]"
            />

        </span>
    </span>
    </Link>


        <div className="flex gap-5 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
