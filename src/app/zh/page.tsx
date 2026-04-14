"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Sparkles, ArrowRight, Check, Play, Brain, Target, Zap, Clock, BookOpen, Layers, MessageCircle, TrendingUp, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { zhContent } from "@/lib/i18n/zh";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ParsedTask {
  task: string;
  priority: number;
  reason: string;
}

// Animated counter component
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

// Floating brain visualization
function BrainVisualization() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer orbit */}
      <div className="absolute inset-0 border-2 border-violet-200 rounded-full animate-pulse" />
      <div className="absolute inset-4 border border-indigo-200 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute inset-8 border border-violet-300 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Central brain */}
      <div className="absolute inset-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
        <Brain className="w-16 h-16 text-white animate-pulse" />
      </div>
      
      {/* Orbiting dots */}
      <div className="absolute w-3 h-3 bg-violet-500 rounded-full top-0 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDuration: "3s" }} />
      <div className="absolute w-2 h-2 bg-indigo-500 rounded-full bottom-4 right-8 animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.3s" }} />
      <div className="absolute w-2 h-2 bg-violet-400 rounded-full top-12 left-4 animate-bounce" style={{ animationDuration: "2.8s", animationDelay: "0.6s" }} />
    </div>
  );
}

// PARA concept visualization
function PARAVisualization() {
  const items = [
    { label: "项目", color: "bg-violet-500", icon: Target },
    { label: "领域", color: "bg-blue-500", icon: Layers },
    { label: "资源", color: "bg-green-500", icon: BookOpen },
    { label: "归档", color: "bg-slate-400", icon: Clock },
  ];
  
  return (
    <div className="flex justify-center gap-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-xl bg-white shadow-lg transform transition-all duration-500",
            "hover:scale-110 hover:shadow-xl"
          )}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", item.color)}>
            <item.icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Coach avatar component
function CoachAvatar() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </div>
      <div>
        <p className="font-semibold text-slate-800">AI 教练</p>
        <p className="text-xs text-green-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          随时为你服务
        </p>
      </div>
    </div>
  );
}

