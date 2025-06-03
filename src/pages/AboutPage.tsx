
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, Globe } from "lucide-react";

const AboutPage = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-founder",
      bio: "Former VP of Engineering at a Fortune 500 company with 15+ years in AI and document management.",
      image: "/placeholder.svg"
    },
    {
      name: "Mike Chen",
      role: "CTO & Co-founder",
      bio: "AI researcher and engineer with expertise in natural language processing and machine learning.",
      image: "/placeholder.svg"
    },
    {
      name: "Lisa Rodriguez",
      role: "Head of Product",
      bio: "Product strategist with a passion for creating user-centric solutions that solve real business problems.",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Innovation First",
      description: "We constantly push boundaries to deliver cutting-edge AI solutions that transform how businesses handle documents."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Customer Success",
      description: "Your success is our success. We're committed to providing exceptional support and continuous value."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in security, reliability, and performance across all our products."
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-600" />,
      title: "Global Impact",
      description: "We're building solutions that make a positive impact on businesses and communities worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About DocuFlow AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize document management through artificial intelligence, 
              making it smarter, faster, and more intuitive for businesses of all sizes.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2023, DocuFlow AI emerged from a simple observation: businesses were drowning 
              in documents but starving for insights. Our founding team, with decades of combined experience 
              in AI and enterprise software, saw an opportunity to transform how organizations interact with their documents.
            </p>
            <p className="text-gray-600 mb-6">
              What started as a small project to automate document processing has evolved into a comprehensive 
              platform that empowers teams to work smarter, collaborate better, and make faster decisions.
            </p>
            <Button size="lg">Join Our Journey</Button>
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg">
            <img 
              src="/placeholder.svg" 
              alt="Our team at work"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600">
            The passionate people behind DocuFlow AI
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Document Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that are already experiencing the power of AI-driven document workflows.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
