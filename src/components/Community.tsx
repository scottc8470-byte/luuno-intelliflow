import { useState } from "react";
import { Users, Star, Download, MessageSquare, Code, BookOpen, Award, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const marketplaceItems = [
  {
    type: "agent",
    name: "E-commerce Customer Service AI",
    author: "Sarah Chen",
    avatar: "SC",
    rating: 4.9,
    downloads: "15.2K",
    price: "$49",
    description: "Advanced customer service bot with order tracking and returns processing",
    tags: ["E-commerce", "Support", "Orders"]
  },
  {
    type: "workflow",
    name: "Social Media Content Pipeline",
    author: "Marcus Rodriguez", 
    avatar: "MR",
    rating: 4.8,
    downloads: "8.7K",
    price: "Free",
    description: "Complete social media automation from content creation to posting",
    tags: ["Social Media", "Content", "Marketing"]
  },
  {
    type: "integration",
    name: "Advanced Slack Integration",
    author: "Tech Innovations Co.",
    avatar: "TI",
    rating: 4.7,
    downloads: "12.3K", 
    price: "$29",
    description: "Enhanced Slack connector with custom commands and AI responses",
    tags: ["Slack", "Communication", "AI"]
  }
];

const discussions = [
  {
    title: "Best practices for AI agent training",
    author: "Jennifer Walsh",
    avatar: "JW",
    replies: 23,
    likes: 67,
    time: "2 hours ago",
    category: "AI Agents",
    expert: true
  },
  {
    title: "How to optimize workflow execution speed",
    author: "David Kim",
    avatar: "DK", 
    replies: 15,
    likes: 42,
    time: "4 hours ago",
    category: "Workflows",
    expert: false
  },
  {
    title: "Integration challenges with legacy systems",
    author: "Lisa Thompson",
    avatar: "LT",
    replies: 31,
    likes: 89,
    time: "6 hours ago", 
    category: "Integrations",
    expert: true
  }
];

const successStories = [
  {
    company: "TechCorp Inc.",
    industry: "SaaS",
    achievement: "300% ROI in 6 months",
    description: "Automated customer onboarding and reduced churn by 45%",
    author: "Mike Johnson",
    avatar: "MJ"
  },
  {
    company: "RetailMax",
    industry: "E-commerce", 
    achievement: "2M hours saved annually",  
    description: "Complete order fulfillment automation across 15 countries",
    author: "Anna Garcia",
    avatar: "AG"
  }
];

export function Community() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community Hub</h1>
          <p className="text-muted-foreground">Connect, learn, and share with the LUUNO community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass-card">
            Join Discord
          </Button>
          <Button className="btn-premium">
            Share Your Work
          </Button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card text-center">
          <CardContent className="p-4">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">47K+</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="p-4">
            <Download className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <p className="text-2xl font-bold">156K+</p>
            <p className="text-sm text-muted-foreground">Downloads</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="p-4">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">8.9K+</p>
            <p className="text-sm text-muted-foreground">Discussions</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="p-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">4.8★</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border/50">
        {["marketplace", "discussions", "success"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            onClick={() => setActiveTab(tab)}
            className={`px-0 pb-4 border-b-2 rounded-none capitalize ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "success" ? "Success Stories" : tab}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass-card border-border/50"
          />
        </div>
        <Button variant="outline" className="glass-card">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Content */}
      {activeTab === "marketplace" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {marketplaceItems.map((item, index) => (
            <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      {item.type === "agent" && <Code className="h-5 w-5 text-white" />}
                      {item.type === "workflow" && <BookOpen className="h-5 w-5 text-white" />}
                      {item.type === "integration" && <Users className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">{item.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{item.author}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">{item.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{item.downloads}</span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-primary">{item.price}</span>
                </div>

                <Button className="w-full btn-premium">
                  <Download className="mr-2 h-4 w-4" />
                  Get {item.type}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "discussions" && (
        <div className="space-y-4">
          {discussions.map((discussion, index) => (
            <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{discussion.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors cursor-pointer">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{discussion.author}</span>
                          {discussion.expert && (
                            <Badge variant="secondary" className="text-xs bg-gradient-secondary text-white">
                              <Award className="h-3 w-3 mr-1" />
                              Expert
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{discussion.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "success" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors">{story.company}</CardTitle>
                    <Badge variant="outline" className="mt-1">{story.industry}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-primary/10 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{story.achievement}</p>
                </div>
                
                <p className="text-muted-foreground">{story.description}</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <Avatar>
                    <AvatarFallback>{story.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{story.author}</p>
                    <p className="text-sm text-muted-foreground">{story.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}