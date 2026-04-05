import type { TimelineItem } from "@/types";

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {items.map((item) => (
        <li key={`${item.period}-${item.title}`} className="relative">
          <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-foreground" />
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {item.period}
            </p>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
