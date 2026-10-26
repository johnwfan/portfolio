import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

// Runs before paint: saved theme (or the OS preference) and the sound setting.
const prefsScript = `(function(){var d=document.documentElement,t,s;try{t=localStorage.getItem("theme");s=localStorage.getItem("sound")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t;d.dataset.sound=s==="on"?"on":"off"})()`;

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
      <body>{children}</body>
    </html>
  );
}
