"use client";

import { useState, useEffect } from "react";
import { Mic, Sparkles, ArrowRight, Brain, Target, Zap, Layers, TrendingUp, ChevronRight, Home, BarChart3, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ParsedTask {
  task: string;
  priority: number;
  reason: string;
}

// Breadcrumb component
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
      <Link href="/en" className="hover:text-violet-600 transition-colors flex items-center gap-1">
        <Home className="w-4 h-4" />
        Home
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
        body: JSON.stringify({ tasks: taskInput, language: "en" }),
      });

      const data = await response.json();
      setParsedTasks(data.tasks || []);
    } catch {
      const sampleTasks: ParsedTask[] = [
        { task: "Finish Q4 report", priority: 9, reason: "High-impact, deadline approaching" },
        { task: "Review marketing strategy", priority: 8, reason: "Contributes to Q4 goals" },
        { task: "Plan weekend trip", priority: 4, reason: "Personal, flexible timing" },
        { task: "Call mom", priority: 6, reason: "Important relationship maintenance" },
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
      </div>

      {/* Navigation */}
      <nav className="relative sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-violet-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/en" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">BrainAI</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/en/goal-alignment" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">Goal Alignment</Link>
            <Link href="/en/second-brain" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">Second Brain</Link>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200" asChild>
              <Link href="/en/app">Try Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "Task Prioritization" }]} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-700 border-violet-200">
            <BarChart3 className="w-4 h-4 mr-2 inline" />
            AI Task Prioritization
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
              Smart Task Prioritization with AI
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 leading-relaxed mb-4 font-medium">
            Stop guessing what to do next. Let AI analyze your tasks and rank them by impact, urgency, and goal alignment.
          </p>
          
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            BrainAI uses advanced AI to automatically <strong>prioritize your tasks</strong> based on multiple factors: 
            deadline, effort required, impact on your goals, and current workload. 
            <Link href="/en" className="text-violet-600 hover:underline ml-1">Learn more about our AI daily planner</Link>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-200 transform hover:scale-105 transition-all" asChild>
              <Link href="/en/app">
                Try AI Prioritization <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-violet-200 hover:bg-violet-50" asChild>
              <Link href="/en/goal-alignment">
                Next: Goal Alignment <ArrowRight className="ml-2 w-4 h-4" />
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
                Try It Now - Enter Your Tasks
              </h2>
              <div className="flex gap-3 mb-4">
                <Textarea
                  placeholder="Type your tasks here, e.g., 'Finish Q4 report, call mom, plan weekend trip, review marketing strategy'"
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
                      AI is analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Prioritize My Tasks
                    </>
                  )}
                </Button>
              </div>

              {showDemo && (
                <div className="mt-6 pt-6 border-t border-violet-100">
                  <h3 className="font-semibold mb-4 text-slate-700 flex items-center gap-2">
                    <Target className="w-5 h-5 text-violet-600" />
                    AI Prioritized Results:
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
          <h2 className="text-3xl font-bold text-center mb-12">Popular Task Prioritization Methods</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Eisenhower Matrix", desc: "Urgent vs Important", icon: Target, color: "from-violet-500 to-violet-600" },
              { name: "ABCDE Method", desc: "Priority A-E ranking", icon: BarChart3, color: "from-indigo-500 to-indigo-600" },
              { name: "MoSCoW", desc: "Must/Should/Could/Won't", icon: Layers, color: "from-blue-500 to-blue-600" },
              { name: "AI-Powered", desc: "Smart auto-prioritization", icon: Sparkles, color: "from-green-500 to-green-600" },
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
          <h2 className="text-2xl font-bold mb-6">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/en/goal-alignment" className="group p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl transition-all">
              <Target className="w-8 h-8 mb-3 text-violet-400" />
              <h3 className="font-bold text-lg mb-2">Goal Alignment</h3>
              <p className="text-sm text-slate-300 mb-3">Learn how AI helps align tasks with your goals</p>
              <span className="text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/en/second-brain" className="group p-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-xl transition-all">
              <Brain className="w-8 h-8 mb-3 text-violet-200" />
              <h3 className="font-bold text-lg mb-2">Build Your Second Brain</h3>
              <p className="text-sm text-violet-100 mb-3">Discover the PARA method and AI-powered organization</p>
              <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/en/app" className="group p-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border border-slate-200 hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 mb-3 text-indigo-600" />
              <h3 className="font-bold text-lg mb-2">Try BrainAI Free</h3>
              <p className="text-sm text-slate-600 mb-3">Start prioritizing tasks with AI today</p>
              <span className="text-indigo-600 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Get started <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">What is AI task prioritization?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                AI task prioritization uses artificial intelligence to automatically analyze and rank your tasks based on multiple factors including deadline, effort required, impact on goals, and current workload. Unlike manual prioritization, AI can process multiple signals simultaneously and provide objective, data-driven rankings. <Link href="/en/app" className="text-violet-600 hover:underline">Try our AI prioritization tool</Link> to see it in action.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">How does the Eisenhower Matrix work with AI?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                The Eisenhower Matrix divides tasks into four quadrants: Urgent & Important, Important but Not Urgent, Urgent but Not Important, and Neither. BrainAI enhances this method by automatically categorizing your tasks into these quadrants based on their characteristics, saving you time and ensuring nothing falls through the cracks. <Link href="/en/goal-alignment" className="text-violet-600 hover:underline">Learn about goal alignment</Link> to understand how we take it further.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">Can AI replace human judgment in prioritization?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                AI is a powerful assistant but not a replacement for human judgment. BrainAI provides data-driven recommendations while allowing you to override priorities based on context AI might not understand. Think of it as a <strong>productivity coach</strong> that suggests rather than decides.
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
            <p className="text-sm">Your AI productivity coach for task prioritization and goal alignment.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/zh/task-prioritization" className="hover:text-white transition-colors">中文</Link>
              <Link href="/en/app" className="hover:text-white transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
