export interface SocialLink {
  label: string;
  href: string;
  value: string;
}

export interface ProfileHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface FocusArea {
  title: string;
  description: string;
}

export interface ToolGroup {
  category: string;
  items: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Workflow {
  title: string;
  description: string;
  steps: WorkflowStep[];
  principles: string[];
}

export interface About {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  avatar: string;
  socials: SocialLink[];
  profileHighlights: ProfileHighlight[];
  focusAreas: FocusArea[];
  tools: ToolGroup[];
  workflow: Workflow;
  now: string[];
  timeline: TimelineItem[];
}
