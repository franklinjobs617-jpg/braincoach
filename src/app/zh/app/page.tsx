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
  { id: "1", title: "完成Q4财务报告", priority: 9, status: "todo", goal: "Q4业务目标", aiReason: "高影响，截止日期临近" },
  { id: "2", title: "审查营销策略", priority: 8, status: "todo", goal: "Q4业务目标", aiReason: "对Q4目标有贡献" },
  { id: "3", title: "给妈妈打电话", priority: 5, status: "todo", aiReason: "关系维护" },
  { id: "4", title: "计划周末旅行", priority: 4, status: "todo", aiReason: "个人事务，时间灵活" },
  { id: "5", title: "晨间锻炼", priority: 7, status: "doing", goal: "健康目标2024", aiReason: "保持一致性是关键" },
  { id: "6", title: "阅读一本书的一章", priority: 6, status: "done", goal: "学习目标" },
];

const goals = [
  { name: "Q4业务目标", progress: 65, color: "bg-violet-500" },
  { name: "健康目标2024", progress: 80, color: "bg-green-500" },
  { name: "学习目标", progress: 45, color: "bg-blue-500" },
];

const dailyRecommendation = [
  { task: "完成Q4财务报告", reason: "这是你今天的最高优先级。截止日期临近。", priority: 9 },
  { task: "审查营销策略", reason: "对Q4目标对齐很重要。", priority: 8 },
  { task: "晨间锻炼", reason: "保持一致性对你的健康目标至关重要。", priority: 7 },
];

export default function ZHDashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "你好！我是你的 AI 效率教练。今天你想专注做什么呢？" },
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
        "根据你的目标，我建议先专注于高影响力的任务。你的Q4报告应该是今天的首要任务。",
        "我注意到你这周还没有为学习目标努力。要我帮你安排一些时间吗？",
        "太棒了！你这周完成了60%的任务。保持这个势头！",
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
              <a href="/zh">返回首页</a>
            </Button>
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              添加任务
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="kanban" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="kanban" className="gap-2">
              <LayoutDashboard className="w-4 h-4" /> 看板
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="w-4 h-4" /> 日历
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" /> AI 教练
            </TabsTrigger>
          </TabsList>

          {/* Kanban View */}
          <TabsContent value="kanban" className="space-y-6">
            {/* Daily Recommendation */}
            <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-violet-600" />
                  今日 AI 推荐
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
                      <Button size="sm" variant="outline">开始</Button>
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
                  <Clock className="w-4 h-4" /> 待办 ({todoTasks.length})
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
                  <Clock className="w-4 h-4" /> 进行中 ({doingTasks.length})
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
                  <Check className="w-4 h-4" /> 已完成 ({doneTasks.length})
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
                <CardTitle>日历视图</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>日历视图即将推出...</p>
                  <p className="text-sm mt-2">按时间线追踪你的任务</p>
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
                      AI 效率教练
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
                            思考中...
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="问我任何关于你的任务和目标的问题..."
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
                          发送
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
                    <CardTitle className="text-lg">目标进度</CardTitle>
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
