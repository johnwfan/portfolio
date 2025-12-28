import { Badge } from "@/components/ui/badge";
import { STACK } from "@/lib/content";

import {
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiVercel,
  SiGit,
  SiGithub,
  SiPostgresql,
  SiHtml5,
  SiCss3,
  SiMongodb,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";
import { TbLetterC, TbBrandCpp } from "react-icons/tb";
import { Database } from "lucide-react";

const ICONS = {
  // languages
  javascript: SiJavascript,
  python: SiPython,
  java: FaJava,
  c: TbLetterC,
  cpp: TbBrandCpp,
  html: SiHtml5,
  css: SiCss3,
  postgresql: SiPostgresql,
  sql: Database,

  // tools
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  vercel: SiVercel,
  git: SiGit,
  github: SiGithub,
};

const BRAND_COLORS = {
  // languages
  javascript: "#F7DF1E",
  python: "#3776AB",
  java: "#E11D48",
  c: "#A8B9CC",
  cpp: "#00599C",
  html: "#E34F26",
  css: "#1572B6",
  postgresql: "#4169E1",
  sql: "#8B5CF6",

  // tools
  nextjs: "#FFFFFF",   // looks good on dark theme
  react: "#61DAFB",
  tailwind: "#06B6D4",
  nodejs: "#339933",
  mongodb: "#47A248",
  vercel: "#FFFFFF",
  git: "#F05032",
  github: "#FFFFFF",
};


function Row({ title, items }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const Icon = ICONS[it.key];
          return (
            <Badge
              key={it.key}
              variant="secondary"
              className="rounded-full gap-2.5 px-4 py-2 text-sm"
            >
              {Icon ? (
                <Icon
                    size={16}
                    style={{ color: BRAND_COLORS[it.key] ?? "currentColor" }}
                />
                ) : null}
              <span>{it.label}</span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="animate-[fade-up_700ms_ease-out_both]">
        <h2 className="text-2xl font-semibold tracking-tight">tech i actually use</h2>
        <p className="mt-2 text-muted-foreground">
          no buzzword soup — just the stuff i build with.
        </p>
      </div>

      <div className="mt-7 grid gap-8 sm:grid-cols-2">
        <Row title="languages" items={STACK.languages} />
        <Row title="tools" items={STACK.tools} />
      </div>
    </section>
  );
}
