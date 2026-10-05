"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import { useReveal } from "./useReveal";
import { posts } from "@/lib/posts";

// Blogs: overzicht met per stuk datum, titel, korte intro en "Lees meer".
export function BlogPage() {
  const { t } = useLang();
  useReveal();

  return (
    <main className="visie-page blog-page">
      <section className="h-hero h-hero--forest h-hero--short">
        <div className="wrap">
          <div className="h-hero-text">
            <div className="eyebrow">Blogs</div>
            <h1>{t({ nl: "Bijdrages over een veranderende arbeidsmarkt.", en: "Contributions on a changing labour market." })}</h1>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="section reveal">
          <div className="post-list stagger">
            {posts.map((p) => (
              <article className="post" key={p.slug}>
                <div className="post-meta">{t(p.date)}</div>
                <h2>
                  <Link href={`/blog/${p.slug}`}>{t(p.title)}</Link>
                </h2>
                <p className="post-teaser">{t(p.teaser)}</p>
                <Link href={`/blog/${p.slug}`} className="btn btn-ghost btn-sm">
                  {t({ nl: "Lees meer", en: "Read more" })}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
