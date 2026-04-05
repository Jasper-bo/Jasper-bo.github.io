import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <div className="py-24">
      <Container>
        <div className="surface mx-auto max-w-2xl p-10 text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            This page could not be found
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The link may be outdated, or the content has not been published yet.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/" className="button-primary">
              Back home
            </Link>
            <Link href="/projects" className="button-secondary">
              Browse projects
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
