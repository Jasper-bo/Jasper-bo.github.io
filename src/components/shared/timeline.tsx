import type { TimelineItem } from "@/types";

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative space-y-6 border-l border-white/28 pl-6">
      {items.map((item) => (
        <li
          key={`${item.period}-${item.title}`}
          data-liquid
          className="surface surface-subtle relative rounded-[1.6rem] p-5"
        >
          <span className="absolute -left-[1.9rem] top-7 h-3.5 w-3.5 rounded-full border-2 border-white/60 bg-foreground/80 shadow-[0_0_0_6px_rgba(255,255,255,0.22)]" />
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {item.period}
            </p>
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
              {item.title}
            </h3>
            <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
