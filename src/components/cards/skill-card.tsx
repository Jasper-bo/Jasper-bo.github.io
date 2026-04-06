import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Skill } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { Tag } from "@/components/shared/tag";

interface RelatedProjectLink {
  id: string;
  title: string;
  slug: string;
}

interface SkillCardProps {
  skill: Skill;
  locale: Locale;
  relatedProjects: RelatedProjectLink[];
}

export function SkillCard({ skill, locale, relatedProjects }: SkillCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <article className="surface flex h-full flex-col gap-5 p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <Tag variant="accent">{skill.category}</Tag>
        <Tag variant="outline">{dictionary.skillLevels[skill.level]}</Tag>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">{skill.name}</h3>
        <p className="text-sm leading-7 text-muted-foreground">{skill.description}</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">{dictionary.skillCard.whereItHelps}</p>
        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          {skill.scenarios.map((scenario) => (
            <li key={scenario} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              <span>{scenario}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-auto border-t border-border/70 pt-5">
        <p className="mb-3 text-sm font-semibold text-foreground">
          {dictionary.skillCard.relatedProjects}
        </p>
        <div className="flex flex-wrap gap-3">
          {relatedProjects.map((project) => (
            <Link
              key={project.id}
              href={localizePath(`/projects/${project.slug}`, locale)}
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition hover:text-accent"
            >
              {project.title}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
