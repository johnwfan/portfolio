"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCaseStudy from "@/components/project-case-study";

export default function ProjectPreviewModal({ open, project, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/45 backdrop-blur-md backdrop-saturate-150"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            // only close if you clicked the backdrop itself
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="absolute left-1/2 top-1/2 w-[min(92vw,860px)] max-h-[85vh]
                       -translate-x-1/2 -translate-y-1/2 overflow-hidden
                       rounded-3xl border border-white/10 bg-background/80 shadow-2xl"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 35, mass: 0.7 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4">
              <div className="text-sm text-muted-foreground">case study preview</div>
              <button
                onClick={onClose}
                className="rounded-full border border-white/10 bg-background/60 p-2 hover:bg-background/80 transition"
                aria-label="close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[calc(85vh-57px)] overflow-y-auto p-6">
              <ProjectCaseStudy project={project} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
