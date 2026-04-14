import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "控制台 - BrainAI",
  description: "用 AI 驱动的效率教练管理你的任务和目标。",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
