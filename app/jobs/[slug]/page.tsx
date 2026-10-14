import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { vacancies } from "@/lib/data";
import { RolePage } from "@/components/RolePage";

export function generateStaticParams() {
  return vacancies.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = vacancies.find((x) => x.slug === slug);
  if (!v) return {};
  return { title: `${v.role.nl}, ${v.location}, Productive Search`, description: v.summary.nl };
}

export default async function Role({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = vacancies.find((x) => x.slug === slug);
  if (!v) notFound();
  return <RolePage v={v} />;
}
