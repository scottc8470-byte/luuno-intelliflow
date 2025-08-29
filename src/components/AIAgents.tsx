import { useState } from "react";
import { Bot, Star, Download, Plus, Search, Filter, Zap, MessageSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const featuredAgents = [
  {
    name: "Sales Assistant AI",
    description: "Automate lead qualification and follow-ups with intelligent conversation flows",
    category: "Sales",
    rating: 4.9,
    downloads: "12.4K",
    price: "Premium",
    tags: ["Lead Gen", "CRM", "Email"],
    performance: { deals: 247, revenue: "$1.2M", conversion: "34%" }
  },
  {
    name: "Customer Support Bot",
    description: "24/7 customer service with escalation to human agents when needed",
    category: "Support", 
    rating: 4.8,
    downloads: "8.7K",
    price: "Free",
    tags: ["Support", "Chat", "Tickets"],
    performance: { tickets: 1547, resolved: "89%", satisfaction: "4.7★" }
  },
  {
    name: "Content Creator AI",
    description: "Generate blogs, social media posts, and marketing copy at scale",
    category: "Content",
    rating: 4.7,
    downloads: "15.2K", 
    price: "Premium",
    tags: ["Writing", "SEO", "Social"],
    performance: { posts: 892, engagement: "+45%", reach: "2.1M" }
  },
  {
    name: "Data Analyst AI",
    description: "Automated reporting and insights from your business data",
    category: "Analytics",
    rating: 4.6,
    downloads: "6.3K",
    price: "Enterprise",
    tags: ["Reports", "BI", "Insights"],
    performance: { reports: 156, accuracy: "94%", time_saved: "120h" }
  }
];

const categories = ["All", "Sales", "Support", "Content", "Analytics", "Custom"];

export function AIAgents() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Agents Hub</h1>
          <p className="text-muted-foreground">Deploy intelligent agents to automate your business processes</p>
        </div>
        <Button size="lg" className="btn-premium">
          <Plus className="mr-2 h-5 w-5" />
          Create Custom Agent
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass-card border-border/50"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "btn-premium" : "glass-card"}
            >
              {category}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="glass-card">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Agent Marketplace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuredAgents.map((agent, index) => (
          <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors">{agent.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">{agent.category}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.downloads} downloads</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{agent.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {agent.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{Object.values(agent.performance)[0]}</p>
                  <p className="text-xs text-muted-foreground">{Object.keys(agent.performance)[0]}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BarChart3 className="h-4 w-4 text-secondary" />
                  </div>
                  <p className="text-sm font-semibold">{Object.values(agent.performance)[1]}</p>
                  <p className="text-xs text-muted-foreground">{Object.keys(agent.performance)[1]}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MessageSquare className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-sm font-semibold">{Object.values(agent.performance)[2]}</p>
                  <p className="text-xs text-muted-foreground">{Object.keys(agent.performance)[2]}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 btn-premium">
                  <Download className="mr-2 h-4 w-4" />
                  Deploy Agent
                </Button>
                <Button variant="outline" className="glass-card">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Builder Preview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Custom Agent Builder
          </CardTitle>
          <p className="text-muted-foreground">Describe what you want your agent to do, and we'll build it for you</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border-2 border-dashed border-border rounded-lg text-center">
            <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">Start Building Your Custom Agent</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tell us what tasks you want to automate, and our AI will create a custom agent for your needs
            </p>
            <Button className="btn-premium">
              <Plus className="mr-2 h-4 w-4" />
              Create New Agent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}