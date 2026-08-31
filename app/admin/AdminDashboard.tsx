// app/admin/AdminDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import type { Experience, Education, Skill } from "@/lib/types";

type Profile = {
  id?: string;
  name: string;
  title: string;
  bio: string;
  skills: string;
  email: string;
  location?: string | null;
  resumeUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
};

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
  order: number;
};

const emptyProject = {
  title: "",
  description: "",
  techStack: "",
  imageUrl: "",
  videoUrl: "",
  liveUrl: "",
  repoUrl: "",
  featured: false,
  order: 0
};

const emptyExperience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
  order: 0
};

const emptyEducation = {
  school: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: "",
  order: 0
};

const emptySkill = {
  name: "",
  category: "",
  order: 0
};

export default function AdminDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [newProject, setNewProject] = useState(emptyProject);
  const [newExperience, setNewExperience] = useState(emptyExperience);
  const [newEducation, setNewEducation] = useState(emptyEducation);
  const [newSkill, setNewSkill] = useState(emptySkill);

  const [savingProfile, setSavingProfile] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then(setProfile);
    fetch("/api/projects").then((r) => r.json()).then(setProjects);
    fetch("/api/experience").then((r) => r.json()).then(setExperience);
    fetch("/api/education").then((r) => r.json()).then(setEducation);
    fetch("/api/skills").then((r) => r.json()).then(setSkills);
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSavingProfile(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    setSavingProfile(false);
    setStatus(res.ok ? "Profile saved." : "Failed to save profile.");
    setTimeout(() => setStatus(""), 2500);
  }

  // --- Projects ---
  async function addProject(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject)
    });
    if (res.ok) {
      const created = await res.json();
      setProjects((prev) => [...prev, created]);
      setNewProject(emptyProject);
    }
  }

  async function updateProject(project: Project) {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    });
    if (res.ok) {
      const updated = await res.json();
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  // --- Experience ---
  async function addExperience(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExperience)
    });
    if (res.ok) {
      const created = await res.json();
      setExperience((prev) => [...prev, created]);
      setNewExperience(emptyExperience);
    }
  }

  async function updateExperience(exp: Experience) {
    const res = await fetch(`/api/experience/${exp.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exp)
    });
    if (res.ok) {
      const updated = await res.json();
      setExperience((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    }
  }

  async function deleteExperience(id: string) {
    if (!confirm("Delete this experience entry?")) return;
    const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
    if (res.ok) setExperience((prev) => prev.filter((x) => x.id !== id));
  }

  // --- Education ---
  async function addEducation(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEducation)
    });
    if (res.ok) {
      const created = await res.json();
      setEducation((prev) => [...prev, created]);
      setNewEducation(emptyEducation);
    }
  }

  async function updateEducation(edu: Education) {
    const res = await fetch(`/api/education/${edu.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edu)
    });
    if (res.ok) {
      const updated = await res.json();
      setEducation((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    }
  }

  async function deleteEducation(id: string) {
    if (!confirm("Delete this education entry?")) return;
    const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
    if (res.ok) setEducation((prev) => prev.filter((x) => x.id !== id));
  }

  // --- Skills ---
  async function addSkill(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSkill)
    });
    if (res.ok) {
      const created = await res.json();
      setSkills((prev) => [...prev, created]);
      setNewSkill(emptySkill);
    }
  }

  async function updateSkill(skill: Skill) {
    const res = await fetch(`/api/skills/${skill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill)
    });
    if (res.ok) {
      const updated = await res.json();
      setSkills((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    }
  }

  async function deleteSkill(id: string) {
    if (!confirm("Delete this skill?")) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (res.ok) setSkills((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div className="min-h-screen bg-canvas px-6 py-10 text-inkText md:px-16">
      <header className="mb-10 flex items-center justify-between border-b border-hairline pb-6">
        <p className="flex items-center gap-2 font-mono text-sm text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          $ admin --dashboard
        </p>
        <div className="flex gap-6 font-mono text-xs text-muted">
          <a href="/" className="transition-colors hover:text-accent">view site</a>
          <a href="/resume" className="transition-colors hover:text-accent">view resume</a>
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="transition-colors hover:text-accent">
            sign out
          </button>
        </div>
      </header>

      {status && (
        <p className="mb-6 inline-flex items-center gap-2 border border-hairline bg-canvasSoft px-3 py-1.5 font-mono text-xs text-accent">
          <span className="h-1 w-1 rounded-full bg-accent" />
          {status}
        </p>
      )}

      {/* Profile */}
      <section className="mb-16 max-w-2xl">
        <p className="mb-2 font-mono text-xs tracking-wide text-accent">01 — PROFILE</p>
        <h2 className="mb-6 font-display text-2xl text-inkText">Your details</h2>
        {profile ? (
          <form onSubmit={saveProfile} className="flex flex-col gap-4 border border-hairline bg-canvasSoft p-6">
            <Field label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
            <Field label="Title" value={profile.title} onChange={(v) => setProfile({ ...profile, title: v })} />
            <TextArea label="Bio" value={profile.bio} onChange={(v) => setProfile({ ...profile, bio: v })} />
            <Field
              label="Skills (comma-separated, e.g. Next.js, TypeScript, Tailwind)"
              value={profile.skills}
              onChange={(v) => setProfile({ ...profile, skills: v })}
            />
            <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
            <Field label="Location" value={profile.location ?? ""} onChange={(v) => setProfile({ ...profile, location: v })} />
            <Field label="Resume URL" value={profile.resumeUrl ?? ""} onChange={(v) => setProfile({ ...profile, resumeUrl: v })} />
            <Field label="GitHub URL" value={profile.githubUrl ?? ""} onChange={(v) => setProfile({ ...profile, githubUrl: v })} />
            <Field label="LinkedIn URL" value={profile.linkedinUrl ?? ""} onChange={(v) => setProfile({ ...profile, linkedinUrl: v })} />
            <Field label="Twitter URL" value={profile.twitterUrl ?? ""} onChange={(v) => setProfile({ ...profile, twitterUrl: v })} />
            <button
              type="submit"
              disabled={savingProfile}
              className="group relative mt-2 w-fit overflow-hidden border border-accent bg-accent px-5 py-2.5 font-mono text-xs tracking-wide text-canvas transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <span className="relative z-10">{savingProfile ? "saving…" : "save profile"}</span>
              {!savingProfile && (
                <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
              )}
            </button>
          </form>
        ) : (
          <p className="font-mono text-xs text-muted">Loading…</p>
        )}
      </section>

      {/* Projects */}
      <section className="mb-16 max-w-3xl">
        <p className="mb-2 font-mono text-xs tracking-wide text-accent">02 — PROJECTS</p>
        <h2 className="mb-6 font-display text-2xl text-inkText">Your work</h2>

        <div className="mb-8 flex flex-col gap-4">
          {projects.length === 0 && <p className="font-mono text-xs text-muted">No projects yet — add one below.</p>}
          {projects.map((project) => (
            <ProjectEditor key={project.id} project={project} onSave={updateProject} onDelete={() => deleteProject(project.id)} />
          ))}
        </div>

        <form onSubmit={addProject} className="relative flex flex-col gap-4 border border-dashed border-hairline p-6">
          <CornerMarks />
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">+ add project</p>
          <Field label="Title" value={newProject.title} onChange={(v) => setNewProject({ ...newProject, title: v })} />
          <TextArea label="Description" value={newProject.description} onChange={(v) => setNewProject({ ...newProject, description: v })} />
          <Field label="Tech stack (comma-separated)" value={newProject.techStack} onChange={(v) => setNewProject({ ...newProject, techStack: v })} />
          <Field label="Image URL" value={newProject.imageUrl} onChange={(v) => setNewProject({ ...newProject, imageUrl: v })} />
          <Field label="Video URL" value={newProject.videoUrl} onChange={(v) => setNewProject({ ...newProject, videoUrl: v })} />
          <Field label="Live URL" value={newProject.liveUrl} onChange={(v) => setNewProject({ ...newProject, liveUrl: v })} />
          <Field label="Repo URL" value={newProject.repoUrl} onChange={(v) => setNewProject({ ...newProject, repoUrl: v })} />
          <label className="flex items-center gap-2 font-mono text-xs text-muted">
            <input type="checkbox" checked={newProject.featured} onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })} className="accent-accent" />
            featured
          </label>
          <SubmitButton label="add project" />
        </form>
      </section>

      {/* Experience */}
      <section className="mb-16 max-w-3xl">
        <p className="mb-2 font-mono text-xs tracking-wide text-accent">03 — EXPERIENCE</p>
        <h2 className="mb-6 font-display text-2xl text-inkText">Work history</h2>

        <div className="mb-8 flex flex-col gap-4">
          {experience.length === 0 && <p className="font-mono text-xs text-muted">No experience yet — add one below.</p>}
          {experience.map((exp) => (
            <ExperienceEditor key={exp.id} experience={exp} onSave={updateExperience} onDelete={() => deleteExperience(exp.id)} />
          ))}
        </div>

        <form onSubmit={addExperience} className="relative flex flex-col gap-4 border border-dashed border-hairline p-6">
          <CornerMarks />
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">+ add experience</p>
          <Field label="Company" value={newExperience.company} onChange={(v) => setNewExperience({ ...newExperience, company: v })} />
          <Field label="Role" value={newExperience.role} onChange={(v) => setNewExperience({ ...newExperience, role: v })} />
          <div className="flex gap-4">
            <Field label="Start date" value={newExperience.startDate} onChange={(v) => setNewExperience({ ...newExperience, startDate: v })} />
            <Field label="End date (blank = Present)" value={newExperience.endDate} onChange={(v) => setNewExperience({ ...newExperience, endDate: v })} />
          </div>
          <TextArea label="Description" value={newExperience.description} onChange={(v) => setNewExperience({ ...newExperience, description: v })} />
          <SubmitButton label="add experience" />
        </form>
      </section>

      {/* Education */}
      <section className="mb-16 max-w-3xl">
        <p className="mb-2 font-mono text-xs tracking-wide text-accent">04 — EDUCATION</p>
        <h2 className="mb-6 font-display text-2xl text-inkText">Education</h2>

        <div className="mb-8 flex flex-col gap-4">
          {education.length === 0 && <p className="font-mono text-xs text-muted">No education yet — add one below.</p>}
          {education.map((edu) => (
            <EducationEditor key={edu.id} education={edu} onSave={updateEducation} onDelete={() => deleteEducation(edu.id)} />
          ))}
        </div>

        <form onSubmit={addEducation} className="relative flex flex-col gap-4 border border-dashed border-hairline p-6">
          <CornerMarks />
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">+ add education</p>
          <Field label="School" value={newEducation.school} onChange={(v) => setNewEducation({ ...newEducation, school: v })} />
          <Field label="Degree" value={newEducation.degree} onChange={(v) => setNewEducation({ ...newEducation, degree: v })} />
          <div className="flex gap-4">
            <Field label="Start date" value={newEducation.startDate} onChange={(v) => setNewEducation({ ...newEducation, startDate: v })} />
            <Field label="End date (blank = Present)" value={newEducation.endDate} onChange={(v) => setNewEducation({ ...newEducation, endDate: v })} />
          </div>
          <TextArea label="Description (optional)" value={newEducation.description} onChange={(v) => setNewEducation({ ...newEducation, description: v })} />
          <SubmitButton label="add education" />
        </form>
      </section>

      {/* Skills (structured list, separate from the profile.skills tag string) */}
      <section className="max-w-3xl">
        <p className="mb-2 font-mono text-xs tracking-wide text-accent">05 — SKILLS</p>
        <h2 className="mb-6 font-display text-2xl text-inkText">Skills</h2>

        <div className="mb-8 flex flex-col gap-4">
          {skills.length === 0 && <p className="font-mono text-xs text-muted">No skills yet — add one below.</p>}
          {skills.map((skill) => (
            <SkillEditor key={skill.id} skill={skill} onSave={updateSkill} onDelete={() => deleteSkill(skill.id)} />
          ))}
        </div>

        <form onSubmit={addSkill} className="relative flex flex-col gap-4 border border-dashed border-hairline p-6">
          <CornerMarks />
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">+ add skill</p>
          <Field label="Name" value={newSkill.name} onChange={(v) => setNewSkill({ ...newSkill, name: v })} />
          <Field label="Category (optional, e.g. Frontend)" value={newSkill.category} onChange={(v) => setNewSkill({ ...newSkill, category: v })} />
          <SubmitButton label="add skill" />
        </form>
      </section>
    </div>
  );
}

function CornerMarks() {
  return (
    <>
      <div className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-l border-t border-accent/60" />
      <div className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent/60" />
    </>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="group relative w-fit overflow-hidden border border-accent bg-accent px-5 py-2.5 font-mono text-xs tracking-wide text-canvas transition-opacity hover:opacity-90"
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
    </button>
  );
}

function ProjectEditor({ project, onSave, onDelete }: { project: Project; onSave: (p: Project) => void; onDelete: () => void }) {
  const [draft, setDraft] = useState(project);
  const [dirty, setDirty] = useState(false);
  function update<K extends keyof Project>(key: K, value: Project[K]) {
    setDraft({ ...draft, [key]: value });
    setDirty(true);
  }
  return (
    <div className="relative border border-hairline bg-canvasSoft p-6 transition-colors hover:border-hairline/80">
      {dirty && <UnsavedBadge />}
      <div className="flex flex-col gap-4">
        <Field label="Title" value={draft.title} onChange={(v) => update("title", v)} />
        <TextArea label="Description" value={draft.description} onChange={(v) => update("description", v)} />
        <Field label="Tech stack" value={draft.techStack} onChange={(v) => update("techStack", v)} />
        <Field label="Image URL" value={draft.imageUrl ?? ""} onChange={(v) => update("imageUrl", v)} />
        <Field label="Video URL" value={draft.videoUrl ?? ""} onChange={(v) => update("videoUrl", v)} />
        <Field label="Live URL" value={draft.liveUrl ?? ""} onChange={(v) => update("liveUrl", v)} />
        <Field label="Repo URL" value={draft.repoUrl ?? ""} onChange={(v) => update("repoUrl", v)} />
        <label className="flex items-center gap-2 font-mono text-xs text-muted">
          <input type="checkbox" checked={draft.featured} onChange={(e) => update("featured", e.target.checked)} className="accent-accent" />
          featured
        </label>
        <SaveDeleteRow dirty={dirty} onSave={() => { onSave(draft); setDirty(false); }} onDelete={onDelete} />
      </div>
    </div>
  );
}

function ExperienceEditor({ experience, onSave, onDelete }: { experience: Experience; onSave: (e: Experience) => void; onDelete: () => void }) {
  const [draft, setDraft] = useState(experience);
  const [dirty, setDirty] = useState(false);
  function update<K extends keyof Experience>(key: K, value: Experience[K]) {
    setDraft({ ...draft, [key]: value });
    setDirty(true);
  }
  return (
    <div className="relative border border-hairline bg-canvasSoft p-6 transition-colors hover:border-hairline/80">
      {dirty && <UnsavedBadge />}
      <div className="flex flex-col gap-4">
        <Field label="Company" value={draft.company} onChange={(v) => update("company", v)} />
        <Field label="Role" value={draft.role} onChange={(v) => update("role", v)} />
        <div className="flex gap-4">
          <Field label="Start date" value={draft.startDate} onChange={(v) => update("startDate", v)} />
          <Field label="End date" value={draft.endDate ?? ""} onChange={(v) => update("endDate", v)} />
        </div>
        <TextArea label="Description" value={draft.description} onChange={(v) => update("description", v)} />
        <SaveDeleteRow dirty={dirty} onSave={() => { onSave(draft); setDirty(false); }} onDelete={onDelete} />
      </div>
    </div>
  );
}

function EducationEditor({ education, onSave, onDelete }: { education: Education; onSave: (e: Education) => void; onDelete: () => void }) {
  const [draft, setDraft] = useState(education);
  const [dirty, setDirty] = useState(false);
  function update<K extends keyof Education>(key: K, value: Education[K]) {
    setDraft({ ...draft, [key]: value });
    setDirty(true);
  }
  return (
    <div className="relative border border-hairline bg-canvasSoft p-6 transition-colors hover:border-hairline/80">
      {dirty && <UnsavedBadge />}
      <div className="flex flex-col gap-4">
        <Field label="School" value={draft.school} onChange={(v) => update("school", v)} />
        <Field label="Degree" value={draft.degree} onChange={(v) => update("degree", v)} />
        <div className="flex gap-4">
          <Field label="Start date" value={draft.startDate} onChange={(v) => update("startDate", v)} />
          <Field label="End date" value={draft.endDate ?? ""} onChange={(v) => update("endDate", v)} />
        </div>
        <TextArea label="Description" value={draft.description ?? ""} onChange={(v) => update("description", v)} />
        <SaveDeleteRow dirty={dirty} onSave={() => { onSave(draft); setDirty(false); }} onDelete={onDelete} />
      </div>
    </div>
  );
}

function SkillEditor({ skill, onSave, onDelete }: { skill: Skill; onSave: (s: Skill) => void; onDelete: () => void }) {
  const [draft, setDraft] = useState(skill);
  const [dirty, setDirty] = useState(false);
  function update<K extends keyof Skill>(key: K, value: Skill[K]) {
    setDraft({ ...draft, [key]: value });
    setDirty(true);
  }
  return (
    <div className="relative border border-hairline bg-canvasSoft p-6 transition-colors hover:border-hairline/80">
      {dirty && <UnsavedBadge />}
      <div className="flex flex-col gap-4">
        <Field label="Name" value={draft.name} onChange={(v) => update("name", v)} />
        <Field label="Category" value={draft.category ?? ""} onChange={(v) => update("category", v)} />
        <SaveDeleteRow dirty={dirty} onSave={() => { onSave(draft); setDirty(false); }} onDelete={onDelete} />
      </div>
    </div>
  );
}

function UnsavedBadge() {
  return (
    <span className="absolute -right-px -top-px flex items-center gap-1.5 border border-accent/50 bg-canvas px-2 py-1 font-mono text-[10px] tracking-wide text-accent">
      <span className="h-1 w-1 rounded-full bg-accent" />
      unsaved
    </span>
  );
}

function SaveDeleteRow({ dirty, onSave, onDelete }: { dirty: boolean; onSave: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-3 pt-1">
      <button
        onClick={onSave}
        disabled={!dirty}
        className="border border-accent bg-accent px-4 py-2 font-mono text-xs tracking-wide text-canvas transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:border-hairline disabled:bg-transparent disabled:text-muted disabled:opacity-60"
      >
        save
      </button>
      <button onClick={onDelete} className="border border-red-400/40 px-4 py-2 font-mono text-xs text-red-400 transition-colors hover:bg-red-400/10">
        delete
      </button>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="group flex flex-1 flex-col gap-1.5">
      <span className="font-mono text-xs text-muted transition-colors group-focus-within:text-accent">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-hairline bg-canvas px-3 py-2 text-inkText outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="group flex flex-col gap-1.5">
      <span className="font-mono text-xs text-muted transition-colors group-focus-within:text-accent">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="border border-hairline bg-canvas px-3 py-2 text-inkText outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}