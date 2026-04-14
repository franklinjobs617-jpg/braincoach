"use client";

import { Target, Brain, ArrowRight, Check, Sparkles, ChevronRight, Home, BarChart3, Zap, Lightbulb, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

export default function GoalAlignmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
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
            <Link href="/en/second-brain" className="text-sm text-slate-600 hover:text-violet-600 transition-colors">Second Brain</Link>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200" asChild>
              <Link href="/en/app">Try Free</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumb items={[{ label: "Goal Alignment" }]} />

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 border-indigo-200">
            <Target className="w-4 h-4 mr-2 inline" />
            AI Goal Alignment
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-700 to-violet-700 bg-clip-text text-transparent">
              Align Every Task to Your Goals
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 leading-relaxed mb-4 font-medium">
            Stop working on tasks that don&apos;t matter. BrainAI automatically connects your daily to-dos to your long-term objectives.
          </p>
          
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            Whether you&apos;re using OKRs, quarterly goals, or personal aspirations, BrainAI ensures every task you tackle is 
            <strong> aligned with what truly matters</strong>. Our AI analyzes the connection between your tasks and goals, 
            surfacing gaps and opportunities you might miss.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-200 transform hover:scale-105 transition-all" asChild>
              <Link href="/en/app">
                Set Your Goals <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-indigo-200 hover:bg-indigo-50" asChild>
              <Link href="/en/task-prioritization">
                Explore Task Prioritization <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">How AI Goal Alignment Works</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            BrainAI connects your daily tasks to long-term objectives through intelligent analysis
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Define Your Goals", desc: "Set quarterly, monthly, or project-based goals with clear success metrics", icon: Target },
              { step: "02", title: "AI Analyzes Tasks", desc: "Our AI examines each task and scores its alignment with your stated goals", icon: Sparkles },
              { step: "03", title: "Smart Recommendations", desc: "Get AI-powered suggestions on which tasks will have the biggest impact", icon: Lightbulb },
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
                    OKR Integration
                  </Badge>
                  <h2 className="text-2xl font-bold mb-4">Connect Your OKRs to Daily Actions</h2>
                  <p className="text-slate-600 mb-6">
                    BrainAI integrates with your OKR framework, automatically suggesting tasks that advance each objective. 
                    Never wonder if you&apos;re working on the right things again.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Automatically map tasks to specific Key Results",
                      "Track progress toward objectives in real-time",
                      "Get alerted when tasks don't align with goals",
                      "Weekly AI-generated goal progress reports",
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
                        <span className="font-semibold text-slate-800">Objective: Increase Revenue</span>
                        <Badge className="bg-green-100 text-green-700">75%</Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-indigo-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800">KR: Acquire 50 new clients</span>
                        <Badge className="bg-yellow-100 text-yellow-700">60%</Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-indigo-600">AI Recommended Tasks:</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">Follow up with warm leads</Badge>
                        <Badge variant="outline" className="text-xs">Launch referral program</Badge>
                        <Badge variant="outline" className="text-xs">Optimize landing page</Badge>
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
          <h2 className="text-2xl font-bold mb-6">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/en/task-prioritization" className="group p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:shadow-xl transition-all">
              <BarChart3 className="w-8 h-8 mb-3 text-indigo-400" />
              <h3 className="font-bold text-lg mb-2">Task Prioritization</h3>
              <p className="text-sm text-slate-300 mb-3">Learn how AI prioritizes tasks by goal alignment</p>
              <span className="text-indigo-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/en/second-brain" className="group p-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-xl transition-all">
              <Brain className="w-8 h-8 mb-3 text-violet-200" />
              <h3 className="font-bold text-lg mb-2">Build Your Second Brain</h3>
              <p className="text-sm text-violet-100 mb-3">Discover the PARA method for organizing your goals</p>
              <span className="text-white text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/en/app" className="group p-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border border-slate-200 hover:shadow-xl transition-all">
              <Zap className="w-8 h-8 mb-3 text-indigo-600" />
              <h3 className="font-bold text-lg mb-2">Try BrainAI Free</h3>
              <p className="text-sm text-slate-600 mb-3">Start aligning tasks with goals today</p>
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
            <AccordionItem value="item-1" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">What is goal alignment?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Goal alignment is the practice of ensuring that your daily tasks and activities directly support your larger objectives. 
                When tasks are aligned with goals, every action you take moves you closer to what truly matters. 
                <Link href="/en/task-prioritization" className="text-indigo-600 hover:underline"> See how task prioritization</Link> helps maintain this alignment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">How does AI determine goal alignment?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                BrainAI uses natural language processing to analyze the semantic relationship between your tasks and goals. 
                It considers factors like keywords, context, and stated objectives to score how well each task supports your goals. 
                The higher the alignment score, the more impactful the task.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">Can I use BrainAI without OKRs?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Absolutely! While BrainAI works great with formal OKR frameworks, you can also use it with simple goals like 
                &ldquo;learn a new skill&rdquo; or &ldquo;start a side project.&rdquo; The AI adapts to your goal-setting style, whether it&apos;s structured or informal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-indigo-100">
              <AccordionTrigger className="text-left font-medium hover:text-indigo-600">What&apos;s the difference between task prioritization and goal alignment?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Task prioritization ranks tasks by urgency and importance. Goal alignment ensures tasks connect to your long-term objectives. 
                BrainAI combines both: <strong>goal alignment determines what tasks matter</strong>, while <strong>prioritization determines when to do them</strong>. 
                <Link href="/en/task-prioritization" className="text-indigo-600 hover:underline">Learn more about prioritization</Link>.
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
            <p className="text-sm">Your AI productivity coach for goal alignment and task prioritization.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/zh/goal-alignment" className="hover:text-white transition-colors">中文</Link>
              <Link href="/en/app" className="hover:text-white transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
