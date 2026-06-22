"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Programma's", href: "#showcase" },
  { label: "Hoe het werkt", href: "#how" },
  { label: "Voor instellingen", href: "#institutions" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(250,246,238,0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--line)",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <a
          href="/"
          className="text-2xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Switch
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-colors duration-150 hover:opacity-100"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-body)",
            }}
          >
            Boek een walkthrough
          </a>
          <button
            className="md:hidden p-1.5 rounded-md"
            onClick={() => setOpen(!open)}
            aria-label="Menu openen"
            style={{ color: "var(--ink)" }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden border-t px-5 py-4 flex flex-col gap-4"
          style={{ borderColor: "var(--line)", backgroundColor: "var(--paper)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
              style={{ color: "var(--ink)", fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center items-center px-4 py-2.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-body)",
            }}
          >
            Boek een walkthrough
          </a>
        </div>
      )}
    </header>
  );
}
