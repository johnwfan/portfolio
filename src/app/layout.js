import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "john fan",
  description: "full-stack software developer",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        {/* Runs before hydration (next/script beforeInteractive). Decides, once,
            whether the homepage entrance should play this load: first visit to
            "/" this session, motion allowed. Sets an attribute on <html> that
            globals.css keys off of — pure CSS, so the decision is visible at
            the very first paint, before any React code runs. Keep the literal
            "john-intro-seen" key in sync with INTRO_SESSION_KEY in
            src/lib/entrance.js — this script runs before that module loads. */}
        <Script id="entrance-gate" strategy="beforeInteractive">
          {`(function(){try{if(window.location.pathname==="/"){var seen=sessionStorage.getItem("john-intro-seen");var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!seen&&!reduced){document.documentElement.setAttribute("data-intro","pending");}}}catch(e){}})();`}
        </Script>
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

