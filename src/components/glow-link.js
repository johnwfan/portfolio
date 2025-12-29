import { cn } from "@/lib/utils";

export default function GlowLink({ href, children, className, ...props }) {
  return (
    <a
      href={href}
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
        "border border-white/10 text-white",
        "overflow-hidden select-none",
        "bg-gradient-to-b from-white/10 via-white/5 to-transparent",
        "transition-all duration-200",
        "hover:-translate-y-[1px] hover:border-white/20",
        "hover:bg-gradient-to-b hover:from-white/14 hover:via-white/8 hover:to-transparent",
        "active:translate-y-0",
        className
      )}
    >
      {/* github-ish accent glow (subtle but visible) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(700px circle at 20% 20%, rgba(124,58,237,0.18), transparent 55%), radial-gradient(700px circle at 90% 70%, rgba(59,130,246,0.14), transparent 55%)",
        }}
      />

      {/* shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
      >
        <span className="absolute inset-y-[-20%] left-[-70%] w-[55%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[btn-shine_900ms_ease-out]" />
      </span>

      {/* tiny sparkle dot */}
      <span
        aria-hidden
        className="h-2 w-2 rounded-full bg-white/40 opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:bg-white/70"
      />

      <span className="relative">{children}</span>

      {/* subtle outer ring on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.12), 0 16px 40px -22px rgba(99,102,241,0.55)",
        }}
      />
    </a>
  );
}
