// components/Contact.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion";

type ContactProps = {
  email: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
};

type SubmitState = "idle" | "sending" | "success" | "error";

function extractHandle(url: string): string {
  try {
    const path = new URL(url).pathname.replace(/\/$/, "");
    const segments = path.split("/").filter(Boolean);
    return segments[segments.length - 1] || "profile";
  } catch {
    return "profile";
  }
}

export default function Contact({ email, githubUrl, linkedinUrl, twitterUrl }: ContactProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");

  const links = [
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "GitHub", value: githubUrl ? `@${extractHandle(githubUrl)}` : null, href: githubUrl },
    { label: "LinkedIn", value: linkedinUrl ? "View profile ↗" : null, href: linkedinUrl },
    { label: "Twitter", value: twitterUrl ? `@${extractHandle(twitterUrl)}` : null, href: twitterUrl }
  ].filter((l) => l.value);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <section id="contact" className="relative border-t border-hairline px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/3 top-0 -z-10 h-[380px] w-[420px] -translate-y-1/3 rounded-full bg-accent/10 blur-[110px]"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2"
      >
        <motion.div variants={fadeUp}>
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-wide text-accent">
            <span className="inline-block h-px w-8 bg-accent" />
            05 — CONTACT
          </p>
          <h2 className="font-display text-4xl leading-tight text-inkText md:text-5xl">
            Let&rsquo;s start a conversation.
          </h2>
          <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-muted">
            Tell me about the problem you&rsquo;re trying to solve — not the solution
            you think you need.
          </p>

          <div className="mt-10 flex flex-col">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href!}
                target={link.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group flex items-center justify-between border-b border-hairline py-4 font-display text-lg text-inkText transition-colors hover:text-accent"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-hairline transition-colors duration-200 group-hover:bg-accent" />
                  {link.label}
                </span>
                <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                  {link.value}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-6 border border-hairline p-8"
        >
          <div className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-l border-t border-accent/60" />
          <div className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r border-accent/60" />

          <label className="group flex flex-col gap-2">
            <span className="font-mono text-xs tracking-wide text-muted transition-colors group-focus-within:text-accent">
              NAME
            </span>
            <div className="relative">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="peer w-full border-b border-hairline bg-transparent py-2 text-inkText outline-none placeholder:text-muted/50"
              />
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 peer-focus:w-full" />
            </div>
          </label>

          <label className="group flex flex-col gap-2">
            <span className="font-mono text-xs tracking-wide text-muted transition-colors group-focus-within:text-accent">
              MESSAGE
            </span>
            <div className="relative">
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you working on?"
                className="peer w-full resize-none border-b border-hairline bg-transparent py-2 text-inkText outline-none placeholder:text-muted/50"
              />
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 peer-focus:w-full" />
            </div>
          </label>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative w-fit overflow-hidden border border-accent bg-accent px-6 py-3 font-mono text-xs tracking-wide text-canvas transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
              </span>
              {status !== "sending" && (
                <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
              )}
            </button>

            {status === "success" && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Sent — I&rsquo;ll get back to you soon.
              </span>
            )}
            {status === "error" && (
              <span className="font-mono text-xs text-red-400">
                Couldn&rsquo;t send — try email instead.
              </span>
            )}
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}