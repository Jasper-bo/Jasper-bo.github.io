# Blog Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the blog into a single-page primary site centered on `AIPM / AI-native product explorer`, with `About` and `Skills` removed from the product surface and the homepage reduced to four clear sections.

**Architecture:** Keep the existing Next.js App Router foundation, but collapse the user-facing IA into one dominant homepage plus a low-priority books archive and retained secondary project detail pages. Reuse the existing JSON content approach, slim the `about` content model to fields that actually drive the new homepage, and add a small Vitest + React Testing Library harness so the new information architecture is locked down by tests before and during the refactor.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, JSON content files, Vitest, React Testing Library, jsdom

---

## File Structure

### Create

- `vitest.config.ts` — test runner config with React support, jsdom environment, and `@` path alias resolution
- `tests/setup.ts` — shared mocks for `next/image`, `next/link`, and `next/navigation`
- `tests/lib/site-config.test.ts` — primary navigation regression test
- `tests/lib/about-content.test.ts` — homepage content-shape regression test
- `tests/views/home-page.test.tsx` — four-section homepage regression test
- `tests/app/sitemap.test.ts` — sitemap route-surface regression test
- `src/components/sections/current-build-section.tsx` — homepage section for the `Fitness App`
- `src/components/sections/how-i-work-section.tsx` — homepage section for the 3-step AI-native workflow
- `src/components/sections/signals-section.tsx` — homepage section for three current questions, social links, and the low-priority books archive link

### Modify

- `package.json` — add a `test` script
- `src/lib/site.ts` — collapse primary navigation to `Home` only
- `src/types/about.ts` — slim the homepage content model and add `thinkingQuestions`
- `src/content/en/about.json` — replace verbose profile/about fields with the new homepage-focused schema
- `src/content/zh/about.json` — same as above for Chinese content
- `src/lib/dictionaries.ts` — remove unused navigation/page-copy requirements from the active interface and add copy for `currentBuild`, `workingMethod`, and `signals`
- `src/views/home-page.tsx` — replace the current 5-section landing page with the new 4-section composition
- `src/components/sections/hero-section.tsx` — simplify the hero into a high-clarity positioning block
- `src/app/sitemap.ts` — remove retired top-level routes from the sitemap while keeping `/books` and project detail pages
- `README.md` — update the project description and tree so it matches the simplified IA

### Delete

- `src/app/about/page.tsx`
- `src/app/[locale]/about/page.tsx`
- `src/app/skills/page.tsx`
- `src/app/[locale]/skills/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/[locale]/projects/page.tsx`
- `src/views/about-page.tsx`
- `src/views/skills-page.tsx`
- `src/views/skills-page-client.tsx`
- `src/views/projects-page.tsx`
- `src/components/sections/current-focus-section.tsx`
- `src/components/sections/featured-projects-section.tsx`
- `src/components/sections/reading-shelf-section.tsx`
- `src/components/sections/core-skills-section.tsx`
- `src/components/cards/project-card.tsx`
- `src/components/cards/skill-card.tsx`

## Task 1: Add a test harness and lock primary navigation to `Home`

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/lib/site-config.test.ts`
- Modify: `package.json`
- Modify: `src/lib/site.ts`

- [ ] **Step 1: Add a `test` script to `package.json`**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

- [ ] **Step 2: Install the test dependencies**

Run:

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @vitejs/plugin-react
```

Expected:
- `added ... packages`
- `found 0 vulnerabilities`

- [ ] **Step 3: Add the Vitest config**

Create `vitest.config.ts`:

```ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"]
  }
});
```

- [ ] **Step 4: Add shared Next.js test mocks**

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props)
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => React.createElement("a", { href, ...props }, children)
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/")
}));
```

- [ ] **Step 5: Write the failing navigation contract test**

Create `tests/lib/site-config.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { siteConfig } from "@/lib/site";

