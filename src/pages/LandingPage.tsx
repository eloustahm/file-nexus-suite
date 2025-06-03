import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MessageSquare, 
  Wand2, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Search,
  Bot,
  Shield,
  Zap,
  Clock,
  Database,
  Upload,
  Settings,
  Star,
  Quote,
  Github,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
    const keyFeatures = [
        {
            icon: MessageSquare,
            title: "AI Chat with Documents",
            description: "Ask questions and get instant answers from your documents using advanced AI."
        },
        {
            icon: Search,
            title: "Smart Search",
            description: "Find exactly what you need with semantic search across all your documents."
        },
        {
            icon: Bot,
            title: "Auto-Summarization",
            description: "Get AI-powered summaries of long documents in seconds."
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Share, collaborate, and manage workflows with your entire team."
        },
        {
            icon: Shield,
            title: "Approval Workflows",
            description: "Set up custom approval processes with automated notifications."
        },
        {
            icon: Wand2,
            title: "Document Generation",
            description: "Create professional documents using AI-powered templates."
        },
        {
            icon: Database,
            title: "Smart Organization",
            description: "Automatically categorize and tag documents for easy retrieval."
        },
        {
            icon: Zap,
            title: "Automation",
            description: "Automate repetitive tasks and streamline your workflow."
        }
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Upload Documents",
            description: "Drag and drop your files or connect to cloud storage platforms.",
            icon: Upload
        },
        {
            step: "2", 
            title: "AI Processing",
            description: "Our AI analyzes, categorizes, and indexes your documents automatically.",
            icon: Bot
        },
        {
            step: "3",
            title: "Collaborate & Automate",
            description: "Chat with documents, create workflows, and collaborate with your team.",
            icon: Settings
        }
    ];

    const useCases = [
        {
            title: "Legal Teams",
            description: "Contract analysis, legal research, and compliance documentation.",
            features: ["Contract review", "Legal research", "Compliance tracking"]
        },
        {
            title: "HR Departments", 
            description: "Employee onboarding, policy management, and document workflows.",
            features: ["Onboarding docs", "Policy updates", "Employee files"]
        },
        {
            title: "Marketing Teams",
            description: "Campaign assets, brand guidelines, and content collaboration.",
            features: ["Brand assets", "Campaign docs", "Content review"]
        },
        {
            title: "Localization",
            description: "Translation workflows, multilingual documentation, and global collaboration.",
            features: ["Translation tracking", "Global workflows", "Multi-language support"]
        }
    ];

    const pricingPlans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started",
            features: ["5 documents", "3 templates", "250MB storage", "Basic AI features"],
            popular: false
        },
        {
            name: "Starter",
            price: "$9",
            period: "per month",
            description: "Great for individuals",
            features: ["50 documents", "15 templates", "5GB storage", "All AI features", "Priority support"],
            popular: false
        },
        {
            name: "Professional",
            price: "$29",
            period: "per month", 
            description: "Perfect for growing teams",
            features: ["200 documents", "50 templates", "25GB storage", "Team collaboration", "Advanced workflows"],
            popular: true
        },
        {
            name: "Business",
            price: "$59",
            period: "per month",
            description: "For larger organizations",
            features: ["1000 documents", "200 templates", "100GB storage", "SSO integration", "Custom branding"],
            popular: false
        }
    ];

    const testimonials = [
        {
            quote: "DocuFlow transformed how our legal team handles contracts. We've reduced review time by 70% and caught more issues than ever before.",
            author: "Sarah Chen",
            title: "Legal Director",
            company: "TechCorp Inc."
        },
        {
            quote: "The AI chat feature is incredible. I can ask questions about any document and get instant, accurate answers. It's like having a research assistant 24/7.",
            author: "Michael Rodriguez",
            title: "Marketing Manager", 
            company: "Growth Labs"
        },
        {
            quote: "Setting up approval workflows was so easy, and the automation has saved us countless hours. Our team productivity has increased significantly.",
            author: "Emily Johnson",
            title: "Operations Lead",
            company: "StartupXYZ"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white"/>
                        </div>
                        <span className="text-xl font-bold text-gray-900">DocuFlow</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
                        <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
                        <Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link>
                        <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Get Started Free</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Transform Your Document<br />
                    <span className="text-blue-600">Workflow with AI</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Streamline document management, collaborate with your team, and unlock the power of AI 
                    to analyze, generate, and optimize your content like never before.
                </p>
                <div className="flex justify-center gap-4 mb-12">
                    <Link to="/register">
                        <Button size="lg" className="text-lg px-8 py-4">
                            Try Free for 14 Days
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                        </div>
                        Watch Demo
                    </Button>
                </div>
                
                {/* Product Mockup Placeholder */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-lg shadow-2xl p-8 border">
                        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                            <div className="text-center">
                                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Product Demo Video</p>
                                <p className="text-gray-400 text-sm">Interactive dashboard preview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Powerful Features for Modern Teams
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage documents efficiently and collaborate seamlessly
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {keyFeatures.map((feature, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Get started in three simple steps</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="relative">
                                    <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                                        <step.icon className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center">
                                        <span className="text-blue-600 font-bold text-sm">{step.step}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 text-lg">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Every Team</h2>
                        <p className="text-xl text-gray-600">See how different teams use DocuFlow</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {useCases.map((useCase, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                                    <CardDescription className="text-base">{useCase.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {useCase.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Plans Section */}
            <section id="pricing" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                                {plan.popular && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                                        Most Popular
                                    </Badge>
                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-gray-500">/{plan.period}</span>
                                    </div>
                                    <CardDescription className="text-base">{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Link to="/register">
                                        <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                            Get Started
                                        </Button>
                                    </Link>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                        <p className="text-xl text-gray-600">Trusted by teams around the world</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="p-6">
                                <CardContent className="p-0">
                                    <div className="mb-4">
                                        <Quote className="h-8 w-8 text-blue-600 mb-2" />
                                        <p className="text-gray-700 text-lg italic">"{testimonial.quote}"</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600 font-semibold">
                                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                            <p className="text-sm text-gray-600">{testimonial.title}</p>
                                            <p className="text-sm text-gray-500">{testimonial.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex mt-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Transform Your Document Workflow?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of teams already using DocuFlow to streamline their processes and boost productivity.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register">
                            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
                            Schedule Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-white"/>
                                </div>
                                <span className="text-xl font-bold">DocuFlow</span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Transform your document workflow with AI-powered automation and collaboration.
                            </p>
                            <div className="flex gap-4">
                                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                                <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                                <Mail className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#features" className="hover:text-white">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">API Docs</a></li>
                                <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/about" className="hover:text-white">About</Link></li>
                                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Security</a></li>
                                <li><a href="#" className="hover:text-white">GDPR</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2024 DocuFlow. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
