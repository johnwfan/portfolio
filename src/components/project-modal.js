"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import GlowLink from "@/components/glow-link"; // your shiny link component

export default function ProjectModal({ project }) {
  const router = useRouter();

  function close() {
    router.back(); // back button closes modal (classic pattern) :contentReference[oaicite:3]{index=3}
  }

  useEffect(() => {
    // lock background scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={close}
      >
        <motion.div
          className="absolute right-0 top-0 h-full w-full sm:w-[720px] bg-background/70 backdrop-blur-xl border-l border-white/10"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {project.title}
                </h1>
                {project.overview ? (
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {project.overview}
                  </p>
                ) : null}
              </div>

              <button
                onClick={close}
                className="rounded-full border border-white/10 bg-background/40 p-2 hover:bg-background/60 transition"
                aria-label="close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {(project.stack ?? project.tags ?? []).map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.links?.github ? (
                <GlowLink href={project.links.github} target="_blank" rel="noreferrer">
                  github ↗
                </GlowLink>
              ) : null}

              {project.links?.live ? (
                <GlowLink href={project.links.live} target="_blank" rel="noreferrer">
                  live demo ↗
                </GlowLink>
              ) : null}
            </div>

            {project.image ? (
              <div className="mt-8 overflow-hidden rounded-2xl border bg-muted/20">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full object-cover"
                  draggable={false}
                />
              </div>
            ) : null}

            {project.bullets?.length ? (
              <div className="mt-8">
                <h2 className="text-lg font-semibold tracking-tight">highlights</h2>
                <ul className="mt-3 list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                  {project.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
