import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "john fan",
  description: "full-stack software developer",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
        {modal}
        <Footer />
      </body>
    </html>
  );
}
