import { Bot, Workflow, Shield, Users, BarChart3, Brain } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  details: string[];
}

export const FEATURES: Feature[] = [
  {
    icon: Bot,
    title: "AI-Powered Generation",
    description: "Create documents instantly with advanced AI that understands your needs and context.",
    gradient: "from-blue-500 to-cyan-500",
    details: ["Natural language processing", "Context-aware generation", "Multi-format support"]
  },
  {
    icon: Workflow,
    title: "Smart Workflows",
    description: "Automate your document processes with intelligent workflow management and routing.",
    gradient: "from-purple-500 to-pink-500",
    details: ["Automated routing", "Approval workflows", "Integration ready"]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and compliance standards.",
    gradient: "from-green-500 to-emerald-500",
    details: ["End-to-end encryption", "SOC 2 compliant", "GDPR ready"]
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time collaboration tools and shared workspaces.",
    gradient: "from-orange-500 to-red-500",
    details: ["Real-time editing", "Comment system", "Version control"]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get insights into your document performance and team productivity.",
    gradient: "from-indigo-500 to-purple-500",
    details: ["Usage analytics", "Performance metrics", "Custom reports"]
  },
  {
    icon: Brain,
    title: "Smart Templates",
    description: "Intelligent templates that adapt to your content and industry requirements.",
    gradient: "from-teal-500 to-cyan-500",
    details: ["Industry-specific", "Auto-formatting", "Dynamic fields"]
  }
]; 