import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Download, Star, Filter, Bot } from "lucide-react";

const agentTypes = ["All", "Sales", "Support", "Content", "Analytics", "Custom"];

const agents = [
  {
    id: 1,
    title: "Sales Assistant AI",
    category: "Sales",
    description: "Automate lead qualification and follow-ups with intelligent conversation flows",
    rating: 4.9,
    downloads: "12.4K",
    tags: ["Lead Gen", "CRM", "Email"],
    metrics: {
      deals: 247,
      revenue: "$1.2M",
      conversion: "34%"
    }
  },
  {
    id: 2,
    title: "Customer Support Bot",
    category: "Support",
    description: "24/7 customer service with escalation to human agents when needed",
    rating: 4.8,
    downloads: "8.7K",
    tags: ["Support", "Chat", "Tickets"],
    metrics: {
      tickets: 1547,
      resolved: "89%",
      satisfaction: "4.7★"
    }
  },
  {
    id: 3,
    title: "Content Creator AI",
    category: "Content",
    description: "Generate blogs, social media posts, and marketing copy at scale",
    rating: 4.7,
    downloads: "15.2K",
    tags: ["Writing", "SEO", "Social"],
    metrics: {
      posts: 892,
      engagement: "+45%",
      reach: "2.1M"
    }
  },
  {
    id: 4,
    title: "Data Analyst AI",
    category: "Analytics",
    description: "Automated reporting and insights from your business data",
    rating: 4.6,
    downloads: "6.3K",
    tags: ["Reports", "BI", "Insights"],
    metrics: {
      reports: 156,
      accuracy: "94%",
      time_saved: "120h"
    }
  }
];

export default function AIAgents() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter(agent => {
    const matchesFilter = selectedFilter === "All" || agent.category === selectedFilter;
    const matchesSearch = agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Agents Hub</h1>
          <p className="text-muted-foreground mt-1">
            Deploy intelligent agents to automate your business processes
          </p>
        </div>
        <Button className="glow">
          <Plus className="h-4 w-4 mr-2" />
          Create Custom Agent
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          {agentTypes.map((type) => (
            <Button
              key={type}
              variant={selectedFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(type)}
            >
              {type}
            </Button>
          ))}
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="glow-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <Bot className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.title}</CardTitle>
                    <Badge variant="secondary">{agent.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{agent.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {agent.downloads} downloads
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{agent.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
                {Object.entries(agent.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-bold text-accent">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 glow">
                  <Download className="h-4 w-4 mr-2" />
                  Deploy Agent
                </Button>
                <Button variant="outline">Preview</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Agent Builder */}
      <Card className="border-accent/30 glow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Custom Agent Builder
          </CardTitle>
          <p className="text-muted-foreground">
            Describe what you want your agent to do, and we'll build it for you
          </p>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Bot className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Start Building Your Custom Agent</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Tell us what tasks you want to automate, and our AI will create a custom agent for your needs
          </p>
          <Button size="lg" className="glow">
            <Plus className="h-4 w-4 mr-2" />
            Create New Agent
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}