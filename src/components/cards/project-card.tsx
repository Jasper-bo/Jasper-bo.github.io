import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project, ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/shared/tag";

const statusLabelMap: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  "case-study": "Case Study",
  archived: "Archived"
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group surface flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1",
        project.featured && "border-foreground/10",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/70 bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Tag variant="accent">{statusLabelMap[project.status]}</Tag>
          {project.featured ? <Tag variant="outline">Featured</Tag> : null}
          {project.tags.slice(0, 2).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">{project.tagline}</p>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/70 pt-5">
          <span className="text-sm text-muted-foreground">{project.role}</span>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition hover:text-accent"
          >
            View detail
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
