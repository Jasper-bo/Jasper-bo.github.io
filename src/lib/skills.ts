import type { Skill, SkillLevel } from "@/types";
import { uniq } from "@/lib/utils";
import { defaultLocale, type Locale } from "@/lib/i18n";
import skillsEn from "@/content/en/skills.json";
import skillsZh from "@/content/zh/skills.json";

const levelOrder: Record<SkillLevel, number> = {
  expert: 0,
  advanced: 1,
  proficient: 2
};

const skillsByLocale: Record<Locale, Skill[]> = {
  en: skillsEn as Skill[],
  zh: skillsZh as Skill[]
};

function getRawSkills(locale: Locale) {
  return skillsByLocale[locale];
}

export function getSkills(category?: string | null, locale: Locale = defaultLocale) {
  return [...getRawSkills(locale)]
    .filter((skill) => !category || skill.category === category)
    .sort((left, right) => {
      const byLevel = levelOrder[left.level] - levelOrder[right.level];

      if (byLevel !== 0) {
        return byLevel;
      }

      return left.name.localeCompare(right.name, locale);
    });
}

export function getSkillCategories(locale: Locale = defaultLocale) {
  return uniq(getRawSkills(locale).map((skill) => skill.category)).sort((left, right) =>
    left.localeCompare(right, locale)
  );
}

export function getCoreSkills(locale: Locale = defaultLocale, limit = 4) {
  return getSkills(undefined, locale).slice(0, limit);
}
