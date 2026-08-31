// app/page.tsx
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, projects] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] })
  ]);

  const name = profile?.name ?? "Your Name";

  // Parse the comma-separated skills string from the profile
  const skills = (profile?.skills ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="relative">
      <Navbar name={name} />
      <main className="relative">
        <Hero
          name={name}
          title={profile?.title ?? "Software Engineer"}
          location={profile?.location}
          resumeUrl={profile?.resumeUrl}
        />
        <Stats />
        <About
          bio={profile?.bio ?? "Add your bio from the admin dashboard."}
          location={profile?.location}
          skills={skills}
        />
        <Projects projects={projects} />
        <Process />
        <Contact
          email={profile?.email ?? "you@example.com"}
          githubUrl={profile?.githubUrl}
          linkedinUrl={profile?.linkedinUrl}
          twitterUrl={profile?.twitterUrl}
        />
      </main>
      <Footer name={name} />
    </div>
  );
}