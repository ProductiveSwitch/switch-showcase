import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/data";
import { CoursesPage } from "@/components/CoursesPage";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `${dest.label.nl}, Productive Switch`,
    description: dest.sub.nl,
  };
}

export default async function RichtingRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!destinations.some((d) => d.slug === slug)) notFound();
  return <CoursesPage slug={slug} />;
}
