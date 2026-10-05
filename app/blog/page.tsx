import type { Metadata } from "next";
import { BlogPage } from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Blogs, Productive Switch",
  description: "Korte stukken over omscholing, HR-transformatie en productief mensenwerk in een tijd van AI en robotica.",
};

export default function Blog() {
  return <BlogPage />;
}
