"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import type { Post } from "@/lib/posts";

export function BlogPost({ post }: { post: Post }) {
  const { t } = useLang();
  return (
    <main className="visie-page blog-page">
      <section className="h-hero h-hero--forest h-hero--short">
        <div className="wrap">
          <div className="h-hero-text">
            <div className="eyebrow">{t(post.date)}</div>
            <h1>{t(post.title)}</h1>
            <p className="lede">{t(post.teaser)}</p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <article className="post post--full">
          {t(post.body)
            .split("\n\n")
            .map((para, i) =>
              para.startsWith("## ") ? <h3 key={i}>{para.slice(3)}</h3> : <p key={i}>{para}</p>
            )}
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="post-photo" src={post.image} alt={post.imageAlt ? t(post.imageAlt) : ""} loading="lazy" />
          )}
          <Link href="/blog" className="lees-meer">
            ← {t({ nl: "Alle blogs", en: "All blogs" })}
          </Link>
        </article>
      </div>
    </main>
  );
}
