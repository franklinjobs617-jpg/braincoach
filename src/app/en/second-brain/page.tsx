"use client";

import { Brain, Target, ArrowRight, Check, ChevronRight, Home, BarChart3, BookOpen, Layers, Zap, Lightbulb, Archive, FolderKanban, FileText, Briefcase, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

export default function SecondBrainPage() {
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
            <Link href="/en/task-prioritization" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">Task Prioritization</Link>
            <Link href="/en/goal-alignment" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">Goal Alignment</Link>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200" asChild>
              <Link href="/en/app">Try Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "Second Brain" }]} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-violet-100 text-violet-700 border-violet-200">
            <Archive className="w-4 h-4 mr-2 inline" />
            Second Brain
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-indigo-700 bg-clip-text text-transparent">
              Build Your AI-Powered Second Brain
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 leading-relaxed mb-4 font-medium">
            Stop losing ideas. Start capturing everything and letting AI surface what matters when you need it.
          </p>
          
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            The Second Brain concept, popularized by Tiago Forte, helps you capture, organize, and retrieve information effectively. 
            BrainAI supercharges this with <strong>AI-powered retrieval and task connection</strong> — your notes become actionable insights automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-200 transform hover:scale-105 transition-all" asChild>
              <Link href="/en/app">
                Build Your Second Brain <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-violet-200 hover:bg-violet-50" asChild>
              <Link href="/en/task-prioritization">
                Explore Task Prioritization <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* PARA Method */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700 border-violet-200">
              <BookOpen className="w-4 h-4 mr-2" />
              The PARA Method
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Organize Everything with PARA</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              PARA (Projects, Areas, Resources, Archives) is a universal system for organizing any kind of information. 
              BrainAI implements this with AI intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { letter: "P", name: "Projects", desc: "Time-bound goals with deadlines", color: "from-violet-500 to-violet-600", icon: FolderKanban, example: "Launch new website, Write book chapter" },
              { letter: "A", name: "Areas", desc: "Ongoing responsibilities", color: "from-indigo-500 to-indigo-600", icon: Briefcase, example: "Health, Finances, Career" },
              { letter: "R", name: "Resources", desc: "Topics of ongoing interest", color: "from-blue-500 to-blue-600", icon: FileText, example: "AI research, Design inspiration" },
              { letter: "A", name: "Archives", desc: "Completed or inactive items", color: "from-slate-500 to-slate-600", icon: Archive, example: "Old projects, Past notes" },
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
                  <p className="text-sm text-slate-600 italic">&ldquo;{item.example}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* BrainAI Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How BrainAI Enhances Your Second Brain</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI-Powered Search", desc: "Ask questions in natural language and get answers from your notes instantly", icon: Lightbulb },
              { title: "Automatic Linking", desc: "AI connects related notes and tasks, building a knowledge graph automatically", icon: Layers },
              { title: "Task Extraction", desc: "Automatically extract action items from meeting notes and documents", icon: Check },
              { title: "Smart Summaries", desc: "AI generates summaries of long documents, saving you hours of reading", icon: Sparkles },
              { title: "Goal Context", desc: "Your notes are automatically tagged with relevant goals and projects", icon: Target },
              { title: "Weekly Digest", desc: "AI curates the most relevant information from your second brain each week", icon: TrendingUp },
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
          <h2 className="text-2xl font-bold mb-6">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/en/task-prioritization" className="group p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl transition-all">
              <BarChart3 className="w-8 h-8 mb-3 text-violet-400" />
              <h3 className="font-bold text-lg mb-2">Task Prioritization</h3>
              <p className="text-sm text-slate-300 mb-3">Learn how AI prioritizes tasks by importance</p>
              <span className="text-violet-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/en/goal-alignment" className="group p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-xl transition-all">
              <Target className="w-8 h-8 mb-3 text-indigo-200" />
              <h3 className="font-bold text-lg mb-2">Goal Alignment</h3>
              <p className="text-sm text-indigo-100 mb-3">Connect your second brain to your goals</p>
              <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/en/app" className="group p-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border border-slate-200 hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 mb-3 text-violet-600" />
              <h3 className="font-bold text-lg mb-2">Try BrainAI Free</h3>
              <p className="text-sm text-slate-600 mb-3">Build your second brain today</p>
              <span className="text-violet-600 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
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
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">What is a Second Brain?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                A Second Brain is an external digital system that stores and organizes your knowledge, ideas, and information. 
                It acts as an extension of your biological memory, allowing you to capture everything and retrieve it when needed. 
                <Link href="https://fortelabs.com/blog/basboverview/" target="_blank" rel="noopener" className="text-violet-600 hover:underline"> Learn more about the Second Brain concept</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">What is the PARA method?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                PARA is a note organization system developed by Tiago Forte. It divides information into four categories: 
                <strong> Projects</strong> (active goals), <strong>Areas</strong> (ongoing responsibilities), 
                <strong> Resources</strong> (topics of interest), and <strong>Archives</strong> (inactive items). 
                BrainAI implements this system with AI-powered connections between items.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">How does AI enhance a Second Brain?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Traditional note-taking apps rely on manual linking and searching. BrainAI uses AI to automatically:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Connect related notes and tasks</li>
                  <li>Extract action items from documents</li>
                  <li>Answer questions from your knowledge base</li>
                  <li>Surface relevant information proactively</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-violet-100">
              <AccordionTrigger className="text-left font-medium hover:text-violet-600">What&apos;s the difference between BrainAI and Notion/Obsidian?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Notion and Obsidian are powerful tools, but they require manual organization. BrainAI focuses on 
                <strong> automatic intelligence</strong>: AI does the linking, summarizing, and surfacing for you. 
                Think of BrainAI as your <strong>AI productivity coach</strong> that works with your existing knowledge.
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
            <p className="text-sm">Your AI-powered Second Brain for knowledge management and productivity.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/zh/second-brain" className="hover:text-white transition-colors">中文</Link>
              <Link href="/en/app" className="hover:text-white transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
