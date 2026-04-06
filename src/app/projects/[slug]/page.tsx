import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import {
  getProjectDetailMetadata,
  getProjectDetailStaticParams,
  ProjectDetailPageView
} from "@/views/project-detail-page";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getProjectDetailStaticParams(defaultLocale);
}

export async function generateMetadata({
  params
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return getProjectDetailMetadata(defaultLocale, slug);
}

export default async function ProjectDetailPage({
  params
}: ProjectDetailPageProps) {
  const { slug } = await params;
  return <ProjectDetailPageView locale={defaultLocale} slug={slug} />;
}
