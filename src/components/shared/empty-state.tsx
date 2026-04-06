interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="surface surface-strong flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center">
      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{title}</h3>
      <p className="max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
