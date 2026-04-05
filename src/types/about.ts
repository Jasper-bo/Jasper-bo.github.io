export interface SocialLink {
  label: string;
  href: string;
  value: string;
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

export interface About {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  avatar: string;
  socials: SocialLink[];
  focusAreas: FocusArea[];
  tools: ToolGroup[];
  now: string[];
  timeline: TimelineItem[];
}
