import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  MessageSquare, 
  Shield,
  CheckCircle,
  Network,
  ClipboardList,
  AlertTriangle,
  FileCheck,
  Users,
  RefreshCw
} from 'lucide-react';
import AnimatedSection from '../../utils/AnimatedSection';
import AnimatedItem from '../../utils/AnimatedItem';

const Blog = () => {
  const posts = [
    {
      title: "NIST CSF 2.0: What's New and How to Prepare",
      description: "An in-depth look at the changes in NIST CSF 2.0 and how organizations can prepare for the transition.",
      author: "Sarah Johnson",
      date: "March 15, 2025",
      category: "Framework Updates",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
    },
    {
      title: "Emerging Ransomware Trends in 2025",
      description: "Analysis of current ransomware trends and recommended protection strategies.",
      author: "Michael Chen",
      date: "March 10, 2025",
      category: "Security Threats",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg"
    },
    {
      title: "Supply Chain Security: Best Practices",
      description: "Key strategies for securing your supply chain and managing vendor risks.",
      author: "Emily Rodriguez",
      date: "March 5, 2025",
      category: "Supply Chain",
      image: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg"
    },
    {
      title: "Implementing Zero Trust Architecture",
      description: "A practical guide to implementing zero trust security in your organization.",
      author: "James Wilson",
      date: "March 1, 2025",
      category: "Security Architecture",
      image: "https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg"
    },
    {
      title: "Risk Management in the Age of AI",
      description: "How artificial intelligence is transforming risk management practices.",
      author: "Sarah Johnson",
      date: "February 25, 2025",
      category: "Innovation",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg"
    },
    {
      title: "Compliance Automation Strategies",
      description: "Streamlining compliance processes through automation and integration.",
      author: "Michael Chen",
      date: "February 20, 2025",
      category: "Compliance",
      image: "https://images.pexels.com/photos/7376/startup-photos.jpg"
    }
  ];

  return (
    <div className="py-20">
      <AnimatedSection type="fadeIn" className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Blog & Insights</h1>
        <p className="text-xl text-orange-500 max-w-3xl mx-auto">
          Expert analysis and guidance from our security and risk management professionals
        </p>
      </AnimatedSection>

      {/* Featured Post */}
      <AnimatedSection type="fadeIn" delay={0.1} className="mb-16">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video relative">
                <img 
                  src={posts[0].image} 
                  alt={posts[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                    {posts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{posts[0].title}</h2>
                <p className="text-muted-foreground mb-6">{posts[0].description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {posts[0].author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {posts[0].date}
                  </div>
                </div>
                
                <Button variant="orange">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </AnimatedSection>

      {/* Latest Articles */}
      <AnimatedSection type="fadeIn" delay={0.2} className="mb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(1, 4).map((post, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card className="hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
                  <div className="aspect-video relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-foreground">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{post.description}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>

                    <Button variant="orange" className="mt-auto w-full">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Categories Section */}
      <AnimatedSection type="fadeIn" delay={0.3} className="bg-muted/30 dark:bg-muted/10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive into our content collections focused on specific security and risk management topics
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Ransomware Protection", icon: <Shield className="h-5 w-5" />, count: 15 },
              { name: "NIST Compliance", icon: <CheckCircle className="h-5 w-5" />, count: 23 },
              { name: "Supply Chain Security", icon: <Network className="h-5 w-5" />, count: 11 },
              { name: "Risk Management", icon: <ClipboardList className="h-5 w-5" />, count: 19 },
              { name: "Incident Response", icon: <AlertTriangle className="h-5 w-5" />, count: 14 },
              { name: "Compliance", icon: <FileCheck className="h-5 w-5" />, count: 16 },
              { name: "Tabletop Exercises", icon: <Users className="h-5 w-5" />, count: 8 },
              { name: "Framework Updates", icon: <RefreshCw className="h-5 w-5" />, count: 7 }
            ].map((category, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.05 + 0.1}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 bg-[#FF6B00]/10 p-2 rounded-full">
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* More Articles */}
      <AnimatedSection type="fadeIn" delay={0.4} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">More Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {posts.slice(4).map((post, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="font-medium mb-1">{post.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                        <Button variant="link" size="sm" className="px-0 h-auto">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection type="fadeIn" delay={0.5} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#FF6B00] rounded-lg p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FF6B00]/50 via-[#FF8F40]/30 to-[#FF6B00]/50 opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated on Security Trends
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest insights on ransomware protection, 
                NIST compliance, and cybersecurity best practices
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-md flex-1 focus:outline-none"
                />
                <Button variant="white" className="bg-white text-[#FF6B00] hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Blog;