describe("siteConfig.navigation", () => {
  it("exposes only Home in the primary navigation", () => {
    expect(siteConfig.navigation).toEqual([{ href: "/", key: "home" }]);
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run:

```bash
npm run test -- tests/lib/site-config.test.ts
```

Expected:
- `FAIL`
- The diff shows extra entries for `/about`, `/books`, `/projects`, and `/skills`

- [ ] **Step 7: Make the navigation change in `src/lib/site.ts`**

Replace the `navigation` array with:

```ts
export const siteConfig = {
  name: "He Junbo",
  description:
    "AI-native product explorer building a focused fitness app, a reusable content system, and a long-term personal brand around AIPM practice.",
  url: "https://junbohe.dev",
  navigation: [{ href: "/", key: "home" }] as const
};
```

- [ ] **Step 8: Run the test to verify it passes**

Run:

```bash
npm run test -- tests/lib/site-config.test.ts
```

Expected:
- `PASS`

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tests/setup.ts tests/lib/site-config.test.ts src/lib/site.ts
git commit -m "test: add homepage-only nav regression coverage"
```

## Task 2: Slim the homepage content model and encode the 3-question closing module

**Files:**
- Create: `tests/lib/about-content.test.ts`
- Modify: `src/types/about.ts`
- Modify: `src/content/en/about.json`
- Modify: `src/content/zh/about.json`

- [ ] **Step 1: Write the failing content-shape test**

Create `tests/lib/about-content.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { getAbout } from "@/lib/about";

describe("about content", () => {
  it("provides three workflow steps and three thinking questions for the homepage", () => {
    const about = getAbout("en");

    expect(about.workflow.steps).toHaveLength(3);
    expect(about.thinkingQuestions).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test -- tests/lib/about-content.test.ts
```

Expected:
- `FAIL`
- The failure says `thinkingQuestions` is missing and/or `workflow.steps` does not have length `3`

- [ ] **Step 3: Simplify `src/types/about.ts`**

Replace the file with:

```ts
export interface SocialLink {
  label: string;
  href: string;
  value: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface Workflow {
  steps: WorkflowStep[];
}

export interface About {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  avatar: string;
  socials: SocialLink[];
  workflow: Workflow;
  thinkingQuestions: string[];
}
```

- [ ] **Step 4: Replace `src/content/en/about.json` with the homepage-focused version**

```json
{
  "name": "Junbo He",
  "title": "AIPM / AI-native product explorer",
  "tagline": "I use AI-native product workflows to study user demand, define products, and push ideas into working software.",
  "bio": [
    "I am a computer science student building in public while exploring what product work looks like in the AI era.",
    "Right now, my main line of work is a fitness app built specifically for gym users and shaped by deliberate subtraction."
  ],
  "avatar": "/images/avatar-junbo.svg",
  "socials": [
    {
      "label": "Email",
      "href": "mailto:2909066560@qq.com",
      "value": "2909066560@qq.com"
    },
    {
      "label": "GitHub",
      "href": "https://github.com/Jasper-bo",
      "value": "github.com/Jasper-bo"
    },
    {
      "label": "X",
      "href": "https://x.com/mniu61934",
      "value": "@mniu61934"
    }
  ],
  "workflow": {
    "steps": [
      {
        "title": "AI captures demand",
        "description": "I start by gathering recurring user needs, complaints, and patterns before defining features."
      },
      {
        "title": "AI defines the product",
        "description": "I use AI to pressure-test user value, scope, documentation, and the logic behind what deserves to exist."
      },
      {
        "title": "AI helps ship the interface",
        "description": "I move structured design intent into markdown, HTML, and code so the delivery loop stays short."
      }
    ]
  },
  "thinkingQuestions": [
    "What kind of product judgement becomes more valuable, not less, in an AI-native workflow?",
    "How far should a gym-focused app go before it stops being meaningfully focused?",
    "What does a strong AIPM personal brand look like when it is built on real shipping instead of abstract claims?"
  ]
}
```

- [ ] **Step 5: Replace `src/content/zh/about.json` with the homepage-focused version**

```json
{
  "name": "贺俊博",
  "title": "AIPM / AI 原生产品探索者",
  "tagline": "我用 AI 原生产品工作流去抓用户需求、定义产品方向，并把想法更快推进到可运行的软件里。",
  "bio": [
    "我是计算机专业学生，也是在公开构建中的 AI 时代产品探索者。",
    "目前最核心的一条主线，是一款只服务健身房用户、并且坚持做减法的 Fitness App。"
  ],
  "avatar": "/images/avatar-junbo.svg",
  "socials": [
    {
      "label": "邮箱",
      "href": "mailto:2909066560@qq.com",
      "value": "2909066560@qq.com"
    },
    {
      "label": "GitHub",
      "href": "https://github.com/Jasper-bo",
      "value": "github.com/Jasper-bo"
    },
    {
      "label": "X",
      "href": "https://x.com/mniu61934",
      "value": "@mniu61934"
    }
  ],
  "workflow": {
    "steps": [
      {
        "title": "AI 抓用户需求",
        "description": "在定义功能之前，先用 AI 收集重复出现的需求、吐槽和行为模式。"
      },
      {
        "title": "AI 定义产品",
        "description": "让 AI 协助厘清用户价值、范围边界、文档结构，以及为什么这个产品值得存在。"
      },
      {
        "title": "AI 推进交付",
        "description": "把结构化设计说明推进到 markdown、HTML 和代码，让交付链路尽量短。"
      }
    ]
  },
  "thinkingQuestions": [
    "在 AI 原生工作流里，什么样的产品判断会变得更重要，而不是更廉价？",
    "一款只服务健身房用户的产品，做到什么程度才算真正聚焦？",
    "一个真正有说服力的 AIPM 个人品牌，应该如何建立在真实项目而不是空泛标签上？"
  ]
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run:

```bash
npm run test -- tests/lib/about-content.test.ts
```

Expected:
- `PASS`

- [ ] **Step 7: Commit**

```bash
git add tests/lib/about-content.test.ts src/types/about.ts src/content/en/about.json src/content/zh/about.json
git commit -m "refactor: slim homepage content model"
```

## Task 3: Rebuild the homepage as four sections only

**Files:**
- Create: `tests/views/home-page.test.tsx`
- Create: `src/components/sections/current-build-section.tsx`
- Create: `src/components/sections/how-i-work-section.tsx`
- Create: `src/components/sections/signals-section.tsx`
- Modify: `src/lib/dictionaries.ts`
- Modify: `src/views/home-page.tsx`
- Modify: `src/components/sections/hero-section.tsx`

- [ ] **Step 1: Write the failing homepage regression test**

Create `tests/views/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePageView } from "@/views/home-page";

describe("HomePageView", () => {
  it("renders the four-section single-page narrative and removes old homepage preview sections", () => {
    render(<HomePageView locale="en" />);

    expect(screen.getByRole("heading", { level: 1, name: /Junbo He/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /What I'm Building/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /How I Work/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Three Questions I'm Thinking About Lately/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Browse reading archive/i })).toHaveAttribute(
      "href",
      "/books"
    );

    expect(screen.queryByText(/Current Focus/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Selected Work/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Capabilities/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /About me/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /View projects/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test -- tests/views/home-page.test.tsx
```

Expected:
- `FAIL`
- The test cannot find the new section headings
- The old section text and CTA links are still present

- [ ] **Step 3: Add new homepage dictionary sections**

In `src/lib/dictionaries.ts`, extend `AppDictionary` with:

```ts
  currentBuild: {
    eyebrow: string;
    title: string;
    description: string;
    forLabel: string;
    whyLabel: string;
    stageLabel: string;
  };
  workingMethod: {
    eyebrow: string;
    title: string;
    description: string;
  };
  signals: {
    eyebrow: string;
    title: string;
    description: string;
    booksArchive: string;
  };
```

Add these English values:

```ts
    currentBuild: {
      eyebrow: "Current Build",
      title: "What I'm Building",
      description:
        "The site should make one product line easy to understand: a focused fitness app for gym users.",
      forLabel: "Built for",
      whyLabel: "Why this exists",
      stageLabel: "Current stage"
    },
    workingMethod: {
      eyebrow: "Method",
      title: "How I Work",
      description:
        "I am not trying to present a skill inventory here. What matters is the loop I use to move from demand to product and then to code."
    },
    signals: {
      eyebrow: "Signals",
      title: "Three Questions I'm Thinking About Lately",
      description:
        "These are the questions currently shaping my judgement, product direction, and writing.",
      booksArchive: "Browse reading archive"
    },
```

Add these Chinese values:

```ts
    currentBuild: {
      eyebrow: "当前构建",
      title: "我现在在做什么",
      description:
        "这里应该只让用户理解一条主线：一款更聚焦健身房用户的 Fitness App。",
      forLabel: "面向谁",
      whyLabel: "为什么要做",
      stageLabel: "当前阶段"
    },
    workingMethod: {
      eyebrow: "方法",
      title: "我如何工作",
      description:
        "这里不再展示技能清单，而是展示我如何把用户需求、产品定义和代码交付串成一个闭环。"
    },
    signals: {
      eyebrow: "最近信号",
      title: "我最近在思考的三个问题",
      description:
        "这些问题正在影响我的判断、产品方向和公开写作。",
      booksArchive: "查看读书归档"
    },
```

- [ ] **Step 4: Replace `src/components/sections/hero-section.tsx` with a simplified hero**

```tsx
import Image from "next/image";

import { Container } from "@/components/layout/container";
import type { Locale } from "@/lib/i18n";
import type { About } from "@/types";

interface HeroSectionProps {
  about: About;
  locale: Locale;
}

export function HeroSection({ about }: HeroSectionProps) {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:items-center">
          <div className="surface surface-strong p-8 sm:p-10 lg:p-12">
            <div className="space-y-5">
              <p className="eyebrow">AIPM</p>
              <p className="max-w-2xl font-serif text-xl italic text-foreground/62 sm:text-2xl">
                {about.title}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                {about.name}
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-foreground/84 sm:text-2xl sm:leading-9">
                {about.tagline}
              </p>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {about.bio[0]}
              </p>
            </div>
          </div>

          <aside className="surface p-6 sm:p-8">
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/25 shadow-card">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Create `src/components/sections/current-build-section.tsx`**

```tsx
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { Tag } from "@/components/shared/tag";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/types";

interface CurrentBuildSectionProps {
  project: Project;
  locale: Locale;
}

export function CurrentBuildSection({
  project,
  locale
}: CurrentBuildSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.currentBuild.eyebrow}
          title={dictionary.currentBuild.title}
          description={dictionary.currentBuild.description}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <article className="surface surface-strong p-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {project.title}
            </h3>
            <p className="mt-3 text-base leading-8 text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {dictionary.currentBuild.whyLabel}
                </p>
                <p>{project.problem}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {dictionary.currentBuild.stageLabel}
                </p>
                <p>{project.status}</p>
              </div>
            </div>
          </article>

          <aside className="surface p-8">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {dictionary.currentBuild.forLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.targetUsers.map((item) => (
                  <Tag key={item} variant="outline">
                    {item}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-foreground">Difference</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {project.solution}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Create `src/components/sections/how-i-work-section.tsx`**

```tsx
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { About } from "@/types";

interface HowIWorkSectionProps {
  about: About;
  locale: Locale;
}

export function HowIWorkSection({ about, locale }: HowIWorkSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.workingMethod.eyebrow}
          title={dictionary.workingMethod.title}
          description={dictionary.workingMethod.description}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {about.workflow.steps.map((step, index) => (
            <article
              key={step.title}
              data-liquid
              className="surface surface-subtle min-h-[220px] rounded-[1.75rem] p-6"
            >
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                0{index + 1}
              </p>
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Create `src/components/sections/signals-section.tsx`**

```tsx
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/shared/section-title";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import type { About } from "@/types";

interface SignalsSectionProps {
  about: About;
  locale: Locale;
}

export function SignalsSection({ about, locale }: SignalsSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="py-10 sm:py-14">
      <Container className="space-y-8">
        <SectionTitle
          eyebrow={dictionary.signals.eyebrow}
          title={dictionary.signals.title}
          description={dictionary.signals.description}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4">
            {about.thinkingQuestions.map((question, index) => (
              <article
                key={question}
                data-liquid
                className="surface surface-subtle rounded-[1.75rem] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  0{index + 1}
                </p>
                <p className="mt-3 text-base leading-8 text-foreground/88">{question}</p>
              </article>
            ))}
          </div>

          <aside className="surface p-6 sm:p-8">
            <div className="space-y-3">
              {about.socials.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="surface surface-subtle flex items-center justify-between rounded-[1.5rem] px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 border-t border-white/18 pt-6">
              <Link
                href={localizePath("/books", locale)}
                className="text-sm font-semibold text-foreground transition hover:text-accent"
              >
                {dictionary.signals.booksArchive}
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 8: Replace `src/views/home-page.tsx`**

```tsx
import { CurrentBuildSection } from "@/components/sections/current-build-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowIWorkSection } from "@/components/sections/how-i-work-section";
import { SignalsSection } from "@/components/sections/signals-section";
import { getAbout } from "@/lib/about";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/site";

export function getHomePageMetadata(locale: Locale) {
  const metadata = getDictionary(locale).metadata.home;

  return buildMetadata({
    title: metadata.title,
    description: metadata.description,
    locale
  });
}

interface HomePageViewProps {
  locale: Locale;
}

export function HomePageView({ locale }: HomePageViewProps) {
  const about = getAbout(locale);
  const primaryProject = getProjectBySlug("fitness-app", locale);

  if (!primaryProject) {
    throw new Error('Missing primary project "fitness-app"');
  }

  return (
    <>
      <HeroSection about={about} locale={locale} />
      <CurrentBuildSection project={primaryProject} locale={locale} />
      <HowIWorkSection about={about} locale={locale} />
      <SignalsSection about={about} locale={locale} />
    </>
  );
}
```

- [ ] **Step 9: Run the homepage regression test**

Run:

```bash
npm run test -- tests/views/home-page.test.tsx
```

Expected:
- `PASS`

- [ ] **Step 10: Commit**

```bash
git add tests/views/home-page.test.tsx src/lib/dictionaries.ts src/views/home-page.tsx src/components/sections/hero-section.tsx src/components/sections/current-build-section.tsx src/components/sections/how-i-work-section.tsx src/components/sections/signals-section.tsx
git commit -m "feat: rebuild homepage as a four-section narrative"
```

## Task 4: Retire top-level route surface and keep only the books archive + project detail routes

**Files:**
- Create: `tests/app/sitemap.test.ts`
- Modify: `src/app/sitemap.ts`
- Delete: `src/app/about/page.tsx`
- Delete: `src/app/[locale]/about/page.tsx`
- Delete: `src/app/skills/page.tsx`
- Delete: `src/app/[locale]/skills/page.tsx`
- Delete: `src/app/projects/page.tsx`
- Delete: `src/app/[locale]/projects/page.tsx`

- [ ] **Step 1: Write the failing sitemap regression test**

Create `tests/app/sitemap.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("keeps only home, books, and project detail pages in the published route surface", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.some((url) => url.endsWith("/about"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/skills"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/projects"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/books"))).toBe(true);
    expect(urls.some((url) => url.includes("/projects/fitness-app"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm run test -- tests/app/sitemap.test.ts
```

Expected:
- `FAIL`
- The assertion fails because `/about`, `/skills`, and `/projects` are still present in the sitemap

- [ ] **Step 3: Update `src/app/sitemap.ts`**

Replace the `staticPaths` declaration with:

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/books"];

  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}${localizePath(path || "/", locale)}`,
      lastModified: new Date()
    }))
  );

  const projectRoutes = locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      url: `${siteConfig.url}${localizePath(`/projects/${project.slug}`, locale)}`,
      lastModified: new Date(project.updatedAt)
    }))
  );

  return [...staticRoutes, ...projectRoutes];
}
```

- [ ] **Step 4: Delete the retired route entry files**

Run:

```bash
git rm src/app/about/page.tsx src/app/[locale]/about/page.tsx src/app/skills/page.tsx src/app/[locale]/skills/page.tsx src/app/projects/page.tsx src/app/[locale]/projects/page.tsx
```

Expected:
- `rm 'src/app/about/page.tsx'`
- `rm 'src/app/[locale]/about/page.tsx'`
- `rm 'src/app/skills/page.tsx'`
- `rm 'src/app/[locale]/skills/page.tsx'`
- `rm 'src/app/projects/page.tsx'`
- `rm 'src/app/[locale]/projects/page.tsx'`

- [ ] **Step 5: Run the sitemap regression test**

Run:

```bash
npm run test -- tests/app/sitemap.test.ts
```

Expected:
- `PASS`

- [ ] **Step 6: Commit**

```bash
git add tests/app/sitemap.test.ts src/app/sitemap.ts
git commit -m "refactor: retire top-level about skills and projects routes"
```

## Task 5: Remove dead surfaces, update docs, and run the full verification suite

**Files:**
- Delete: `src/views/about-page.tsx`
- Delete: `src/views/skills-page.tsx`
- Delete: `src/views/skills-page-client.tsx`
- Delete: `src/views/projects-page.tsx`
- Delete: `src/components/sections/current-focus-section.tsx`
- Delete: `src/components/sections/featured-projects-section.tsx`
- Delete: `src/components/sections/reading-shelf-section.tsx`
- Delete: `src/components/sections/core-skills-section.tsx`
- Delete: `src/components/cards/project-card.tsx`
- Delete: `src/components/cards/skill-card.tsx`
- Modify: `README.md`

- [ ] **Step 1: Remove the dead views and homepage preview components**

Run:

```bash
git rm src/views/about-page.tsx src/views/skills-page.tsx src/views/skills-page-client.tsx src/views/projects-page.tsx src/components/sections/current-focus-section.tsx src/components/sections/featured-projects-section.tsx src/components/sections/reading-shelf-section.tsx src/components/sections/core-skills-section.tsx src/components/cards/project-card.tsx src/components/cards/skill-card.tsx
```

Expected:
- `rm ...` for each file listed above

- [ ] **Step 2: Update the README project description and structure**

Replace the opening description and tree excerpt in `README.md` with:

```md
# Jasper-bo.github.io

我的个人博客，基于 Next.js 15 + TypeScript + Tailwind CSS 构建。

当前版本聚焦于一个单页主站叙事：用最短路径说明我是一个 AIPM / AI 原生产品探索者，以及我正在构建一款只服务健身房用户的 Fitness App。

## 项目结构

```text
src/
├── app/
│   ├── [locale]/
│   ├── books/
│   ├── projects/[slug]/
│   └── ...
├── components/
│   ├── layout/
│   ├── sections/
│   └── shared/
├── content/
├── lib/
├── types/
└── views/
```
```

- [ ] **Step 3: Run the full test suite**

Run:

```bash
npm run test
```

Expected:
- `PASS`
- All `tests/**/*.test.ts(x)` files pass

- [ ] **Step 4: Run the type checker**

Run:

```bash
npm run typecheck
```

Expected:
- exit code `0`
- no TypeScript errors

- [ ] **Step 5: Run the production build**

Run:

```bash
npm run build
```

Expected:
- `Compiled successfully`
- `Generating static pages ...`
- no missing-route or missing-import errors

- [ ] **Step 6: Commit**

```bash
git add README.md
git commit -m "chore: remove retired blog surfaces and update docs"
```

## Self-Review

### Spec coverage

- Single-page primary-site direction: covered by Tasks 1, 3, and 4
- Homepage answers four questions only: covered by Task 3
- `About` and `Skills` removed from the active site: covered by Tasks 4 and 5
- `Projects` removed from primary site flow while keeping detail pages secondary: covered by Task 4
- `Books` demoted to a low-priority archive: covered by Tasks 3 and 4
- Success criteria around faster comprehension and no repeated explanation: enforced by Task 3’s homepage regression test and Task 4’s sitemap regression test

### Placeholder scan

- No deferred or vague implementation language remains
- All code-changing steps include concrete code or concrete file deletion commands
- Every verification step names the exact command to run

### Type consistency

- `About` becomes the single homepage content source for identity, workflow, and `thinkingQuestions`
- `HomePageView` uses `getProjectBySlug("fitness-app", locale)` as the single project source
- New section names are consistently `currentBuild`, `workingMethod`, and `signals`
