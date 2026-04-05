import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateString));
}

export function toTitleCase(value: string) {
  return value.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}

export function uniq<T>(values: T[]) {
  return Array.from(new Set(values));
}
