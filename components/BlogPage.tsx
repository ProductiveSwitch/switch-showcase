"use client";

import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { posts } from "@/lib/posts";

// Blogs: korte stukken, voorlopig één overzicht met de tekst inline.
export function BlogPage() {
  const { t } = useLang();
  useReveal();

  return (
    <main className="visie-page blog-page">
      <section className="h-hero h-hero--forest h-hero--short">
        <div className="wrap">
          <div className="h-hero-text">
            <div className="eyebrow">Blogs</div>
            <h1>{t({ nl: "Korte stukken over werk dat verandert.", en: "Short pieces on work that is changing." })}</h1>
            <p className="lede">
              {t({
                nl: "Over omscholing, HR-transformatie en productief mensenwerk in een tijd van AI en robotica.",
                en: "On re-training, HR transformation and productive human work in an age of AI and robotics.",
              })}
            </p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section reveal">
          <div className="post-list stagger">
            {posts.map((p) => (
              <article className="post" key={p.slug} id={p.slug}>
                <div className="post-meta">{t(p.date)}</div>
                <h2>{t(p.title)}</h2>
                <p className="post-teaser">{t(p.teaser)}</p>
                {t(p.body)
                  .split("\n\n")
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
