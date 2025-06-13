export interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  metrics: string;
}

export interface Integration {
  name: string;
  logo: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    content: "DocuFlow has revolutionized how our team handles document management. The AI-powered features save us hours every week.",
    author: "Sarah Johnson",
    role: "Operations Director",
    company: "TechCorp",
    avatar: "/avatars/sarah.jpg",
    rating: 4.5,
    metrics: "75% reduction in document processing time"
  },
  {
    content: "The workflow automation capabilities are incredible. We've reduced our document processing time by 75%.",
    author: "Michael Chen",
    role: "CTO",
    company: "InnovateX",
    avatar: "/avatars/michael.jpg",
    rating: 4.8,
    metrics: "75% reduction in document processing time"
  },
  {
    content: "Best document management solution we've used. The AI features are a game-changer for our legal team.",
    author: "Emily Rodriguez",
    role: "Legal Counsel",
    company: "Global Law",
    avatar: "/avatars/emily.jpg",
    rating: 4.7,
    metrics: "Legal team productivity increase"
  }
];

export const INTEGRATIONS: Integration[] = [
  { name: "Google Drive", logo: "https://developers.google.com/drive/images/drive_icon.png" },
  { name: "Microsoft 365", logo: "https://img.icons8.com/color/48/microsoft-office-2019.png" },
  { name: "Slack", logo: "https://img.icons8.com/color/48/slack-new.png" },
  { name: "Notion", logo: "https://img.icons8.com/color/48/notion.png" },
  { name: "Salesforce", logo: "https://img.icons8.com/color/48/salesforce.png" },
  { name: "Dropbox", logo: "https://img.icons8.com/color/48/dropbox.png" }
];

export const LANDING_PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals getting started",
    features: [
      "5 documents per month",
      "3 templates",
      "Basic AI assistance",
      "250MB storage",
      "Email support"
    ],
    highlighted: false,
    cta: "Get Started Free"
  },
  {
    name: "Professional",
    price: "$29",
    description: "Best for growing teams and businesses",
    features: [
      "100 documents per month",
      "Unlimited templates",
      "Advanced AI features",
      "10GB storage",
      "Priority support",
      "Team collaboration",
      "Custom workflows",
      "Analytics dashboard"
    ],
    highlighted: true,
    cta: "Start 14-Day Trial"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited documents",
      "Custom integrations",
      "Advanced security",
      "Unlimited storage",
      "24/7 phone support",
      "Dedicated account manager",
      "Custom training",
      "API access",
      "White-label options"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export const LANDING_FAQS: FAQ[] = [
  {
    question: "How does the AI document generation work?",
    answer: "Our AI uses advanced natural language processing to understand your requirements and generate documents that match your style, tone, and format preferences. It learns from your feedback to improve over time and can handle various document types from technical specifications to creative content."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption, comply with GDPR and SOC 2 standards, and never share your data with third parties. Your documents are processed securely and stored with bank-level security. We also offer on-premise deployment for enterprise customers."
  },
  {
    question: "Can I integrate DocuFlow with my existing tools?",
    answer: "Yes! We offer integrations with popular tools like Google Drive, Microsoft 365, Slack, Notion, Salesforce, and many more. Our REST API also allows for custom integrations, and we provide webhooks for real-time synchronization."
  },
  {
    question: "What kind of documents can I create?",
    answer: "DocuFlow can help create a wide variety of documents including reports, proposals, contracts, marketing content, technical documentation, legal briefs, project plans, and more. Our AI adapts to different document types and industries with specialized templates and formatting."
  },
  {
    question: "Do you offer training and support?",
    answer: "Yes! We provide comprehensive onboarding, video tutorials, documentation, and dedicated support. Professional and Enterprise customers get access to live training sessions, a dedicated customer success manager, and priority support with guaranteed response times."
  },
  {
    question: "Can I try DocuFlow before purchasing?",
    answer: "Absolutely! We offer a free tier with 5 documents per month, and our Professional plan comes with a 14-day free trial with no credit card required. You can explore all features and see how DocuFlow fits your workflow before making any commitment."
  }
]; 