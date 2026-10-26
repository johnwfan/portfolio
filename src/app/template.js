"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { isInitialLoad, useSite } from "@/components/SiteShell";
import styles from "@/components/SiteShell.module.css";

// Remounts on every navigation: the incoming half of the focus pull (also on
// back/forward). The first page of a visit just appears.
export default function Template({ children }) {
  const pathname = usePathname();
  const { leaving } = useSite();
  const [animateIn] = useState(() => !isInitialLoad());
  const className = leaving?.from === pathname ? styles.pageOut : animateIn ? styles.pageIn : "";
  return <div className={className}>{children}</div>;
}
