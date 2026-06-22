"use client";

import { motion } from "framer-motion";
import { columns } from "@/lib/data";
import { CuratedTile } from "./CuratedTile";
import { OpenTile } from "./OpenTile";

function SectionLabel({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex items-center gap-3 mb-6"
    >
      <span
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--line)" }} />
    </motion.div>
  );
}

export function ShowcaseGrid() {
  return (
    <section
      id="showcase"
      className="max-w-6xl mx-auto px-5 md:px-8 pb-24"
    >
      {/* Row 1 — Curated */}
      <SectionLabel delay={0.1}>Gecureerde programma's</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {columns.map((col, i) => (
          <CuratedTile key={col.id} column={col} index={i} />
        ))}
      </div>

      {/* Row 2 — Open */}
      <SectionLabel delay={0.3}>Open community modules</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((col, i) => (
          <OpenTile key={col.id} column={col} index={i} />
        ))}
      </div>
    </section>
  );
}
