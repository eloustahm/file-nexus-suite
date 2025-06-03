
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, Award, Heart, Globe } from "lucide-react";

export const AboutPage = () => {
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
      title: "Innovation",
      description: "We push the boundaries of what's possible with AI and document management."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and building together."
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Excellence",
      description: "We strive for perfection in everything we create and deliver."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Customer Focus",
      description: "Our customers' success is our ultimate measure of achievement."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?auto=format&fit=crop&w=400&q=80",
      bio: "Former VP of Engineering at TechCorp, passionate about AI innovation."
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      bio: "AI researcher with 10+ years experience in machine learning and NLP."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      bio: "Award-winning designer focused on creating intuitive user experiences."
    }
  ];

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border-white/30">
                <Globe className="h-3 w-3 mr-1" />
                Founded in 2023
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Revolutionizing Document Management with AI
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                We're on a mission to transform how businesses create, manage, and collaborate on documents
                through the power of artificial intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  To democratize access to intelligent document processing and workflow automation,
                  making advanced AI capabilities accessible to businesses of all sizes.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe that every organization deserves powerful tools to streamline their
                  document workflows, reduce manual work, and focus on what matters most -
                  growing their business and serving their customers.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl transform rotate-3"></div>
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration"
                    className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm text-center">
                    <CardHeader className="pb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600">
                The brilliant minds behind DocuFlow AI
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {team.map((member, index) => (
                  <Card key={index} className="border-0 shadow-xl bg-white text-center overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-80">
                      <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Documents Processed</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed space-y-8">
              <p>
                DocuFlow AI was born from a simple observation: despite all the technological advances,
                most businesses were still struggling with manual, time-consuming document processes.
              </p>
              <p>
                Our founders, Sarah and Michael, experienced this pain firsthand while working at various
                tech companies. They saw teams spending countless hours on document creation, review
                cycles, and workflow management - time that could be better spent on innovation and growth.
              </p>
              <p>
                In 2023, they decided to build the solution they wished existed: an AI-powered platform
                that could understand context, automate workflows, and make document management truly intelligent.
              </p>
              <p>
                Today, DocuFlow AI serves hundreds of companies worldwide, from startups to Fortune 500
                enterprises, helping them save time, reduce errors, and unlock new levels of productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};
