"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pt-20 pb-16 md:pt-28 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: "var(--c1)",
              borderColor: "var(--c1)",
              backgroundColor: "var(--c1-soft)",
              fontFamily: "var(--font-body)",
            }}
          >
            Nieuw platform
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Beta — gratis toegankelijk
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight mb-6"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Vind het programma dat bij{" "}
          <em className="not-italic" style={{ color: "var(--c2)" }}>
            jou
          </em>{" "}
          past.
        </h1>

        {/* Lead */}
        <p
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          Switch brengt gecureerde instituten en community-makers samen in één
          overzicht. Groei op jouw manier — in domeinkennis, sociale
          vaardigheden of fysieke competenties.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 group"
            style={{
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-body)",
            }}
          >
            Verken programma's
            <ArrowRight
              size={16}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold border transition-all duration-200 hover:bg-opacity-60 active:scale-95 group"
            style={{
              borderColor: "var(--line)",
              color: "var(--ink)",
              fontFamily: "var(--font-body)",
              backgroundColor: "transparent",
            }}
          >
            Hoe het werkt
            <ChevronRight
              size={15}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
              style={{ color: "var(--muted)" }}
            />
          </a>
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap gap-8 mt-16 pt-8 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        {[
          { value: "88", label: "gecureerde programma's" },
          { value: "293", label: "community modules" },
          { value: "3", label: "leerpilaren" },
        ].map((stat) => (
          <div key={stat.label}>
            <span
              className="block text-3xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {stat.value}
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
