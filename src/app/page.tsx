import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Dock } from "@/components/dock";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="bg-industrial min-h-svh w-full">
      <main className="flex w-full flex-col">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
        <Dock />
      </main>
    </div>
  );
}
