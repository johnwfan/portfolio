import { PROFILE } from "@/lib/content";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © john fan {new Date().getFullYear()}
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
        <p className="mt-2 text-xs text-muted-foreground/60">
          built on approximately zero sleep, some music, and a few dreams.
        </p>
      </div>
    </footer>
  );
}
