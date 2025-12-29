export const metadata = {
  title: "about • john fan",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <header className="overflow-hidden">
        <h1 className="text-4xl font-semibold tracking-tight">
          <span className="inline-block animate-[fade-up_700ms_ease-out_both]">
            about
          </span>
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          <span className="inline-block animate-[fade-up_850ms_ease-out_both]">
            this is where i explain the “me” part. (you can totally judge my taste in projects here.)
          </span>
        </p>
      </header>

      <section className="mt-10 rounded-2xl border bg-background/40 backdrop-blur p-8 sm:p-10">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p className="animate-[fade-up_950ms_ease-out_both]">
            {/* you write this */}
            write your about me here. keep it personal + specific. talk about what you build, why you build, and what you’re curious about.
          </p>

          <p className="animate-[fade-up_1100ms_ease-out_both]">
            {/* you write this */}
            add another paragraph here. you can also add a few bullet points, fun facts, or “currently” stuff.
          </p>
        </div>
      </section>
    </main>
  );
}
