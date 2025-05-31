
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Wand2, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
    const features = [
        {
            icon: FileText,
            title: "Document Management",
            description: "Organize, store, and manage all your documents in one place with powerful search capabilities."
        },
        {
            icon: MessageSquare,
            title: "Chat with Documents",
            description: "Use AI to interact with your documents, ask questions, and get instant answers."
        },
        {
            icon: Wand2,
            title: "AI Content Generation",
            description: "Generate high-quality content using advanced AI models tailored to your needs."
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Share documents, collaborate in real-time, and manage team workflows efficiently."
        }
    ];

    const benefits = [
        "Secure document storage and management",
        "AI-powered document analysis",
        "Real-time collaboration tools",
        "Advanced workflow automation",
        "Enterprise-grade security"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white"/>
                        </div>
                        <span className="text-xl font-bold text-gray-900">DocuFlow</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Transform Your Document Workflow with AI
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Streamline document management, collaborate with your team, and unlock the power of AI 
                    to analyze, generate, and optimize your content like never before.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/register">
                        <Button size="lg" className="text-lg px-8">
                            Start Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link to="/demo">
                        <Button variant="outline" size="lg" className="text-lg px-8">
                            Watch Demo
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Everything you need to manage documents efficiently
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Why choose DocuFlow?
                            </h2>
                            <ul className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
                            <p className="text-gray-600 mb-6">
                                Join thousands of teams already using DocuFlow to streamline their document workflows.
                            </p>
                            <Link to="/register">
                                <Button size="lg" className="w-full">
                                    Start Your Free Trial
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white"/>
                        </div>
                        <span className="text-xl font-bold">DocuFlow</span>
                    </div>
                    <p className="text-gray-400">
                        © 2024 DocuFlow. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};
