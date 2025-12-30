import { PROFILE } from "@/lib/content";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © John Fan 2025
        </p>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a className="hover:text-foreground transition-colors" href={PROFILE.links.github} target="_blank" rel="noreferrer" aria-label="github">
            <Github size={18} />
          </a>
          <a className="hover:text-foreground transition-colors" href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" aria-label="linkedin">
            <Linkedin size={18} />
          </a>
          <a className="hover:text-foreground transition-colors" href={`mailto:${PROFILE.email}`} aria-label="email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
