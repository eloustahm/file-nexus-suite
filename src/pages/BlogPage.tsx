
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "AI-Powered Document Management: The Future is Here",
      excerpt: "Discover how artificial intelligence is revolutionizing document management and what it means for your business.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "AI & Technology",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "10 Best Practices for Document Workflow Automation",
      excerpt: "Learn the essential strategies for implementing effective document workflow automation in your organization.",
      author: "Mike Chen",
      date: "2024-01-10",
      category: "Workflows",
      readTime: "8 min read",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Security Best Practices for Digital Document Management",
      excerpt: "Protect your sensitive documents with these proven security strategies and compliance guidelines.",
      author: "Lisa Rodriguez",
      date: "2024-01-05",
      category: "Security",
      readTime: "6 min read",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights, tips, and trends in document management and AI automation.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 text-white mb-4">Featured</Badge>
            <h2 className="text-3xl font-bold mb-4">
              The Complete Guide to AI Document Processing
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Everything you need to know about implementing AI-powered document processing in your organization, from getting started to advanced automation techniques.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gray-200 rounded-t-lg">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
