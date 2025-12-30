import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "john fan",
  description: "full-stack software developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
                <style>{`
          #screen-wipe {
            position: fixed;
            inset: 0;
            background: #000;
            z-index: 9999;
            pointer-events: none;

            transform: translateY(0);
            animation: wipeUp 0.8s ease-in-out forwards;
          }

          @keyframes wipeUp {
            from { transform: translateY(0); }
            to   { transform: translateY(-100%); }
          }

          @media (prefers-reduced-motion: reduce) {
            #screen-wipe { animation: none; display: none; }
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div id="screen-wipe" aria-hidden/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

