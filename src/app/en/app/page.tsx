"use client";

import { useState } from "react";
import { Sparkles, Plus, Calendar, LayoutDashboard, MessageSquare, Check, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  priority: number;
  status: "todo" | "doing" | "done";
  goal?: string;
  dueDate?: string;
  aiReason?: string;
}

const sampleTasks: Task[] = [
  { id: "1", title: "Finish Q4 financial report", priority: 9, status: "todo", goal: "Q4 Business Goals", aiReason: "High impact, approaching deadline" },
  { id: "2", title: "Review marketing strategy", priority: 8, status: "todo", goal: "Q4 Business Goals", aiReason: "Contributes to Q4 revenue target" },
  { id: "3", title: "Call mom", priority: 5, status: "todo", aiReason: "Relationship maintenance" },
  { id: "4", title: "Plan weekend trip", priority: 4, status: "todo", aiReason: "Personal, flexible timing" },
  { id: "5", title: "Morning workout", priority: 7, status: "doing", goal: "Health Goals 2024", aiReason: "Consistency builds habits" },
  { id: "6", title: "Read one chapter of book", priority: 6, status: "done", goal: "Learning Goals" },
];

const goals = [
  { name: "Q4 Business Goals", progress: 65, color: "bg-violet-500" },
  { name: "Health Goals 2024", progress: 80, color: "bg-green-500" },
  { name: "Learning Goals", progress: 45, color: "bg-blue-500" },
];

const dailyRecommendation = [
  { task: "Finish Q4 financial report", reason: "This is your highest priority today. Deadline is approaching.", priority: 9 },
  { task: "Review marketing strategy", reason: "Important for Q4 goal alignment.", priority: 8 },
  { task: "Morning workout", reason: "Maintaining consistency is key for your health goals.", priority: 7 },
];

export default function ENDashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hi! I&apos;m your AI productivity coach. What would you like to focus on today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const doingTasks = tasks.filter((t) => t.status === "doing");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your goals, I recommend focusing on high-impact tasks first. Your Q4 report should be your top priority today.",
        "I&apos;ve noticed you haven't worked on your learning goals this week. Would you like me to schedule some time for it?",
        "Great progress! You&apos;ve completed 60% of your tasks this week. Keep up the momentum!",
      ];
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", content: responses[Math.floor(Math.random() * responses.length)] },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "text-red-600 bg-red-50";
    if (priority >= 6) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">BrainAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/en">Back to Home</a>
            </Button>
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="kanban" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="kanban" className="gap-2">
              <LayoutDashboard className="w-4 h-4" /> Kanban
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="w-4 h-4" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" /> AI Coach
            </TabsTrigger>
          </TabsList>

          {/* Kanban View */}
          <TabsContent value="kanban" className="space-y-6">
            {/* Daily Recommendation */}
            <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-violet-600" />
                  Today&apos;s AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyRecommendation.map((rec, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <Badge variant="outline" className={cn("font-medium", getPriorityColor(rec.priority))}>
                        #{rec.priority}
                      </Badge>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{rec.task}</p>
                        <p className="text-sm text-slate-500">{rec.reason}</p>
                      </div>
                      <Button size="sm" variant="outline">Start</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Kanban Board */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4" /> To Do ({todoTasks.length})
                </h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {todoTasks.map((task) => (
                      <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => moveTask(task.id, "doing")}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2 mb-2">
                            <Badge variant="outline" className={cn("text-xs font-medium", getPriorityColor(task.priority))}>
                              #{task.priority}
                            </Badge>
                            {task.goal && (
                              <Badge variant="secondary" className="text-xs">
                                {task.goal}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-slate-800">{task.title}</p>
                          {task.aiReason && (
                            <p className="text-xs text-slate-500 mt-2">{task.aiReason}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* In Progress Column */}
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-700">
                  <Clock className="w-4 h-4" /> In Progress ({doingTasks.length})
                </h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {doingTasks.map((task) => (
                      <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow border-blue-200" onClick={() => moveTask(task.id, "done")}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2 mb-2">
                            <Badge variant="outline" className={cn("text-xs font-medium", getPriorityColor(task.priority))}>
                              #{task.priority}
                            </Badge>
                            {task.goal && (
                              <Badge variant="secondary" className="text-xs">
                                {task.goal}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-slate-800">{task.title}</p>
                          {task.aiReason && (
                            <p className="text-xs text-slate-500 mt-2">{task.aiReason}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Done Column */}
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4" /> Done ({doneTasks.length})
                </h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {doneTasks.map((task) => (
                      <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow border-green-200 bg-green-50" onClick={() => moveTask(task.id, "todo")}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2 mb-2">
                            <Badge variant="outline" className="text-xs font-medium text-green-600 bg-green-100">
                              #{task.priority}
                            </Badge>
                            {task.goal && (
                              <Badge variant="secondary" className="text-xs">
                                {task.goal}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-slate-800 line-through">{task.title}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Calendar view coming soon...</p>
                  <p className="text-sm mt-2">Track your tasks over time</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Coach Chat */}
          <TabsContent value="chat">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-violet-600" />
                      AI Productivity Coach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    <ScrollArea className="flex-1 p-4 space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex",
                            msg.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg px-4 py-2",
                              msg.role === "user"
                                ? "bg-violet-600 text-white"
                                : "bg-slate-100 text-slate-800"
                            )}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-slate-100 rounded-lg px-4 py-2 text-slate-500">
                            Thinking...
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Ask me anything about your tasks and goals..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          className="resize-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleChat();
                            }
                          }}
                        />
                        <Button onClick={handleChat} className="bg-violet-600 hover:bg-violet-700">
                          Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Goals Progress */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Goal Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {goals.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{goal.name}</span>
                          <span className="text-slate-500">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
