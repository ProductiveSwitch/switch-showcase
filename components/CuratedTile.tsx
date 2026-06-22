"use client";

import { motion } from "framer-motion";
import { Compass, Heart, Wrench, BadgeCheck, Clock } from "lucide-react";
import type { Column, ColumnId } from "@/lib/data";
import { columnMeta } from "@/lib/data";

const ColumnIcon = ({ id, size = 20 }: { id: ColumnId; size?: number }) => {
  if (id === "domain") return <Compass size={size} />;
  if (id === "social") return <Heart size={size} />;
  return <Wrench size={size} />;
};

interface Props {
  column: Column;
  index: number;
}

export function CuratedTile({ column, index }: Props) {
  const meta = columnMeta[column.id];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15 + index * 0.1,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="relative flex flex-col rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: "var(--panel)",
        borderColor: "var(--line)",
        boxShadow: "0 1px 3px rgba(27,26,23,0.06), 0 1px 2px rgba(27,26,23,0.04)",
      }}
    >
      {/* Coloured top bar */}
      <div
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: meta.accent }}
      />

      <div className="flex flex-col flex-1 p-6">
        {/* Gecureerd badge */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              color: meta.accent,
              backgroundColor: meta.soft,
              fontFamily: "var(--font-body)",
            }}
          >
            <BadgeCheck size={12} />
            Gecureerd
          </span>
        </div>

        {/* Icon + Title */}
        <div
          className="flex items-start gap-3 mb-3"
          style={{ color: meta.accent }}
        >
          <ColumnIcon id={column.id} size={22} />
          <h3
            className="text-xl font-semibold leading-snug"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
            }}
          >
            {column.label}
          </h3>
        </div>

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          {column.blurb}
        </p>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{ backgroundColor: "var(--line)" }}
        />

        {/* Featured programmes */}
        <div className="flex flex-col gap-3 flex-1">
          {column.curated.map((prog) => (
            <div
              key={prog.courseName}
              className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-150 cursor-pointer group"
              style={{ backgroundColor: meta.soft }}
            >
              {/* Avatar */}
              <div
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: meta.accent,
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                }}
              >
                {prog.initials}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium truncate mb-0.5"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  {prog.institution}
                </p>
                <p
                  className="text-sm font-semibold leading-snug mb-1.5"
                  style={{
                    color: "var(--ink)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {prog.courseName}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {prog.certified && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: meta.accent,
                        color: "#fff",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <BadgeCheck size={10} />
                      Gecertificeerd
                    </span>
                  )}
                  <span
                    className="inline-flex items-center gap-1 text-xs"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                  >
                    <Clock size={10} />
                    {prog.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
