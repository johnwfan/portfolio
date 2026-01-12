export const metadata = {
  title: "about • john fan",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <header className="overflow-hidden">
        <h1 className="text-4xl font-semibold tracking-tight">
          <span className="inline-block animate-[fade-up_700ms_ease-out_both]">
            About
          </span>
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          <span className="inline-block animate-[fade-up_850ms_ease-out_both]">
            This is where I get to talk about me!
          </span>
        </p>
      </header>

      <section className="mt-10 rounded-2xl border bg-background/40 backdrop-blur p-8 sm:p-10">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p className="animate-[fade-up_950ms_ease-out_both]">
            {/* you write this */}
            Hi I’m John Fan! I'm a CS student at Rice from the Houston area. 
            I’m really into full-stack development, especially the part where an idea goes from “this would be cool” to an actual app people can click around in. 
            I like building clean frontends, wiring up backend apis, and designing strong, scalable databases.
            I’m also obsessed with polishing the little details: smooth ui, good structure, clear naming, and making everything feel fast and intentional.
          </p>

          <p className="animate-[fade-up_1100ms_ease-out_both]">
            When I’m not building, I’m usually practicing leetcode to sharpen fundamentals and problem-solving (and to keep myself honest lol). 
          </p>

          <p className="animate-[fade-up_1250ms_ease-out_both]">
            Outside of coding, I love to play video games. I love games for the strategy, the storytelling, and how creativity and technology can shine.
            I’m also really into video editing and photography as a hobby, and I like that it scratches the same creative and detail-oriented itch as building software.
          </p>
        </div>
      </section>
    </main>
  );
}
