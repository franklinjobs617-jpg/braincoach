# BrainAI - Second Brain Product

## Project Overview

BrainAI is an AI-powered second brain and productivity coach that helps users:
- Prioritize tasks based on goal alignment
- Get AI-driven recommendations for daily focus
- Track progress toward personal goals
- Receive proactive reminders for important tasks

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI Components**: shadcn/ui (based on Radix UI)
- **Styling**: Tailwind CSS 4
- **LLM Integration**: coze-coding-dev-sdk

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Root page (language redirect)
│   ├── layout.tsx                  # Root layout with hreflang
│   ├── en/                         # English version
│   │   ├── layout.tsx             # English layout with metadata
│   │   ├── page.tsx               # English landing page
│   │   └── app/
│   │       ├── layout.tsx         # English app layout
│   │       └── page.tsx           # English dashboard
│   ├── zh/                         # Chinese version
│   │   ├── layout.tsx             # Chinese layout with metadata
│   │   ├── page.tsx               # Chinese landing page
│   │   └── app/
│   │       ├── layout.tsx         # Chinese app layout
│   │       └── page.tsx           # Chinese dashboard
│   └── api/
│       └── analyze-tasks/
│           └── route.ts           # AI task analysis API
├── components/ui/                  # shadcn/ui components
└── lib/
    ├── i18n/
    │   ├── en.ts                  # English content & SEO metadata
    │   └── zh.ts                  # Chinese content & SEO metadata
    └── utils.ts                   # Utility functions
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Root page (redirects based on browser language) |
| `/en` | English landing page with SEO optimization |
| `/zh` | Chinese landing page with SEO optimization |
| `/en/app` | English dashboard (Kanban, Calendar, AI Chat) |
| `/zh/app` | Chinese dashboard |

## SEO Strategy

### Target Keywords

| Priority | English Keywords | Chinese Keywords |
|----------|-----------------|------------------|
| High | daily planner (18,100), productivity coach (590) | 每日计划, 效率教练 |
| Medium | task prioritization (880), goal alignment (260) | 任务优先级, 目标对齐 |
| Low | AI Second Brain (110), AI daily planner (90) | AI 第二大脑, AI 每日计划 |

### SEO Implementation

- [x] Independent meta titles/descriptions per language
- [x] Hreflang tags in root layout
- [x] Schema.org SoftwareApplication structured data
- [x] Open Graph & Twitter Card meta tags
- [x] Sitemap ready structure

## Commands

```bash
pnpm install     # Install dependencies
pnpm dev         # Start development server (port 5000)
pnpm build       # Build for production
pnpm start       # Start production server
```

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=http://localhost:5000
```

## Features (MVP)

### Landing Pages (/en, /zh)

- [x] Hero section with tool demo (remove.bg style)
- [x] Interactive task analyzer demo
- [x] Feature comparison table
- [x] User testimonials
- [x] FAQ section
- [x] CTA section
- [x] Language switcher
- [x] Full SEO optimization

### Dashboard (/en/app, /zh/app)

- [x] Kanban board (To Do, In Progress, Done)
- [x] AI daily recommendations
- [x] Goal progress tracking
- [x] AI Coach chat interface
- [x] Calendar view (placeholder)

### API (/api/analyze-tasks)

- [x] POST endpoint for task analysis
- [x] AI-powered priority scoring
- [x] Streaming response support
- [x] Bilingual support (EN/ZH)
