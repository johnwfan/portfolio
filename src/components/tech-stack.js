"use client";

import Reveal from "@/components/reveal";
import { STACK } from "@/lib/content";

import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiVercel,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDocker,
  SiAmazonwebservices,
  SiLinux,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";
import { TbLetterC, TbBrandCpp } from "react-icons/tb";
import { Database, TestTube2 } from "lucide-react";

export const TECH_ICONS = {
  // languages
  javascript: SiJavascript,
  typescript: SiTypescript,
  python: SiPython,
  java: FaJava,
  c: TbLetterC,
  cpp: TbBrandCpp,
  sql: Database,

  // tools
  nextjs: SiNextdotjs,
  react: SiReact,
  nodejs: SiNodedotjs,
  express: SiExpress,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  prisma: SiPrisma,
  docker: SiDocker,
  aws: SiAmazonwebservices,
  vercel: SiVercel,
  git: SiGit,
  github: SiGithub,
  githubactions: SiGithubactions,
  linux: SiLinux,
  playwright: TestTube2,
};

export const TECH_COLORS = {
  // languages
  javascript: "#CA8A04",
  typescript: "#3178C6",
  python: "#3776AB",
  java: "#E11D48",
  c: "#5B6B79",
  cpp: "#00599C",
  sql: "#7C3AED",

  // tools
  nextjs: "#0A0A0A",
  react: "#149ECA",
  nodejs: "#3C873A",
  express: "#3C3C3C",
  tailwind: "#0891B2",
  postgresql: "#336791",
  mongodb: "#3FA037",
  prisma: "#2D3748",
  docker: "#2496ED",
  aws: "#E8821A",
  vercel: "#0A0A0A",
  git: "#F05032",
  github: "#0A0A0A",
  githubactions: "#2088FF",
  linux: "#B79E1E",
  playwright: "#2EAD33",
};

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function TechTile({ techKey, label }) {
  const Icon = TECH_ICONS[techKey];
  const color = TECH_COLORS[techKey] ?? "#0A0A0A";

  return (
    <div
      className="group flex aspect-square flex-col items-center justify-center gap-2.5 rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: hexToRgba(color, 0.07),
        borderColor: hexToRgba(color, 0.22),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 28px -14px ${hexToRgba(color, 0.55)}`;
        e.currentTarget.style.borderColor = hexToRgba(color, 0.45);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = hexToRgba(color, 0.22);
      }}
    >
      {Icon ? <Icon size={36} style={{ color }} /> : null}
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

function TechGrid({ title, items }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {items.map((it, i) => (
          <Reveal key={it.key} delay={i * 0.04}>
            <TechTile techKey={it.key} label={it.label} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function TechIconStrip({ keys = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {keys.map((key) => {
        const Icon = TECH_ICONS[key];
        if (!Icon) return null;
        return (
          <span
            key={key}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary"
            title={key}
          >
            <Icon size={16} style={{ color: TECH_COLORS[key] }} />
          </span>
        );
      })}
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          tech stack
        </h2>
        <p className="mt-2 text-muted-foreground">
          the languages and tools i build with most often.
        </p>
      </Reveal>

      <div className="mt-8 space-y-10">
        <TechGrid title="languages" items={STACK.languages} />
        <TechGrid title="tools" items={STACK.tools} />
      </div>
    </section>
  );
}
