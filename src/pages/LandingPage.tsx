
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Zap, Shield, Users, Bot, FileText, Workflow, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
    const features = [
        {
            icon: <Bot className="h-6 w-6" />,
            title: "AI-Powered Generation",
            description: "Create documents instantly with advanced AI that understands your needs."
        },
        {
            icon: <Workflow className="h-6 w-6" />,
            title: "Smart Workflows",
            description: "Automate your document processes with intelligent workflow management."
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Enterprise Security",
            description: "Bank-grade security with end-to-end encryption and compliance standards."
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Team Collaboration",
            description: "Work together seamlessly with real-time collaboration tools."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Operations Manager",
            company: "TechCorp",
            content: "DocuFlow transformed our document workflow. We're 3x faster now.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Legal Director",
            company: "LawFirm Pro",
            content: "The AI accuracy is incredible. It saves us hours of manual work daily.",
            rating: 5
        }
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
                            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                            <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
                            <Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link>
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
            <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                        <Zap className="h-3 w-3 mr-1" />
                        AI-Powered Document Management
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                        Transform Your
                        <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Document Workflow
            </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Harness the power of AI to create, manage, and automate your documents.
                        Experience the future of productivity with intelligent workflows.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link to="/register">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-gray-300 hover:border-blue-500 hover:text-blue-600">
                            Watch Demo
                        </Button>
                    </div>

                    {/* Hero Image */}
                    <div className="relative max-w-6xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2850&q=80"
                            alt="Modern workspace with AI documents"
                            className="w-full rounded-3xl shadow-2xl"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Everything you need to revolutionize your document management workflow
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50">
                                <CardHeader className="text-center pb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-600 text-center">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Loved by Teams
                        </h2>
                        <p className="text-xl text-gray-600">
                            See what our customers are saying
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                        <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                        Join thousands of teams already using DocuFlow AI to streamline their document processes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto shadow-xl">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">DocuFlow AI</span>
                            </div>
                            <p className="text-gray-400">
                                The future of document management, powered by AI.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link to="/status" className="hover:text-white transition-colors">Status</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 DocuFlow AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
