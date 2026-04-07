export interface SocialLink {
  label: string;
  href: string;
  value: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Workflow {
  steps: WorkflowStep[];
}

export interface About {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  avatar: string;
  socials: SocialLink[];
  workflow: Workflow;
  thinkingQuestions: string[];
}
