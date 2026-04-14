// English metadata for SEO
export const enMetadata = {
  title: "Your AI Productivity Coach - Daily Planner & Task Prioritization",
  description:
    "BrainAI is your AI-powered productivity coach. Automatically prioritize tasks with AI task prioritization, align every task to goals, and never miss what matters. Try the best AI daily planner today.",
  keywords: [
    "AI productivity coach",
    "AI daily planner", 
    "daily planner",
    "task prioritization",
    "AI task prioritization",
    "goal alignment",
    "AI goal alignment",
    "productivity coach",
    "personal productivity",
    "Second Brain",
    "AI Second Brain",
    "task organizer",
    "weekly review tool",
    "PARA tool",
  ],
  openGraph: {
    title: "Your AI Productivity Coach — Align Tasks to Goals, Never Miss What Matters",
    description:
      "Transform how you manage tasks with AI. BrainAI acts as your personal productivity coach, automatically prioritizing tasks based on goal alignment. Never miss what matters.",
    locale: "en_US",
    type: "website" as const,
    images: [
      {
        url: "/og-image-en.png",
        width: 1200,
        height: 630,
        alt: "BrainAI - Your AI Productivity Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Your AI Productivity Coach — Align Tasks to Goals, Never Miss What Matters",
    description:
      "Transform how you manage tasks with AI. BrainAI acts as your personal productivity coach, automatically prioritizing tasks based on goal alignment.",
  },
  alternates: {
    languages: {
      "zh-CN": "/zh",
      "en-US": "/en",
    },
  },
};

// English content strings
export const enContent = {
  hero: {
    badge: "AI-Powered Productivity",
    headline: "Your AI Productivity Coach",
    subheadline: "Align Tasks to Goals, Never Miss What Matters",
    description: "BrainAI is your AI-powered daily planner and productivity coach. Automatically prioritize tasks based on goal alignment and get smart reminders for what truly matters.",
    cta: "Try Free Now",
    ctaSecondary: "Watch Demo",
  },
  demo: {
    title: "Experience AI Task Prioritization",
    placeholder: "Type your tasks here, e.g., 'Finish Q4 report, call mom, plan weekend trip, review marketing strategy'",
    button: "Prioritize My Tasks",
    analyzing: "AI is analyzing your tasks...",
  },
  features: {
    title: "Why Choose BrainAI?",
    goalAlignment: {
      title: "Goal Alignment",
      description:
        "Every task is scored based on how much it contributes to your goals. Focus on what truly matters.",
    },
    aiPriority: {
      title: "AI Task Prioritization",
      description:
        "Our AI analyzes your tasks and ranks them by importance, urgency, and goal relevance.",
    },
    smartReminders: {
      title: "Smart Reminders",
      description:
        "Never miss important tasks. BrainAI reminds you before things become urgent.",
    },
    dailyPlanner: {
      title: "Daily Planner",
      description:
        "Get a personalized daily plan that aligns with your long-term objectives.",
    },
  },
  comparison: {
    title: "How BrainAI Compares",
    features: [
      "Goal-based prioritization",
      "AI-powered task analysis",
      "Daily recommendations",
      "Progress tracking",
      "Smart reminders",
      "Weekly review reports",
    ],
    brainai: "BrainAI",
    others: "Traditional Tools",
  },
  testimonials: {
    title: "What Users Say",
    items: [
      {
        quote:
          "BrainAI helped me focus on what truly matters. I completed my first marathon training plan!",
        author: "Sarah M.",
        role: "Product Manager",
      },
      {
        quote:
          "As an entrepreneur, I have too many tasks. BrainAI's prioritization is a game-changer.",
        author: "James K.",
        role: "Startup Founder",
      },
      {
        quote:
          "Finally, a tool that understands my goals and aligns my daily tasks accordingly.",
        author: "Lisa C.",
        role: "Software Engineer",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What is an AI daily planner?",
        answer:
          "An AI daily planner uses artificial intelligence to help you organize, prioritize, and schedule your tasks. Unlike traditional to-do lists, an AI planner like BrainAI analyzes your tasks in context of your goals and automatically suggests what you should focus on.",
      },
      {
        question: "How does AI task prioritization work?",
        answer:
          "BrainAI uses advanced AI to analyze each task you enter. It considers factors like deadline, effort required, impact on your goals, and your current workload. Then it provides a prioritized list with explanations for why each task ranks where it does.",
      },
      {
        question: "Can BrainAI help with goal alignment?",
        answer:
          "Absolutely. When you set your goals in BrainAI, the AI considers each goal's importance and deadline when prioritizing tasks. This ensures your daily actions consistently move you toward what matters most.",
      },
      {
        question: "Is BrainAI suitable for productivity coaching?",
        answer:
          "Yes. BrainAI acts as your personal productivity coach by providing daily recommendations, reminding you of neglected tasks, and generating weekly review reports to help you improve over time.",
      },
      {
        question: "How is this different from a regular task organizer?",
        answer:
          "Traditional task organizers just store your tasks. BrainAI actively helps you decide what to do first, what can wait, and which tasks actually contribute to your goals. It is not just a storage tool—it is a thinking partner.",
      },
    ],
  },
  cta: {
    title: "Start Your Productivity Transformation",
    subtitle:
      "Join thousands of professionals who have revolutionized their task management with AI.",
    button: "Get Started Free",
  },
  footer: {
    description:
      "Your AI productivity coach that aligns tasks to goals.",
    links: {
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      about: "About",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
};
