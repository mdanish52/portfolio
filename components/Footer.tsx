// components/Footer.tsx
import { AtSign, BriefcaseBusiness, Code2, Mail } from "lucide-react";

type FooterProps = {
  name: string;
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
};

const quickLinks = [
  { label: "WORK", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" }
];

export default function Footer({ name, email, github, linkedin, twitter }: FooterProps) {
  const socials = [
    github ? { label: "GitHub", href: github, Icon: Code2 } : null,
    linkedin ? { label: "LinkedIn", href: linkedin, Icon: BriefcaseBusiness } : null,
    twitter ? { label: "Twitter", href: twitter, Icon: AtSign } : null,
    email ? { label: "Email", href: `mailto:${email}`, Icon: Mail } : null
  ].filter(Boolean) as { label: string; href: string; Icon: typeof Mail }[];

  return (
    <footer className="relative overflow-hidden border-t border-hairline px-6 pt-16 pb-8">
      {/* subtle grid, quieter than hero */}
      <div className="bg-grid absolute inset-0 -z-30 opacity-40 animate-grid-pulse" />

      {/* soft ambient glow, low-key */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-aurora-spin opacity-10 blur-[60px] md:h-[400px] md:w-[400px] md:opacity-15 md:blur-[90px]"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, #E8A23D 60deg, transparent 140deg, #F3D67C 220deg, transparent 300deg)"
          }}
        />
      </div>

      {/* thin scan-line accent */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-accent/8 to-transparent animate-scan-line" />
      </div>

      {/* vignette to keep edges dark and text legible */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(11,12,16,0.9)_100%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* main grid: brand / links / socials */}
        <div className="grid gap-10 border-b border-hairline/60 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-xl italic text-inkText">{name}</p>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-muted">
              Full-stack developer and video editor working across product,
              front-end systems, and motion.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="mb-3 font-mono text-[11px] tracking-wide text-accent">NAVIGATE</p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {socials.length > 0 && (
            <div className="md:col-span-4">
              <p className="mb-3 font-mono text-[11px] tracking-wide text-accent">CONNECT</p>
              <ul className="space-y-2">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* bottom row */}
        <div className="flex flex-col items-center justify-between gap-2 pt-6 font-mono text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} {name}</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            BACK TO TOP
            <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}