export interface SocialLink {
  label: string;
  href: string;
  value: string;
  note: string;
}

export interface HeroSignal {
  label: string;
  value: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
  output: string;
}

export interface Workflow {
  steps: WorkflowStep[];
}

export interface ThinkingQuestion {
  id: string;
  theme: string;
  status: string;
  prompt: string;
}

export interface About {
  name: string;
  title: string;
  tagline: string;
  worldview: string;
  bio: string[];
  avatar: string;
  heroSignals: HeroSignal[];
  socials: SocialLink[];
  workflow: Workflow;
  thinkingQuestions: ThinkingQuestion[];
}
