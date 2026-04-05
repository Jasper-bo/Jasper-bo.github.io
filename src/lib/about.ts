import aboutData from "@/content/about.json";
import type { About } from "@/types";

export function getAbout() {
  return aboutData as About;
}
