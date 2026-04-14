import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - BrainAI",
  description: "Manage your tasks and goals with AI-powered productivity coaching.",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
