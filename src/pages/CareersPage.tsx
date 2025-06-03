
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Zap, Heart, Globe, Trophy, Briefcase } from "lucide-react";

export const CareersPage = () => {
  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our core engineering team to build scalable AI-powered document management solutions.",
      skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "Remote / New York",
      type: "Full-time",
      experience: "3+ years",
      description: "Develop and optimize machine learning models for document processing and natural language understanding.",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP"]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "4+ years",
      description: "Drive product strategy and execution for our core document management platform.",
      skills: ["Product Strategy", "Analytics", "User Research"]
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Create intuitive and beautiful user experiences for our AI-powered document tools.",
      skills: ["Figma", "Design Systems", "User Research"]
    }
  ];

  const benefits = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and quarterly team meetups in amazing locations."
    },
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "Competitive Compensation",
      description: "Top-tier salary, equity package, performance bonuses, and annual compensation reviews."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, mental health support, and wellness stipend."
    },
    {
      icon: <Trophy className="h-8 w-8 text-purple-600" />,
      title: "Growth Opportunities",
      description: "Learning budget, conference attendance, mentorship programs, and career development support."
    }
  ];

  const perks = [
    "Unlimited PTO",
    "Home office setup budget",
    "Latest MacBook Pro",
    "Annual team retreats",
    "Stock options",
    "Parental leave",
    "Learning stipend",
    "Gym membership"
  ];

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border-white/30">
                <Briefcase className="h-3 w-3 mr-1" />
                We're Hiring
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Join Our Mission to
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Transform Work
              </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
                Help us revolutionize how businesses manage documents with AI. We're looking for
                passionate individuals who want to make a real impact.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto shadow-xl">
                View Open Positions
              </Button>
            </div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Why DocuFlow AI?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer more than just a job - we offer a chance to shape the future of work
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50/50 text-center">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Perks */}
        <div className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Perks & Benefits
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to do your best work
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {perks.map((perk, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <span className="text-gray-700 font-medium">{perk}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Open Positions
              </h2>
              <p className="text-xl text-gray-600">
                Find your next opportunity with us
              </p>
            </div>
            <div className="space-y-8">
              {openPositions.map((position, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-3 mb-4">
                            <Badge className="bg-blue-100 text-blue-700">{position.department}</Badge>
                            <Badge variant="outline" className="border-gray-300">
                              <MapPin className="h-3 w-3 mr-1" />
                              {position.location}
                            </Badge>
                            <Badge variant="outline" className="border-gray-300">
                              <Clock className="h-3 w-3 mr-1" />
                              {position.type}
                            </Badge>
                            <Badge variant="outline" className="border-gray-300">
                              {position.experience}
                            </Badge>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{position.title}</h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">{position.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {position.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="bg-gray-100 text-gray-700">
                                  {skill}
                                </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="lg:ml-8">
                          <Button size="lg" className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 px-8 py-3">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Company Culture */}
        <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Our Culture
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We believe in creating an environment where everyone can thrive, innovate, and make
                  a meaningful impact on the future of work.
                </p>
                <ul className="space-y-4 text-lg text-gray-600">
                  <li className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-3" />
                    Collaborative and inclusive team environment
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 text-green-600 mr-3" />
                    Fast-paced, high-impact work on cutting-edge technology
                  </li>
                  <li className="flex items-center">
                    <Heart className="h-5 w-5 text-red-600 mr-3" />
                    Strong focus on work-life balance and mental health
                  </li>
                  <li className="flex items-center">
                    <Trophy className="h-5 w-5 text-purple-600 mr-3" />
                    Opportunities for professional growth and learning
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform -rotate-3"></div>
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration"
                    className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-purple-100 mb-12 leading-relaxed">
              We're always looking for talented individuals. Send us your resume and tell us how you'd like to contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto shadow-xl">
                Get in Touch
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto">
                View All Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};
