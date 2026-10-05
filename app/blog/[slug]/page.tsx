import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";
import { BlogPost } from "@/components/BlogPost";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title.nl}, Productive Switch`, description: post.teaser.nl };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPost post={post} />;
}
