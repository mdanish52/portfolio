import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "you@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "change-me-now";

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash }
  });
  console.log(`Admin account ready: ${email}`);

  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: "Your Name",
        title: "Software Engineer",
        bio: "I build things for the web. Replace this bio from the admin dashboard once you're logged in.",
        email,
        location: "Lahore, Pakistan",
        resumeUrl: "",
        githubUrl: "https://github.com/yourhandle",
        linkedinUrl: "https://linkedin.com/in/yourhandle",
        twitterUrl: ""
      }
    });
    console.log("Sample profile created.");
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Sample Project One",
          description:
            "A short description of what this project does and the problem it solves. Edit or delete this from the admin dashboard.",
          techStack: "Next.js,TypeScript,Tailwind",
          liveUrl: "",
          repoUrl: "",
          featured: true,
          order: 0
        },
        {
          title: "Sample Project Two",
          description:
            "Another sample project entry so you can see how the grid looks with more than one card.",
          techStack: "Node.js,PostgreSQL,Docker",
          liveUrl: "",
          repoUrl: "",
          featured: false,
          order: 1
        }
      ]
    });
    console.log("Sample projects created.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
