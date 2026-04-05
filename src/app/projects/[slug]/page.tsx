import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Tag } from "@/components/shared/tag";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/site";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import type { Project, ProjectStatus } from "@/types";

const statusLabelMap: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  "case-study": "Case Study",
  archived: "Archived"
};

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function renderLink(label: string, href: string | null) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
        {label} unavailable
      </span>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition hover:text-accent"
    >
      {label}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

function getProjectOr404(slug: string) {
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return project;
}

export async function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({
  params
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "The requested project does not exist.",
      path: `/projects/${slug}`
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.coverImage
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
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
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

function ProjectSidebar({ project }: { project: Project }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="surface p-6">
        <dl className="space-y-5">
          <div>
            <dt className="text-sm font-semibold text-foreground">Status</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {statusLabelMap[project.status]}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Role</dt>
            <dd className="mt-1 text-sm text-muted-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Created</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {formatDate(project.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Updated</dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              {formatDate(project.updatedAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Target users</dt>
            <dd className="mt-2">
              <div className="flex flex-wrap gap-2">
                {project.targetUsers.map((user) => (
                  <Tag key={user}>{user}</Tag>
                ))}
              </div>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-foreground">Tech stack</dt>
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

      <div className="surface p-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Links</h2>
        <div className="mt-4 flex flex-col gap-3">
          {renderLink("Live demo", project.demoUrl)}
          {renderLink("GitHub repo", project.githubUrl)}
        </div>
      </div>
    </aside>
  );
}

export default async function ProjectDetailPage({
  params
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectOr404(slug);

  return (
    <article className="py-12 sm:py-16">
      <Container className="space-y-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <header className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:items-end">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Tag variant="accent">{statusLabelMap[project.status]}</Tag>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {project.title}
              </h1>
              <p className="text-xl leading-8 text-foreground/90">{project.tagline}</p>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="surface p-6">
            <p className="eyebrow">Project goal</p>
            <p className="mt-3 text-base leading-8 text-foreground/90">{project.goal}</p>
          </div>
        </header>

        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border/80 bg-muted shadow-card">
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
            <DetailSection title="Product framing">
              <p>{project.problem}</p>
              <p>{project.solution}</p>
            </DetailSection>

            <DetailSection title="Who this is for">
              <BulletList items={project.targetUsers} />
            </DetailSection>

            <DetailSection title="Core features">
              <BulletList items={project.features} />
            </DetailSection>

            <DetailSection title="Challenges">
              <BulletList items={project.challenges} />
            </DetailSection>

            <DetailSection title="What I learned">
              <BulletList items={project.learnings} />
            </DetailSection>
          </div>

          <ProjectSidebar project={project} />
        </div>
      </Container>
    </article>
  );
}
