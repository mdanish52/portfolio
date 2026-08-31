// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#about", label: "ABOUT" },
  { href: "#projects", label: "WORK" },
  { href: "#process", label: "PROCESS" },
  { href: "#contact", label: "CONTACT" }
];

export default function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-hairline bg-canvas/90 py-2 backdrop-blur-xl shadow-[0_1px_0_0_rgba(232,162,61,0.08)]"
          : "border-transparent bg-canvas/40 py-4 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="group flex items-center gap-2 font-heading text-sm font-semibold tracking-wide text-inkText"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent transition-transform group-hover:scale-125" />
          </span>
          {name.toUpperCase()}
        </a>

        <ul className="hidden gap-8 font-mono text-xs tracking-wide text-muted md:flex">
          {links.map((link) => (
            <li key={link.href} className="group relative">
              <a href={link.href} className="relative py-1 transition-colors hover:text-inkText">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li className="group relative">
            <Link href="/resume" className="relative py-1 transition-colors hover:text-inkText">
              RESUME
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group relative hidden overflow-hidden border border-hairline px-4 py-2 font-mono text-xs tracking-wide text-inkText transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            <span className="relative z-10">START A PROJECT</span>
            <span className="absolute inset-0 -translate-x-full bg-accent/10 transition-transform duration-300 group-hover:translate-x-0" />
          </a>

          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-hairline md:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="h-px w-4 bg-inkText"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-px w-4 bg-inkText"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="h-px w-4 bg-inkText"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-hairline bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4 font-mono text-xs tracking-wide text-muted">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-hairline/60 py-3 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/resume"
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-hairline/60 py-3 transition-colors hover:text-accent"
                >
                  RESUME
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 block border border-hairline px-4 py-3 text-center text-inkText transition-colors hover:border-accent hover:text-accent"
                >
                  START A PROJECT
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}