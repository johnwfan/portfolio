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

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function TechBadge({ techKey, children }) {
  const hex = BRAND_COLORS[techKey] ?? "#FFFFFF";
  const isWhite = hex.toUpperCase() === "#FFFFFF";

  const bg = isWhite ? "rgba(255,255,255,0.08)" : hexToRgba(hex, 0.14);
  const border = isWhite ? "rgba(255, 255, 255, 0.15)" : hexToRgba(hex, 0.15);

  return (
    <Badge
      variant="secondary"
      className={[
        "relative overflow-hidden rounded-full gap-2.5 px-4 py-2 text-sm",
        "border", 
        "transition-all duration-200",
        "hover:-translate-y-[1px]",
        "hover:shadow-[0_14px_38px_-28px_rgba(0,0,0,0.9)]",
      ].join(" ")}
      style={{
        backgroundColor: bg,
        borderColor: border,
      }}
    >
      {/* subtle top highlight so it feels less flat */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.6,
        }}
      />
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </Badge>
  );
}

function Row({ title, items }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const Icon = ICONS[it.key];
          return (
        <TechBadge key={it.key} techKey={it.key}>

              {Icon ? (
                <Icon
                    size={16}
                    style={{ color: BRAND_COLORS[it.key] ?? "currentColor" }}
                />
                ) : null}
              <span>{it.label}</span>
            </TechBadge>
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
          the stuff i like to build with.
        </p>
      </div>

      <div className="mt-7 grid gap-8 sm:grid-cols-2">
        <Row title="languages" items={STACK.languages} />
        <Row title="tools" items={STACK.tools} />
      </div>
    </section>
  );
}