export default function ZHLandingPage() {
  const [taskInput, setTaskInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [parsedTasks, setParsedTasks] = useState<ParsedTask[]>([]);
  const [showDemo, setShowDemo] = useState(false);
  const content = zhContent;
  
  const heroRef = useRef<HTMLDivElement>(null);

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
        { task: "完成Q4报告", priority: 9, reason: "高影响，截止日期临近" },
        { task: "审查营销策略", priority: 8, reason: "对Q4目标有贡献" },
        { task: "计划周末旅行", priority: 4, reason: "个人事务，时间灵活" },
        { task: "给妈妈打电话", priority: 6, reason: "重要的关系维护" },
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
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-300 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
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
            <Link href="/zh/second-brain" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">第二大脑</Link>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200" asChild>
              <Link href="/zh/app">开始使用</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">
                <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
                AI 驱动的效率工具
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
                  你的 AI 效率教练
                </span>
              </h1>
              
              {/* Main Slogan - Full Version */}
              <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
                让每件事都对准目标，让重要的事不再被遗忘
              </p>
              
              {/* Sub-description */}
              <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                BrainAI 是你的 AI <strong>每日计划</strong> 和 <strong>效率教练</strong>。
                自动根据<strong>目标对齐度</strong>对任务进行优先级排序，智能提醒你真正重要的事。
              </p>
              
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <CoachAvatar />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-200 transform hover:scale-105 transition-all" asChild>
                  <a href="/zh/app">
                    立即免费试用 <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-violet-200 hover:bg-violet-50" onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>
                  <Play className="w-4 h-4 mr-2" /> 观看演示
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    <AnimatedCounter value={18500} />
                  </p>
                  <p className="text-xs text-slate-500 mt-1">活跃用户</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    <AnimatedCounter value={98} />%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">目标对齐度</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                    <AnimatedCounter value={4.9} />
                  </p>
                  <p className="text-xs text-slate-500 mt-1">用户评分</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <BrainVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* PARA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              <Layers className="w-4 h-4 mr-2" /> PARA 方法论
            </Badge>
            <h2 className="text-3xl font-bold mb-4">基于 PARA 系统构建</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              BrainAI 使用经过验证的 PARA（项目、领域、资源、归档）框架来组织你的生活。
              我们的 AI 自动根据这个系统对你的任务进行分类和优先排序。
            </p>
          </div>
          <PARAVisualization />
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-700">
              <Zap className="w-4 h-4 mr-2" /> 在线演示
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{content.demo.title}</h2>
            <p className="text-slate-600">立即体验 - 输入你的任务，看看 AI 优先级排序是如何工作的</p>
          </div>
          <Card className="border-violet-200 shadow-2xl shadow-violet-100 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 animate-pulse" />
            <CardContent className="p-6">
              <div className="flex gap-3 mb-4">
                <Textarea
                  placeholder={content.demo.placeholder}
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
                      {content.demo.analyzing}
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      {content.demo.button}
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
                        className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-white to-violet-50 border border-violet-100 hover:shadow-md transition-all transform hover:-translate-y-0.5"
                        style={{ animationDelay: `${index * 0.1}s` }}
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
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700">
              核心功能
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{content.features.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { ...content.features.goalAlignment, icon: Target, color: "from-violet-500 to-violet-600" },
              { ...content.features.aiPriority, icon: Zap, color: "from-indigo-500 to-indigo-600" },
              { ...content.features.smartReminders, icon: Clock, color: "from-blue-500 to-blue-600" },
              { ...content.features.dailyPlanner, icon: BookOpen, color: "from-green-500 to-green-600" },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
                <div className={cn("h-2 bg-gradient-to-r", feature.color)} />
                <CardContent className="p-6">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br", feature.color)}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-700">
              为什么选择 BrainAI？
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{content.comparison.title}</h2>
          </div>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-3 gap-6 p-6">
              <div className="font-medium text-slate-500">功能</div>
              <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">{content.comparison.brainai}</div>
              <div className="font-bold text-slate-400">{content.comparison.others}</div>
              {content.comparison.features.map((feature, index) => (
                <div key={index} className="contents">
                  <div className="text-slate-700 font-medium">{feature}</div>
                  <div className="text-violet-600">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="text-slate-300">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700">
              成功故事
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{content.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {content.testimonials.items.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{item.author}</p>
                      <p className="text-sm text-slate-400">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-700">
              常见问题
            </Badge>
            <h2 className="text-3xl font-bold mb-4">{content.faq.title}</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600 transition-colors">什么是 AI 每日计划？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                AI 每日计划使用人工智能帮助你组织、优先级排序和安排任务。与传统的待办事项列表不同，AI 计划器如 BrainAI 会根据你的目标分析任务上下文，并自动建议你应该关注什么。<Link href="/zh/task-prioritization" className="text-violet-600 hover:underline font-medium">了解更多关于 AI 任务优先级</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600 transition-colors">AI 任务优先级如何工作？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                BrainAI 使用先进的 AI 分析你输入的每个任务。它考虑截止日期、所需精力、对目标的影响和当前工作量等因素。然后它提供优先级列表，并解释每个任务排名的原因。<Link href="/zh/task-prioritization" className="text-violet-600 hover:underline font-medium">立即体验</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600 transition-colors">BrainAI 能帮助目标对齐吗？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                当然可以。当你在 BrainAI 中设定目标时，AI 会根据每个目标的重要性和截止日期对任务进行优先级排序。这确保你的日常行动持续推动最重要的事情。<Link href="/zh/goal-alignment" className="text-violet-600 hover:underline font-medium">了解目标对齐</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600 transition-colors">什么是第二大脑，BrainAI 如何帮助？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                第二大脑是一个用于捕获、组织和检索知识的外部系统。BrainAI 实现了<strong>PARA 方法</strong>（项目、项目域、资源、归档），并用 AI 驱动的笔记和任务连接增强它。<Link href="/zh/second-brain" className="text-violet-600 hover:underline font-medium">构建你的第二大脑</Link>。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600 transition-colors">BrainAI 适合作为效率教练吗？</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                是的。BrainAI 通过提供每日推荐、提醒你被忽视的任务和生成每周回顾报告来充当你的个人效率教练，帮助你持续改进。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Topic Pages Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700">
              深度指南
            </Badge>
            <h2 className="text-3xl font-bold mb-4">探索我们的主题指南</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              每个主题页面都致力于帮助你掌握特定的效率概念，配有实用指南和 AI 驱动的工具。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/zh/task-prioritization" className="group p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full">高优先级</span>
              </div>
              <h3 className="font-bold text-lg mb-2">任务优先级</h3>
              <p className="text-sm text-slate-300 mb-4">学习 AI 驱动的方法，如艾森豪威尔矩阵、ABCDE 和 MoSCoW，有效地排列任务优先级。</p>
              <span className="text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                探索指南 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            
            <Link href="/zh/goal-alignment" className="group p-6 rounded-xl bg-gradient-to-br from-indigo-900 to-violet-900 text-white hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">高优先级</span>
              </div>
              <h3 className="font-bold text-lg mb-2">目标对齐</h3>
              <p className="text-sm text-slate-300 mb-4">通过 OKR 集成和 AI 推荐将你的日常任务与长期目标连接起来。</p>
              <span className="text-indigo-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                探索指南 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            
            <Link href="/zh/second-brain" className="group p-6 rounded-xl bg-gradient-to-br from-violet-900 to-purple-900 text-white hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <Archive className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full">中优先级</span>
              </div>
              <h3 className="font-bold text-lg mb-2">构建你的第二大脑</h3>
              <p className="text-sm text-slate-300 mb-4">掌握 PARA 方法，发现 AI 如何增强知识管理和检索。</p>
              <span className="text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                探索指南 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <Brain className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{content.cta.title}</h2>
          <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">{content.cta.subtitle}</p>
          <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 shadow-2xl transform hover:scale-105 transition-all" asChild>
            <a href="/zh/app">{content.cta.button}</a>
          </Button>
        </div>
      </section>

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
            <p className="text-sm text-center">{content.footer.description}</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">{content.footer.links.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{content.footer.links.terms}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Language Switcher */}
      <div className="fixed bottom-6 right-6">
        <Button variant="outline" size="sm" className="shadow-lg bg-white hover:bg-violet-50" asChild>
          <a href="/en">English</a>
        </Button>
      </div>
    </div>
  );
}
