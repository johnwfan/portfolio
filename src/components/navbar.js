"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PROFILE } from "@/lib/content";
import { STAGE_TIMES, isEntrancePending } from "@/lib/entrance";

const LINKS = [
  { href: "/projects", label: "work" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

function isActive(pathname, href) {
  return pathname.startsWith(href);
}

function NavLinks({ pathname }) {
  const containerRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState(null);

  // Both setIndicator calls sync React state with measured DOM layout via
  // ResizeObserver — an external system, not a derived-state anti-pattern.
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeHref = LINKS.find((l) => isActive(pathname, l.href))?.href;
    const el = activeHref ? linkRefs.current[activeHref] : null;

    if (!container || !el) {
      setIndicator(null);
      return;
    }

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
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div ref={containerRef} className="relative hidden items-center gap-7 md:flex">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          ref={(node) => {
            linkRefs.current[l.href] = node;
          }}
          href={l.href}
          className="relative px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
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

  // Independent of the homepage entrance coordinator (this lives in the root
  // layout, rendered on every route) — it only needs to know once, at mount,
  // whether an entrance is about to play on this load, so its own fade-in can
  // wait until the entrance's settle stage instead of appearing mid-overlay.
  const [navReady, setNavReady] = useState(true);
  // setNavReady here synchronizes React state with the same external
  // data-intro DOM attribute referenced above — not the derived-state
  // anti-pattern the rule targets.
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    if (!isEntrancePending()) return;
    setNavReady(false);
    const id = setTimeout(() => setNavReady(true), STAGE_TIMES.settle);
    return () => clearTimeout(id);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <motion.nav
      initial={false}
      animate={{ opacity: navReady ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group relative w-fit font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="inline-block will-change-transform group-hover:animate-[name-wiggle_450ms_ease-in-out] group-focus-visible:animate-[name-wiggle_450ms_ease-in-out]">
            john fan
          </span>
        </Link>

        <NavLinks pathname={pathname} />

        <a
          href={PROFILE.links.resume}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
        >
          resume <ArrowUpRight size={13} />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "close menu" : "open menu"}
          aria-expanded={open}
          className="flex size-9 items-center justify-center rounded-full text-foreground md:hidden"
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
                  className="rounded-md px-2 py-2.5 text-sm text-foreground data-[active=true]:text-primary"
                  data-active={isActive(pathname, l.href)}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={PROFILE.links.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-1 rounded-md border-t border-white/40 px-2 py-2.5 pt-4 text-sm text-foreground"
              >
                resume <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
