"use client";

import { useState, useEffect } from "react";
import { Mic, Sparkles, ArrowRight, Check, Play, Brain, Target, Zap, Clock, BookOpen, Layers, MessageCircle, TrendingUp, ChevronRight, Home, BarChart3, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
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

interface ParsedTask {
  task: string;
  priority: number;
  reason: string;
}

// 动画计数器组件
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{count.toLocaleString()}</span>;
}

export default function TaskPrioritizationPage() {
  const [taskInput, setTaskInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [parsedTasks, setParsedTasks] = useState<ParsedTask[]>([]);
  const [showDemo, setShowDemo] = useState(false);

  const handleAnalyze = async () => {
    if (!taskInput.trim()) return;
    setIsAnalyzing(true);
    setShowDemo(true);

    try {
      const response = await fetch("/api/analyze-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: taskInput, language: "zh" }),
      });

      const data = await response.json();
      setParsedTasks(data.tasks || []);
    } catch {
      const sampleTasks: ParsedTask[] = [
        { task: "完成 Q4 报告", priority: 9, reason: "高影响，截止日期临近" },
        { task: "审查营销策略", priority: 8, reason: "有助于 Q4 目标" },
        { task: "计划周末旅行", priority: 4, reason: "个人事项，时间灵活" },
        { task: "给妈妈打电话", priority: 6, reason: "重要的人际关系维护" },
      ];
      setParsedTasks(sampleTasks);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "bg-red-100 text-red-700 border-red-200";
    if (priority >= 6) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

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
            <Link href="/zh/goal-alignment" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">目标对齐</Link>
            <Link href="/zh/second-brain" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">第二大脑</Link>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200" asChild>
              <Link href="/zh/app">免费试用</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "任务优先级" }]} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-700 border-violet-200">
            <BarChart3 className="w-4 h-4 mr-2 inline" />
            AI 任务优先级
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
              智能任务优先级，让重要的事不再被遗忘
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 leading-relaxed mb-4 font-medium">
            告别猜测，让 AI 分析你的任务并根据影响力、紧急程度和目标对齐度进行排序。
          </p>
          
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            BrainAI 使用先进的 AI 技术自动根据多个因素对你的任务进行<strong>优先级排序</strong>：
            截止日期、所需精力、对目标的影响以及当前工作量。
            <Link href="/zh" className="text-violet-600 hover:underline ml-1">了解更多关于 AI 每日计划</Link>。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-200 transform hover:scale-105 transition-all" asChild>
              <Link href="/zh/app">
                试用 AI 优先级排序 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-violet-200 hover:bg-violet-50" asChild>
              <Link href="/zh/goal-alignment">
                了解更多：目标对齐 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Demo Section */}
        <section className="mb-20">
          <Card className="border-violet-200 shadow-2xl shadow-violet-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 animate-pulse" />
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-violet-600" />
                立即体验 - 输入你的任务
              </h2>
              <div className="flex gap-3 mb-4">
                <Textarea
                  placeholder="在这里输入你的任务，例如：完成 Q4 报告、给妈妈打电话、计划周末旅行、审查营销策略"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="min-h-[120px] resize-none border-violet-200 focus:border-violet-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-violet-600">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={!taskInput.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      AI 正在分析中...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      优先级排序我的任务
                    </>
                  )}
                </Button>
              </div>

              {showDemo && (
                <div className="mt-6 pt-6 border-t border-violet-100">
                  <h3 className="font-semibold mb-4 text-slate-700 flex items-center gap-2">
                    <Target className="w-5 h-5 text-violet-600" />
                    AI 优先级排序结果：
                  </h3>
                  <div className="space-y-3">
                    {parsedTasks.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-white to-violet-50 border border-violet-100 hover:shadow-md transition-all"
                      >
                        <span className={cn("px-3 py-1 rounded-full text-sm font-bold border", getPriorityColor(item.priority))}>
                          #{item.priority}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{item.task}</p>
                          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {item.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Methods Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">流行的任务优先级方法</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "艾森豪威尔矩阵", desc: "紧急 vs 重要", icon: Target, color: "from-violet-500 to-violet-600" },
              { name: "ABCDE 方法", desc: "A-E 优先级排序", icon: BarChart3, color: "from-indigo-500 to-indigo-600" },
              { name: "MoSCoW", desc: "必须有/应该有/可以有/不必须有", icon: Layers, color: "from-blue-500 to-blue-600" },
              { name: "AI 驱动", desc: "智能自动优先级", icon: Sparkles, color: "from-green-500 to-green-600" },
            ].map((method, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br", method.color)}>
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{method.name}</h3>
                  <p className="text-sm text-slate-600">{method.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">探索更多</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/zh/goal-alignment" className="group p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl transition-all">
              <Target className="w-8 h-8 mb-3 text-violet-400" />
              <h3 className="font-bold text-lg mb-2">目标对齐</h3>
              <p className="text-sm text-slate-300 mb-3">了解 AI 如何帮助对齐任务与目标</p>
              <span className="text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/zh/second-brain" className="group p-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-xl transition-all">
              <Brain className="w-8 h-8 mb-3 text-violet-200" />
              <h3 className="font-bold text-lg mb-2">构建你的第二大脑</h3>
              <p className="text-sm text-violet-100 mb-3">探索 PARA 方法和 AI 驱动的组织方式</p>
              <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/zh/app" className="group p-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border border-slate-200 hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 mb-3 text-indigo-600" />
              <h3 className="font-bold text-lg mb-2">免费试用 BrainAI</h3>
              <p className="text-sm text-slate-600 mb-3">今天就开始用 AI 优先级排序任务</p>
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
            <AccordionItem value="item-1" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">什么是 AI 任务优先级排序？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                AI 任务优先级排序使用人工智能自动分析和排名你的任务，基于多个因素包括截止日期、所需精力、对目标的影响和当前工作量。与手动优先级排序不同，AI 可以同时处理多个信号并提供客观、数据驱动的排名。<Link href="/zh/app" className="text-violet-600 hover:underline">体验我们的 AI 优先级工具</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">艾森豪威尔矩阵如何与 AI 结合？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                艾森豪威尔矩阵将任务分为四个象限：紧急且重要、重要但不紧急、紧急但不重要、既不紧急也不重要。BrainAI 通过根据任务特征自动将你的任务分类到这些象限来增强这种方法，节省你的时间并确保不会遗漏任何事情。<Link href="/zh/goal-alignment" className="text-violet-600 hover:underline">了解目标对齐</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">AI 能替代人类在优先级排序中的判断吗？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                AI 是一个强大的助手，但不能替代人类判断。BrainAI 提供数据驱动的建议，同时允许你根据 AI 可能不了解的背景覆盖优先级。把它想象成一个<strong>效率教练</strong>，提供建议而不是做决定。
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
            <p className="text-sm">你的 AI 效率教练，实现任务优先级排序和目标对齐。</p>
            <div className="flex gap-6 text-sm">
              <Link href="/en/task-prioritization" className="hover:text-white transition-colors">English</Link>
              <Link href="/zh/app" className="hover:text-white transition-colors">开始使用</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
