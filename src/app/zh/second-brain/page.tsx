"use client";

import { Brain, Target, ArrowRight, Check, Sparkles, ChevronRight, Home, BarChart3, BookOpen, MessageCircle, Layers, Clock, Users, Zap, Lightbulb, Archive, FolderKanban, FileText, Briefcase, TrendingUp, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";

// 面包屑导航组件
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
      <Link href="/zh" className="hover:text-violet-600 transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        首页
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-slate-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-violet-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export default function SecondBrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-violet-50">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* 导航栏 */}
      <nav className="relative sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-violet-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/zh" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">BrainAI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/zh/task-prioritization" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">任务优先级</Link>
            <Link href="/zh/goal-alignment" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">目标对齐</Link>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200" asChild>
              <Link href="/zh/app">免费试用</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "第二大脑" }]} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-700 border-violet-200">
            <Archive className="w-4 h-4 mr-2 inline" />
            第二大脑
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
              构建你的 AI 驱动第二大脑
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 leading-relaxed mb-4 font-medium">
            告别遗忘创意。让 AI 捕获一切，并在你需要时呈现重要信息。
          </p>
          
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            第二大脑概念由 Tiago Forte 推广，帮助你有效地捕获、整理和检索信息。
            BrainAI 用<strong>AI 驱动的检索和任务连接</strong>增强这一点——你的笔记自动变成可操作的洞察。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-200 transform hover:scale-105 transition-all" asChild>
              <Link href="/zh/app">
                构建你的第二大脑 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-violet-200 hover:bg-violet-50" asChild>
              <Link href="/zh/task-prioritization">
                探索任务优先级 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* PARA Method */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700 border-violet-200">
              <BookOpen className="w-4 h-4 mr-2" />
              PARA 方法
            </Badge>
            <h2 className="text-3xl font-bold mb-4">用 PARA 组织一切</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              PARA（项目、项目域、资源、归档）是一个通用的信息组织系统。
              BrainAI 通过 AI 智能实现了这个系统。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { letter: "P", name: "项目", desc: "有时间限制的目标", color: "from-violet-500 to-violet-600", icon: FolderKanban, example: "上线新网站，写书章节" },
              { letter: "A", name: "项目域", desc: "持续的责任范围", color: "from-indigo-500 to-indigo-600", icon: Briefcase, example: "健康、财务、职业" },
              { letter: "R", name: "资源", desc: "持续感兴趣的主题", color: "from-blue-500 to-blue-600", icon: FileText, example: "AI 研究，设计灵感" },
              { letter: "A", name: "归档", desc: "已完成或不活跃的项目", color: "from-slate-500 to-slate-600", icon: Archive, example: "旧项目，过往笔记" },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className={cn("h-2 bg-gradient-to-r", item.color)} />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br", item.color)}>
                      {item.letter}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">&quot;{item.example}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* BrainAI Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">BrainAI 如何增强你的第二大脑</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI 驱动搜索", desc: "用自然语言提问，立即从你的笔记中获取答案", icon: Lightbulb },
              { title: "自动连接", desc: "AI 自动连接相关笔记和任务，构建知识图谱", icon: Layers },
              { title: "任务提取", desc: "从会议笔记和文档中自动提取可执行事项", icon: Check },
              { title: "智能摘要", desc: "AI 生成冗长文档的摘要，节省你的阅读时间", icon: Sparkles },
              { title: "目标上下文", desc: "你的笔记自动标记相关目标和项目", icon: Target },
              { title: "每周摘要", desc: "AI 每周从你的第二大脑中策展最相关的信息", icon: TrendingUp },
            ].map((feature, index) => (
              <Card key={index} className="border-violet-100 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">探索更多</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/zh/task-prioritization" className="group p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl transition-all">
              <BarChart3 className="w-8 h-8 mb-3 text-violet-400" />
              <h3 className="font-bold text-lg mb-2">任务优先级</h3>
              <p className="text-sm text-slate-300 mb-3">了解 AI 如何按重要性优先级排序任务</p>
              <span className="text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/zh/goal-alignment" className="group p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-xl transition-all">
              <Target className="w-8 h-8 mb-3 text-indigo-200" />
              <h3 className="font-bold text-lg mb-2">目标对齐</h3>
              <p className="text-sm text-indigo-100 mb-3">将你的第二大脑与目标连接起来</p>
              <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/zh/app" className="group p-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border border-slate-200 hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 mb-3 text-violet-600" />
              <h3 className="font-bold text-lg mb-2">免费试用 BrainAI</h3>
              <p className="text-sm text-slate-600 mb-3">今天就开始构建你的第二大脑</p>
              <span className="text-violet-600 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                开始使用 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">什么是第二大脑？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                第二大脑是一个外部数字系统，用于存储和组织你的知识、想法和信息。它作为你生物记忆的扩展，允许你捕获一切并在需要时检索。
                <Link href="https://fortelabs.com/blog/basboverview/" target="_blank" rel="noopener" className="text-violet-600 hover:underline">了解更多关于第二大脑概念</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">什么是 PARA 方法？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                PARA 是由 Tiago Forte 开发的笔记组织系统。它将信息分为四类：
                <strong>项目</strong>（活跃目标）、<strong>项目域</strong>（持续责任）、
                <strong>资源</strong>（感兴趣的主题）和<strong>归档</strong>（不活跃的项目）。
                BrainAI 通过 AI 连接项目实现了这个系统。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">AI 如何增强第二大脑？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                传统的笔记应用依赖手动连接和搜索。BrainAI 使用 AI 自动：
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>连接相关的笔记和任务</li>
                  <li>从文档中提取可执行事项</li>
                  <li>从你的知识库中回答问题</li>
                  <li>主动呈现相关信息</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">BrainAI 与 Notion/Obsidian 有什么区别？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Notion 和 Obsidian 是强大的工具，但需要手动组织。BrainAI 专注于<strong>自动智能</strong>：AI 为你做连接、摘要和呈现。
                把 BrainAI 想象成一个<strong>AI 效率教练</strong>，与你的现有知识协同工作。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">BrainAI</span>
            </div>
            <p className="text-sm">你的 AI 驱动第二大脑，实现知识管理和效率提升。</p>
            <div className="flex gap-6 text-sm">
              <Link href="/en/second-brain" className="hover:text-white transition-colors">English</Link>
              <Link href="/zh/app" className="hover:text-white transition-colors">开始使用</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
