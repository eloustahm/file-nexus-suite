
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  Users, 
  Bot, 
  FileText, 
  Workflow, 
  Star,
  Play,
  ChevronRight,
  Globe,
  Clock,
  TrendingUp,
  Award,
  Sparkles,
  Target,
  Lightbulb,
  Rocket,
  Brain,
  BarChart3,
  MessageSquare,
  Download,
  Upload,
  Eye,
  Lock,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const LandingPageEnhanced = () => {
  const [stats, setStats] = useState({
    documents: 0,
    users: 0,
    accuracy: 0,
    timesSaved: 0
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Animated counters
  useEffect(() => {
    const intervals = [
      { key: 'documents', target: 1247, duration: 2000 },
      { key: 'users', target: 25000, duration: 2500 },
      { key: 'accuracy', target: 94, duration: 1500 },
      { key: 'timesSaved', target: 85, duration: 2200 }
    ];

    intervals.forEach(({ key, target, duration }) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setStats(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStats(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    });
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Create documents instantly with advanced AI that understands your needs and context.",
      gradient: "from-blue-500 to-cyan-500",
      details: ["Natural language processing", "Context-aware generation", "Multi-format support"]
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      title: "Smart Workflows",
      description: "Automate your document processes with intelligent workflow management and routing.",
      gradient: "from-purple-500 to-pink-500",
      details: ["Automated routing", "Approval workflows", "Integration ready"]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance standards.",
      gradient: "from-green-500 to-emerald-500",
      details: ["End-to-end encryption", "SOC 2 compliant", "GDPR ready"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time collaboration tools and shared workspaces.",
      gradient: "from-orange-500 to-red-500",
      details: ["Real-time editing", "Comment system", "Version control"]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Get insights into your document performance and team productivity.",
      gradient: "from-indigo-500 to-purple-500",
      details: ["Usage analytics", "Performance metrics", "Custom reports"]
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart Templates",
      description: "Intelligent templates that adapt to your content and industry requirements.",
      gradient: "from-teal-500 to-cyan-500",
      details: ["Industry-specific", "Auto-formatting", "Dynamic fields"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechCorp",
      content: "DocuFlow transformed our document workflow. We're 3x faster now and our team loves the AI assistance. The time saved allows us to focus on strategic initiatives.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b302?w=64&h=64&fit=crop&crop=face",
      metrics: "300% faster workflows"
    },
    {
      name: "Michael Chen",
      role: "Legal Director",
      company: "LawFirm Pro",
      content: "The AI accuracy is incredible. It saves us hours of manual work daily and catches details we might miss. Our document quality has significantly improved.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      metrics: "15 hours saved weekly"
    },
    {
      name: "Emily Rodriguez",
      role: "Content Manager",
      company: "Creative Studio",
      content: "From concept to completion, DocuFlow streamlines everything. Our content production has doubled while maintaining high quality standards.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      metrics: "200% productivity increase"
    }
  ];

  const pricingPlans = [
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

  const faqs = [
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

  const integrations = [
    { name: "Google Drive", logo: "https://developers.google.com/drive/images/drive_icon.png" },
    { name: "Microsoft 365", logo: "https://img.icons8.com/color/48/microsoft-office-2019.png" },
    { name: "Slack", logo: "https://img.icons8.com/color/48/slack-new.png" },
    { name: "Notion", logo: "https://img.icons8.com/color/48/notion.png" },
    { name: "Salesforce", logo: "https://img.icons8.com/color/48/salesforce.png" },
    { name: "Dropbox", logo: "https://img.icons8.com/color/48/dropbox.png" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DocuFlow AI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
              <Link to="/login">
                <Button variant="outline" className="border-gray-300 hover:border-blue-500">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 animate-fade-in">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Document Revolution
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight animate-fade-in">
            Transform Your
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Document Workflow
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Harness the power of AI to create, manage, and automate your documents.
            Experience the future of productivity with intelligent workflows that adapt to your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-gray-300 hover:border-blue-500 hover:text-blue-600 group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stats.documents.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Documents Created</div>
              <div className="text-xs text-gray-500 mt-1">This month</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Happy Users</div>
              <div className="text-xs text-gray-500 mt-1">Worldwide</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {stats.accuracy}%
              </div>
              <div className="text-gray-600 font-medium">AI Accuracy</div>
              <div className="text-xs text-gray-500 mt-1">Continuously improving</div>
            </div>
            <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stats.timesSaved}%
              </div>
              <div className="text-gray-600 font-medium">Time Saved</div>
              <div className="text-xs text-gray-500 mt-1">On average</div>
            </div>
          </div>

          {/* Hero Image with 3D effect */}
          <div className="relative max-w-6xl mx-auto animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent rounded-3xl transform -rotate-1"></div>
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2850&q=80"
              alt="Modern workspace with AI documents"
              className="w-full rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-700 relative z-10"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI Processing</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Document Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200">
              <Zap className="h-3 w-3 mr-1" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to revolutionize how you create, manage, and collaborate on documents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 group hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{
                  background: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})`
                }}></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 text-center mb-4">
                    {feature.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
              <Workflow className="h-3 w-3 mr-1" />
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Simple. Powerful. Intelligent.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our intuitive three-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Target className="h-12 w-12" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Define Your Needs</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply describe what you want to create. Our AI understands context, requirements, and your specific industry needs to deliver exactly what you're looking for.
              </p>
              <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageSquare className="h-4 w-4" />
                  "Create a project proposal for a mobile app development"
                </div>
              </div>
            </div>

            <div className="text-center group relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Lightbulb className="h-12 w-12" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Does the Work</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch as our intelligent system generates, formats, and optimizes your content automatically. Our AI considers best practices, industry standards, and your preferences.
              </p>
              <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Brain className="h-4 w-4" />
                  AI Processing...
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>

            <div className="text-center group relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Rocket className="h-12 w-12" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Collaborate & Deploy</h3>
              <p className="text-gray-600 leading-relaxed">
                Review, collaborate with your team, and deploy your polished documents instantly. Share, export, or integrate with your favorite tools seamlessly.
              </p>
              <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Document Ready
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Upload className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Flow Visualization */}
          <div className="mt-16 hidden md:block">
            <div className="flex items-center justify-center gap-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-purple-300"></div>
              <ArrowRight className="text-blue-500" />
              <div className="flex-1 h-px bg-gradient-to-r from-purple-300 via-pink-300 to-green-300"></div>
              <ArrowRight className="text-purple-500" />
              <div className="flex-1 h-px bg-gradient-to-r from-green-300 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Seamlessly integrates with your favorite tools</h3>
            <p className="text-gray-600">Connect DocuFlow with the tools you already use</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 hover:opacity-100 transition-opacity">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <img src={integration.logo} alt={integration.name} className="w-8 h-8" />
                <span className="font-medium text-gray-700">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200">
              <Star className="h-3 w-3 mr-1" />
              Customer Love
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Trusted by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about their experience
            </p>
          </div>
          
          {/* Featured Testimonial */}
          <div className="mb-16">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</p>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                      {testimonials[currentTestimonial].metrics}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 ${index === currentTestimonial ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                    "{testimonial.content.substring(0, 120)}..."
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-gray-100"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-gray-500 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
              <Award className="h-3 w-3 mr-1" />
              Simple Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start free, scale as you grow. No hidden fees.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-gray-600">Monthly</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-14 h-8 bg-gray-200 rounded-full cursor-pointer">
                  <div className="w-6 h-6 bg-white rounded-full shadow transform transition-transform translate-x-1 mt-1"></div>
                </div>
              </div>
              <span className="text-gray-600">Annual</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">Save 20%</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.highlighted ? 'border-2 border-blue-500 shadow-2xl scale-105 z-10' : 'border shadow-lg'} transition-all duration-300 hover:shadow-xl bg-white`}>
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {plan.price}
                    {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-lg text-gray-500">/month</span>}
                  </div>
                  <CardDescription className="text-lg">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full py-3 text-lg ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
                    {plan.cta}
                  </Button>
                  {plan.highlighted && (
                    <p className="text-xs text-center text-gray-500">
                      No credit card required • Cancel anytime
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Features Comparison */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-8">Compare Features</h3>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6">Features</th>
                    <th className="text-center py-4 px-6">Starter</th>
                    <th className="text-center py-4 px-6">Professional</th>
                    <th className="text-center py-4 px-6">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="py-3 px-6">Documents per month</td>
                    <td className="text-center py-3 px-6">5</td>
                    <td className="text-center py-3 px-6">100</td>
                    <td className="text-center py-3 px-6">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-6">AI assistance</td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-6">Team collaboration</td>
                    <td className="text-center py-3 px-6">-</td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-6">Custom integrations</td>
                    <td className="text-center py-3 px-6">-</td>
                    <td className="text-center py-3 px-6">Limited</td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6">Priority support</td>
                    <td className="text-center py-3 px-6">-</td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                    <td className="text-center py-3 px-6"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200">
              <Target className="h-3 w-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about DocuFlow AI
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of teams already using DocuFlow AI to streamline their document processes.
            Start your free trial today and experience the future of document management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto shadow-xl hover:scale-105 transition-all duration-300">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">DocuFlow AI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                The future of document management, powered by AI. Transform your workflow and boost productivity with intelligent automation.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Globe className="h-5 w-5 text-gray-400 hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <Users className="h-5 w-5 text-gray-400 hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <MessageSquare className="h-5 w-5 text-gray-400 hover:text-white" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><a href="#api" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href="#press" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#partners" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#status" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#resources" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 DocuFlow AI. All rights reserved. Built with ❤️ for the future of work.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#cookies" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
