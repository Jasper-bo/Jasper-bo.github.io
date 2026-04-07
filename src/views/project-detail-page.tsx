import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Tag } from "@/components/shared/tag";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

function renderLink(
  label: string,
  href: string | null,
  unavailableSuffix: string
) {
  if (!href) {
    return (
      <span className="surface surface-subtle inline-flex items-center gap-1 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground">
        {label} {unavailableSuffix}
      </span>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      data-liquid
      className="surface surface-subtle inline-flex items-center gap-1 rounded-full px-4 py-3 text-sm font-semibold text-foreground transition hover:text-accent"
    >
      {label}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

function getProjectOr404(slug: string, locale: Locale) {
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  return project;
}

export function getProjectDetailStaticParams(locale: Locale) {
  return getProjects(locale).map((project) => ({
    slug: project.slug
  }));
}

export function getProjectDetailMetadata(locale: Locale, slug: string) {
  const dictionary = getDictionary(locale);
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return buildMetadata({
      title: dictionary.metadata.projectNotFound.title,
      description: dictionary.metadata.projectNotFound.description,
      path: `/projects/${slug}`,
      locale
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
    locale
  });
}

function DetailSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="surface surface-subtle space-y-4 rounded-[1.75rem] p-6 sm:p-8">
      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{title}</h2>
      <div className="space-y-4 text-base leading-8 text-muted-foreground">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectSidebar({ locale, project }: { locale: Locale; project: Project }) {
  const dictionary = getDictionary(locale);

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="surface surface-strong p-6">
        <dl className="space-y-5">
          <div>
            <dt className="text-sm font-semibold text-foreground">
              {dictionary.projectDetail.sidebar.status}
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {dictionary.projectStatuses[project.status]}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">
              {dictionary.projectDetail.sidebar.role}
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">
              {dictionary.projectDetail.sidebar.created}
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {formatDate(project.createdAt, locale)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">
              {dictionary.projectDetail.sidebar.updated}
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {formatDate(project.updatedAt, locale)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">
              {dictionary.projectDetail.sidebar.targetUsers}
            </dt>
            <dd className="mt-2">
              <div className="flex flex-wrap gap-2">
                {project.targetUsers.map((user) => (
                  <Tag key={user}>{user}</Tag>
                ))}
              </div>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">
              {dictionary.projectDetail.sidebar.techStack}
            </dt>
            <dd className="mt-2">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <Tag key={item} variant="outline">
                    {item}
                  </Tag>
                ))}
              </div>
            </dd>
          </div>
        </dl>
      </div>

      <div className="surface surface-strong p-6">
        <h2 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
          {dictionary.projectDetail.sidebar.links}
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {renderLink(
            dictionary.projectDetail.sidebar.liveDemo,
            project.demoUrl,
            dictionary.projectDetail.unavailableSuffix
          )}
          {renderLink(
            dictionary.projectDetail.sidebar.githubRepo,
            project.githubUrl,
            dictionary.projectDetail.unavailableSuffix
          )}
        </div>
      </div>
    </aside>
  );
}

interface ProjectDetailPageViewProps {
  locale: Locale;
  slug: string;
}

export function ProjectDetailPageView({ locale, slug }: ProjectDetailPageViewProps) {
  const dictionary = getDictionary(locale);
  const project = getProjectOr404(slug, locale);

  return (
    <article className="py-12 sm:py-16">
      <Container className="space-y-10">
        <Link
          href={localizePath("/", locale)}
          data-liquid
          className="surface surface-subtle inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {dictionary.projectDetail.backToProjects}
        </Link>

        <header className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:items-end">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Tag variant="accent">{dictionary.projectStatuses[project.status]}</Tag>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
                {project.title}
              </h1>
              <p className="text-xl leading-8 text-foreground/90">{project.tagline}</p>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="surface surface-strong p-6">
            <p className="eyebrow">{dictionary.projectDetail.goalEyebrow}</p>
            <p className="mt-3 text-base leading-8 text-foreground/90">{project.goal}</p>
          </div>
        </header>

        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/34 bg-white/18 shadow-card">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_340px]">
          <div className="space-y-10">
            <DetailSection title={dictionary.projectDetail.sections.productFraming}>
              <p>{project.problem}</p>
              <p>{project.solution}</p>
            </DetailSection>

            <DetailSection title={dictionary.projectDetail.sections.audience}>
              <BulletList items={project.targetUsers} />
            </DetailSection>

            <DetailSection title={dictionary.projectDetail.sections.coreFeatures}>
              <BulletList items={project.features} />
            </DetailSection>

            <DetailSection title={dictionary.projectDetail.sections.challenges}>
              <BulletList items={project.challenges} />
            </DetailSection>

            <DetailSection title={dictionary.projectDetail.sections.learnings}>
              <BulletList items={project.learnings} />
            </DetailSection>
          </div>

          <ProjectSidebar locale={locale} project={project} />
        </div>
      </Container>
    </article>
  );
}
