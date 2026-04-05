export type ProjectStatus = "live" | "beta" | "case-study" | "archived";

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  goal: string;
  coverImage: string;
  tags: string[];
  status: ProjectStatus;
  role: string;
  techStack: string[];
  targetUsers: string[];
  problem: string;
  solution: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
