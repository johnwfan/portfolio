import Hero from "@/components/hero";
import TechStack from "@/components/tech-stack";
import Timeline from "@/components/timeline";
import FeaturedProjects from "@/components/featured-projects";
import ContactCTA from "@/components/contact-cta";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main>
      <Hero />
      <Separator />
      <TechStack />
      <Separator />
      <FeaturedProjects />
      <Separator />
      <ContactCTA />
    </main>
  );
}
