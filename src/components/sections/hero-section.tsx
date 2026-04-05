import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { About } from "@/types";
import { Container } from "@/components/layout/container";
import { Tag } from "@/components/shared/tag";

interface HeroSectionProps {
  about: About;
}

export function HeroSection({ about }: HeroSectionProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_380px]">
          <div className="surface p-8 sm:p-10">
            <div className="space-y-6">
              <Tag variant="accent">Personal brand website v1</Tag>
              <div className="space-y-4">
                <p className="font-serif text-xl italic text-muted-foreground sm:text-2xl">
                  {about.title}
                </p>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    {about.name}
                  </h1>
                  <p className="max-w-3xl text-xl leading-8 text-foreground/90 sm:text-2xl">
                    {about.tagline}
                  </p>
                </div>
              </div>

              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {about.bio[0]}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className="button-primary">
                  View projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/about" className="button-secondary">
                  About me
                </Link>
              </div>
            </div>
          </div>

          <aside className="surface flex flex-col gap-6 p-6 sm:p-8">
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.75rem] bg-muted">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Current focus
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  Building fitness and knowledge products with clearer information
                  architecture.
                </p>
              </div>

              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {about.focusAreas.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-foreground" />
                    <span>
                      <span className="font-semibold text-foreground">{item.title}: </span>
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
