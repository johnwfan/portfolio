import ContactCTA from "@/components/contact-cta";

export const metadata = {
  title: "contact • john fan",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="animate-[fade-up_700ms_ease-out_both]">
        <h1 className="text-4xl font-semibold tracking-tight">contact</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          if you wanna build something, talk about internships, or just say hi — i’m down.
        </p>
      </header>

      <div className="mt-10">
        <ContactCTA />
      </div>
    </main>
  );
}
