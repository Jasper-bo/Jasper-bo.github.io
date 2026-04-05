interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="surface flex min-h-64 flex-col items-center justify-center gap-3 p-8 text-center">
      <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
