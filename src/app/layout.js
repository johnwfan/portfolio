import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: { default: "john fan", template: "%s — john fan" },
  description:
    "i'm john. a computer science student and aspiring software engineer.",
};

// Runs before paint: saved theme (or the OS preference), the sound setting, and
// whether this is the session's first load of "/" (→ data-intro, the corner loader).
// Recruiter links and reduced motion skip the loader.
const prefsScript = `(function(){var d=document.documentElement,t,s;try{t=localStorage.getItem("theme");s=localStorage.getItem("sound")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t;d.dataset.sound=s==="on"?"on":"off";try{if(!sessionStorage.getItem("seen")){sessionStorage.setItem("seen","1");if(location.pathname==="/"&&!/[?&]recruiter=1/.test(location.search)&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.intro="in"}}catch(e){}})()`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-sound="off"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
