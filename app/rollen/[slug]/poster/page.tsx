import { notFound } from "next/navigation";
import { vacancies } from "@/lib/data";
import { RolePoster } from "@/components/RolePoster";

export function generateStaticParams() {
  return vacancies.map((v) => ({ slug: v.slug }));
}

// Renderdoel voor de LinkedIn-poster (geen nav, geen footer).
export default async function Poster({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const v = vacancies.find((x) => x.slug === slug);
  if (!v) notFound();
  return <div className="poster-stage"><RolePoster v={v} lang={lang === "en" ? "en" : "nl"} /></div>;
}
