import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { Timeline } from "@/components/shared/timeline";
import { Tag } from "@/components/shared/tag";
import { getAbout } from "@/lib/about";
import { buildMetadata } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "About Junbo He, current focus areas, tools, timeline, and the thinking behind the products being built."
});

export default function AboutPage() {
  const about = getAbout();

  return (
    <div className="py-12 sm:py-16">
      <Container className="space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_380px]">
          <div className="surface p-8 sm:p-10">
            <SectionTitle
              eyebrow="About"
              title="Building products with a balance of clarity, structure, and execution"
              description={about.tagline}
            />

            <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
              {about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="surface flex flex-col gap-6 p-6 sm:p-8">
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-[1.75rem] bg-muted">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>

            <div className="space-y-3">
              <p className="eyebrow">Socials</p>
              <div className="grid gap-3">
                {about.socials.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-foreground/20 hover:bg-muted/80"
                  >
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="surface p-8">
            <SectionTitle
              eyebrow="Focus Areas"
              title="What I care about most right now"
              description="The overlap of product framing, frontend craft, and useful systems keeps shaping the work I choose."
            />
            <div className="mt-8 grid gap-4">
              {about.focusAreas.map((item) => (
                <article key={item.title} className="rounded-3xl border border-border bg-white p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface p-8">
            <SectionTitle
              eyebrow="Now"
              title="Current state"
              description="A concise snapshot of the work, experiments, and writing threads I am actively moving forward."
            />
            <ul className="mt-8 space-y-4">
              {about.now.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="surface p-8 sm:p-10">
          <SectionTitle
            eyebrow="Toolkit"
            title="Tools and systems I rely on"
            description="I prefer a focused toolset that supports shipping, iteration, and maintainability without unnecessary process weight."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {about.tools.map((group) => (
              <article key={group.category} className="rounded-3xl border border-border bg-white p-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface p-8 sm:p-10">
          <SectionTitle
            eyebrow="Timeline"
            title="A short growth path"
            description="A few milestones that explain how design systems, product thinking, and independent building gradually converged."
          />
          <div className="mt-8">
            <Timeline items={about.timeline} />
          </div>
        </section>
      </Container>
    </div>
  );
}
