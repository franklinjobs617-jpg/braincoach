"use client";

import { Target, Brain, ArrowRight, Check, Sparkles, ChevronRight, Home, BarChart3, Zap, Lightbulb, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

export default function GoalAlignmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      {/* 动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* 导航栏 */}
      <nav className="relative sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/zh" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">BrainAI</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/zh/task-prioritization" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">任务优先级</Link>
            <Link href="/zh/second-brain" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">第二大脑</Link>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200" asChild>
              <Link href="/zh/app">免费试用</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "目标对齐" }]} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 border-indigo-200">
            <Target className="w-4 h-4 mr-2 inline" />
            AI 目标对齐
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-700 to-violet-700 bg-clip-text text-transparent">
              让每个任务都对准你的目标
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 leading-relaxed mb-4 font-medium">
            不再做无关紧要的任务。BrainAI 自动将你的每日待办事项与长期目标连接起来。
          </p>
          
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            无论你使用的是 OKR、季度目标还是个人愿望，BrainAI 确保你处理的每个任务都
            <strong>与真正重要的事情对齐</strong>。我们的 AI 分析你的任务和目标之间的联系，发现你可能错过的差距和机会。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-200 transform hover:scale-105 transition-all" asChild>
              <Link href="/zh/app">
                设置你的目标 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-indigo-200 hover:bg-indigo-50" asChild>
              <Link href="/zh/task-prioritization">
                探索任务优先级 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">AI 目标对齐如何工作</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            BrainAI 通过智能分析将你的日常任务与长期目标连接起来
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "定义你的目标", desc: "设定季度、月度或项目目标，带有明确的成功指标", icon: Target },
              { step: "02", title: "AI 分析任务", desc: "我们的 AI 检查每个任务并根据你设定的目标评分对齐度", icon: Sparkles },
              { step: "03", title: "智能推荐", desc: "获得 AI 驱动的建议，了解哪些任务会产生最大影响", icon: Lightbulb },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Card className="border-indigo-100 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-bold text-indigo-200">{item.step}</span>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-indigo-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* OKR Section */}
        <section className="mb-20">
          <Card className="border-indigo-200 shadow-2xl shadow-indigo-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200">
                    <Rocket className="w-4 h-4 mr-2" />
                    OKR 集成
                  </Badge>
                  <h2 className="text-2xl font-bold mb-4">将你的 OKR 连接到日常行动</h2>
                  <p className="text-slate-600 mb-6">
                    BrainAI 与你的 OKR 框架集成，自动建议推进每个目标的任务。
                    再也不用怀疑自己是否在做正确的事情。
                  </p>
                  <ul className="space-y-3">
                    {[
                      "自动将任务映射到特定的关键结果",
                      "实时跟踪目标进展",
                      "当任务与目标不对齐时获得提醒",
                      "每周 AI 生成的目标进展报告",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-indigo-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800">目标：增加收入</span>
                        <Badge className="bg-green-100 text-green-700">75%</Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-indigo-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800">KR：获得 50 个新客户</span>
                        <Badge className="bg-yellow-100 text-yellow-700">60%</Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-indigo-600">AI 推荐任务：</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">跟进潜在客户</Badge>
                        <Badge variant="outline" className="text-xs">启动推荐计划</Badge>
                        <Badge variant="outline" className="text-xs">优化落地页</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Links */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">探索更多</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/zh/task-prioritization" className="group p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl transition-all">
              <BarChart3 className="w-8 h-8 mb-3 text-indigo-400" />
              <h3 className="font-bold text-lg mb-2">任务优先级</h3>
              <p className="text-sm text-slate-300 mb-3">了解 AI 如何按目标对齐度优先级排序任务</p>
              <span className="text-indigo-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/zh/second-brain" className="group p-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-xl transition-all">
              <Brain className="w-8 h-8 mb-3 text-violet-200" />
              <h3 className="font-bold text-lg mb-2">构建你的第二大脑</h3>
              <p className="text-sm text-violet-100 mb-3">探索 PARA 方法来组织你的目标</p>
              <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/zh/app" className="group p-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border border-slate-200 hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 mb-3 text-indigo-600" />
              <h3 className="font-bold text-lg mb-2">免费试用 BrainAI</h3>
              <p className="text-sm text-slate-600 mb-3">今天就开始对齐任务与目标</p>
              <span className="text-indigo-600 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                开始使用 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">什么是目标对齐？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                目标对齐是确保你的日常任务和活动直接支持你更大目标的实践。当任务与目标对齐时，你采取的每个行动都会让你更接近真正重要的事情。
                <Link href="/zh/task-prioritization" className="text-indigo-600 hover:underline">了解任务优先级如何帮助保持这种对齐</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">AI 如何判断目标对齐度？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                BrainAI 使用自然语言处理分析你的任务和目标之间的语义关系。它考虑关键词、背景和陈述目标等因素来评分每个任务对目标的支撑程度。对齐度越高，任务的影响力越大。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">没有 OKR 也能使用 BrainAI 吗？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                当然可以！虽然 BrainAI 与正式的 OKR 框架配合得很好，但你也可以将它用于简单目标，如&quot;学习新技能&quot;或&quot;开始一个副项目&quot;。AI 会适应你的目标设定风格，无论是否结构化。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">任务优先级和目标对齐有什么区别？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                任务优先级按紧急程度和重要性排序任务。目标对齐确保任务与你的长期目标相关联。BrainAI 结合两者：<strong>目标对齐决定哪些任务重要</strong>，而<strong>优先级决定何时做</strong>。
                <Link href="/zh/task-prioritization" className="text-indigo-600 hover:underline">了解更多</Link>。
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
            <p className="text-sm">你的 AI 效率教练，实现目标对齐和任务优先级排序。</p>
            <div className="flex gap-6 text-sm">
              <Link href="/en/goal-alignment" className="hover:text-white transition-colors">English</Link>
              <Link href="/zh/app" className="hover:text-white transition-colors">开始使用</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
