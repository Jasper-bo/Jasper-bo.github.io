import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { Tag } from "@/components/shared/tag";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  className?: string;
}

export function ProjectCard({ project, locale, className }: ProjectCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <article
      data-liquid
      className={cn(
        "group surface surface-strong flex h-full flex-col overflow-hidden",
        project.featured && "border-foreground/10",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/25 bg-white/18">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Tag variant="accent">{dictionary.projectStatuses[project.status]}</Tag>
          {project.featured ? <Tag variant="outline">{dictionary.projectCard.featured}</Tag> : null}
          {project.tags.slice(0, 2).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
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
              className="rounded-full border border-white/36 bg-white/22 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-xl"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/18 pt-5">
          <span className="text-sm text-muted-foreground">{project.role}</span>
          <Link
            href={localizePath(`/projects/${project.slug}`, locale)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition hover:text-accent"
          >
            {dictionary.projectCard.viewDetail}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
