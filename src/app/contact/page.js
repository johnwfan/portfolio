import Reveal from "@/components/reveal";
import ContactCTA from "@/components/contact-cta";

export const metadata = {
  title: "contact • john fan",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Reveal as="header">
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
          contact
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          feel free to contact me via email, linkedin, github, or resume download — whatever&apos;s easiest for you!
        </p>
      </Reveal>

      <div className="mt-4">
        <ContactCTA showHeading={false} />
      </div>
    </main>
  );
}
