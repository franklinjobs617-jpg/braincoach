import { NextRequest, NextResponse } from "next/server";
import { LLMClient, Config, HeaderUtils } from "coze-coding-dev-sdk";

interface ParsedTask {
  task: string;
  priority: number;
  reason: string;
}

const EN_SYSTEM_PROMPT = `You are an AI productivity coach. Analyze the user's tasks and prioritize them based on goal alignment.

For each task, provide:
1. A priority score (1-10, where 10 is highest)
2. A brief reason for the priority

Return your response as a JSON array of tasks with this format:
[
  {
    "task": "task description",
    "priority": 8,
    "reason": "brief explanation"
  }
]

Consider these factors when prioritizing:
- Goal alignment (tasks that contribute to stated goals get higher priority)
- Urgency vs importance
- Time sensitivity
- Effort vs impact ratio

Only return valid JSON, no other text.`;

const ZH_SYSTEM_PROMPT = `你是一位 AI 效率教练。分析用户输入的任务，并基于目标对齐进行优先级排序。

对于每个任务，请提供：
1. 优先级分数（1-10，10 为最高）
2. 简短的原因说明

请按照以下 JSON 格式返回：
[
  {
    "task": "任务描述",
    "priority": 8,
    "reason": "简短解释"
  }
]

在排序时考虑以下因素：
- 目标对齐度（对目标有贡献的任务获得更高优先级）
- 紧急程度 vs 重要程度
- 时间敏感性
- 努力程度 vs 影响比例

只返回有效的 JSON 格式，不要有其他文字。`;

export async function POST(request: NextRequest) {
  try {
    const { tasks, language } = await request.json();

    if (!tasks || typeof tasks !== "string") {
      return NextResponse.json(
        { error: "Tasks input is required" },
        { status: 400 }
      );
    }

    const config = new Config();
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const client = new LLMClient(config, customHeaders);

    const systemPrompt = language === "zh" ? ZH_SYSTEM_PROMPT : EN_SYSTEM_PROMPT;
    const userPrompt = `Analyze and prioritize these tasks:\n${tasks}`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: userPrompt },
    ];

    let fullResponse = "";
    
    // Use streaming to collect response
    const stream = client.stream(messages, {
      temperature: 0.3,
    });

    for await (const chunk of stream) {
      if (chunk.content) {
        fullResponse += chunk.content.toString();
      }
    }

    // Try to parse JSON from response
    try {
      // Extract JSON array from response (handle potential markdown code blocks)
      let jsonStr = fullResponse.trim();
      const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      
      const parsedTasks: ParsedTask[] = JSON.parse(jsonStr);
      
      // Sort by priority descending
      parsedTasks.sort((a, b) => b.priority - a.priority);

      return NextResponse.json({ tasks: parsedTasks });
    } catch {
      // Fallback to simple parsing if JSON parsing fails
      const lines = fullResponse.split("\n").filter((line) => line.trim());
      const tasks: ParsedTask[] = lines.slice(0, 5).map((line, index) => ({
        task: line.replace(/^\d+\.\s*/, "").trim(),
        priority: 10 - index * 2,
        reason: "AI analyzed priority",
      }));

      return NextResponse.json({ tasks });
    }
  } catch (error) {
    console.error("Task analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze tasks" },
      { status: 500 }
    );
  }
}
