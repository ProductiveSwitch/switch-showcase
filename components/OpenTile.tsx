"use client";

import { motion } from "framer-motion";
import { Users, Star, ArrowRight } from "lucide-react";
import type { Column } from "@/lib/data";
import { columnMeta } from "@/lib/data";

interface Props {
  column: Column;
  index: number;
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          fill={i < Math.round(value) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

export function OpenTile({ column, index }: Props) {
  const meta = columnMeta[column.id];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.35 + index * 0.1,
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
      <div className="flex flex-col flex-1 p-6">
        {/* Community header */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
            style={{
              color: "var(--muted)",
              borderColor: "var(--line)",
              fontFamily: "var(--font-body)",
              backgroundColor: "transparent",
            }}
          >
            <Users size={11} />
            Community
          </span>
        </div>

        {/* Title + meta */}
        <h3
          className="text-xl font-semibold leading-snug mb-1"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {column.label}
        </h3>
        <p
          className="text-sm mb-5"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          {column.makerCount} makers &middot; {column.moduleCount} modules
        </p>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{ backgroundColor: "var(--line)" }}
        />

        {/* Maker cards */}
        <div className="flex flex-col gap-3 flex-1">
          {column.makers.map((maker) => (
            <div
              key={maker.courseTitle}
              className="flex items-start gap-3 p-3 rounded-xl border transition-colors duration-150 cursor-pointer group"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--paper)" }}
            >
              {/* Avatar */}
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{
                  backgroundColor: maker.color,
                  fontFamily: "var(--font-body)",
                }}
              >
                {maker.initials}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold leading-snug mb-0.5"
                  style={{ color: "var(--ink)", fontFamily: "var(--font-body)" }}
                >
                  {maker.courseTitle}
                </p>
                <p
                  className="text-xs mb-1.5"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                >
                  door {maker.makerName}
                </p>
                <div
                  className="flex items-center gap-1.5"
                  style={{ color: meta.accent }}
                >
                  <StarRating value={maker.rating} />
                  <span
                    className="text-xs font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {maker.rating.toFixed(1)}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
                  >
                    ({maker.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <a
          href="#"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-150 group hover:gap-2"
          style={{ color: meta.accent, fontFamily: "var(--font-body)" }}
        >
          Verken alle modules
          <ArrowRight
            size={15}
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </motion.article>
  );
}
