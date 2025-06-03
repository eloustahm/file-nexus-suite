
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Zap } from "lucide-react";

const CareersPage = () => {
  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our core engineering team to build scalable AI-powered document management solutions."
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "Remote / New York",
      type: "Full-time",
      experience: "3+ years",
      description: "Develop and optimize machine learning models for document processing and natural language understanding."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "4+ years",
      description: "Drive product strategy and execution for our core document management platform."
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Create intuitive and beautiful user experiences for our AI-powered document tools."
    }
  ];

  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and quarterly team meetups."
    },
    {
      icon: <Zap className="h-6 w-6 text-green-600" />,
      title: "Competitive Compensation",
      description: "Top-tier salary, equity package, and performance bonuses."
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and wellness stipend."
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Growth Opportunities",
      description: "Learning budget, conference attendance, and career development support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us revolutionize how businesses manage documents with AI. 
              We're looking for passionate individuals who want to make a real impact.
            </p>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why DocuFlow AI?</h2>
          <p className="text-xl text-gray-600">
            We offer more than just a job - we offer a chance to shape the future
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity with us
            </p>
          </div>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {position.location}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {position.type}
                        </Badge>
                        <Badge variant="outline">{position.experience}</Badge>
                      </div>
                    </div>
                    <Button className="mt-4 sm:mt-0">Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{position.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented individuals. Send us your resume and tell us how you'd like to contribute.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Get in Touch
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareersPage;
