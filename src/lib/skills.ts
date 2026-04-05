import skillsData from "@/content/skills.json";
import type { Skill, SkillLevel } from "@/types";
import { uniq } from "@/lib/utils";

const levelOrder: Record<SkillLevel, number> = {
  expert: 0,
  advanced: 1,
  proficient: 2
};

function getRawSkills() {
  return skillsData as Skill[];
}

export function getSkills(category?: string | null) {
  return [...getRawSkills()]
    .filter((skill) => !category || skill.category === category)
    .sort((left, right) => {
      const byLevel = levelOrder[left.level] - levelOrder[right.level];

      if (byLevel !== 0) {
        return byLevel;
      }

      return left.name.localeCompare(right.name);
    });
}

export function getSkillCategories() {
  return uniq(getRawSkills().map((skill) => skill.category)).sort((left, right) =>
    left.localeCompare(right)
  );
}

export function getCoreSkills(limit = 4) {
  return getSkills().slice(0, limit);
}
