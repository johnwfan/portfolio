"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProjectCaseStudy from "@/components/project-case-study";

export default function ProjectModal({ project }) {
  const router = useRouter();

  function close() {
    router.back();
  }

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => e.key === "Escape" && close();
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
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="text-sm text-muted-foreground">case study</div>
              <button
                onClick={close}
                className="rounded-full border border-white/10 bg-background/40 p-2 hover:bg-background/60 transition"
                aria-label="close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ProjectCaseStudy project={project} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
