export type SkillLevel = "expert" | "advanced" | "proficient";

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  description: string;
  scenarios: string[];
  relatedProjects: string[];
  tools: string[];
}
