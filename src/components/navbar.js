"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { PROFILE } from "@/lib/content";

const LINKS = [
  { href: "/", label: "home" },
  { href: "/projects", label: "my work" },
  { href: "/contact", label: "contact" },
  { href: "/about", label: "about" },
];

const ICON_LINKS = [
  { href: PROFILE.links.linkedin, label: "linkedin", icon: Linkedin, external: true },
  { href: PROFILE.links.github, label: "github", icon: Github, external: true },
  { href: `mailto:${PROFILE.email}`, label: "email", icon: Mail, external: false },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function NavLinks({ pathname }) {
  const containerRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeHref = LINKS.find((l) => isActive(pathname, l.href))?.href;
    const el = activeHref ? linkRefs.current[activeHref] : null;

    if (!container || !el) return;

    const measure = () => {
      // Offsets are relative to the row itself, not the viewport, so page
      // scroll position can never factor into where the indicator sits.
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div ref={containerRef} className="relative hidden items-center gap-6 justify-self-center md:flex">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          ref={(node) => {
            linkRefs.current[l.href] = node;
          }}
          href={l.href}
          className="relative px-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
          data-active={isActive(pathname, l.href)}
        >
          {l.label}
        </Link>
      ))}
      {indicator && (
        <motion.span
          initial={false}
          animate={{ x: indicator.left, width: indicator.width }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="pointer-events-none absolute -bottom-px left-0 h-[2px] rounded-full bg-primary"
        />
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
        <Link
          href="/"
          className="group relative w-fit justify-self-start font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block will-change-transform group-hover:animate-[name-wiggle_450ms_ease-in-out]">
            john fan
          </span>
        </Link>

        <NavLinks pathname={pathname} />

        <div className="hidden items-center gap-1 justify-self-end md:flex">
          {ICON_LINKS.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={label}
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          className="flex size-9 items-center justify-center justify-self-end rounded-full text-foreground md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/40 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2.5 text-base font-medium text-foreground data-[active=true]:text-primary"
                  data-active={isActive(pathname, l.href)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                {ICON_LINKS.map(({ href, label, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
