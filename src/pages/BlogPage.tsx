
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock, TrendingUp } from "lucide-react";

export const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "AI-Powered Document Management: The Future is Here",
      excerpt: "Discover how artificial intelligence is revolutionizing document management and what it means for your business.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "AI & Technology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "10 Best Practices for Document Workflow Automation",
      excerpt: "Learn the essential strategies for implementing effective document workflow automation in your organization.",
      author: "Mike Chen",
      date: "2024-01-10",
      category: "Workflows",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Security Best Practices for Digital Document Management",
      excerpt: "Protect your sensitive documents with these proven security strategies and compliance guidelines.",
      author: "Lisa Rodriguez",
      date: "2024-01-05",
      category: "Security",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "The Rise of Collaborative Document Editing",
      excerpt: "How real-time collaboration is transforming the way teams work on documents together.",
      author: "David Park",
      date: "2024-01-01",
      category: "Collaboration",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Measuring ROI of Document Automation",
      excerpt: "A comprehensive guide to calculating and demonstrating the return on investment of document automation.",
      author: "Emma Wilson",
      date: "2023-12-28",
      category: "Business",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Future of AI in Document Processing",
      excerpt: "Exploring emerging trends and technologies that will shape the future of intelligent document processing.",
      author: "Alex Kumar",
      date: "2023-12-25",
      category: "AI & Technology",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = ["All", "AI & Technology", "Workflows", "Security", "Collaboration", "Business"];
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 border-white/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                Latest Insights
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Blog & Resources
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Stay updated with the latest insights, tips, and trends in document management and AI automation.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                  <Badge
                      key={category}
                      variant={category === "All" ? "default" : "secondary"}
                      className={`cursor-pointer transition-all duration-200 ${
                          category === "All"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "hover:bg-blue-100 hover:text-blue-700"
                      }`}
                  >
                    {category}
                  </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Featured Post */}
          {featuredPost && (
              <div className="mb-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
                <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/50 hover:shadow-3xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-80 lg:h-auto">
                      <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white shadow-lg">Featured</Badge>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {featuredPost.category}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                          {featuredPost.readTime}
                    </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-2" />
                          <span className="mr-4">{featuredPost.author}</span>
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
          )}

          {/* Regular Posts Grid */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-700 shadow-md">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="border-gray-300 hover:border-blue-500 hover:text-blue-600 px-8 py-3">
              Load More Articles
            </Button>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest insights delivered straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 outline-none"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};
