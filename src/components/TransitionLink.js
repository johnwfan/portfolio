"use client";

import Link from "next/link";
import { useSite } from "./SiteShell";

// next/link that plays the focus-pull transition (UPDATE §2). New-tab clicks,
// modified clicks and links with a target behave like normal links.
export default function TransitionLink({ href, onClick, target, ...rest }) {
  const { navigate } = useSite();
  return (
    <Link
      href={href}
      target={target}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || target || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
