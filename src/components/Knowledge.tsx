import { useState } from "react";
import { BookOpen, Video, Code, Users, Star, Clock, CheckCircle, PlayCircle, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const learningPaths = [
  {
    title: "AI Agent Fundamentals",
    description: "Master the basics of creating and deploying AI agents",
    level: "Beginner",
    duration: "2 hours",
    lessons: 8,
    progress: 0,
    icon: BookOpen,
    color: "gradient-primary"
  },
  {
    title: "Advanced Workflow Building",
    description: "Complex automation patterns and best practices",
    level: "Advanced",
    duration: "4 hours", 
    lessons: 15,
    progress: 45,
    icon: Code,
    color: "gradient-secondary"
  },
  {
    title: "Enterprise Integration",
    description: "Connect LUUNO with enterprise systems and APIs",
    level: "Expert",
    duration: "6 hours",
    lessons: 12,
    progress: 80,
    icon: Users,
    color: "gradient-accent"
  }
];

const tutorials = [
  {
    title: "Building Your First AI Sales Agent",
    type: "video",
    duration: "12 min",
    views: "45K",
    rating: 4.9,
    description: "Step-by-step guide to creating an AI agent that qualifies leads and books meetings",
    difficulty: "Beginner",
    category: "AI Agents"
  },
  {
    title: "Customer Support Workflow Template",
    type: "tutorial",
    duration: "8 min",
    views: "32K", 
    rating: 4.8,
    description: "Ready-to-use workflow for automated customer support with escalation rules",
    difficulty: "Intermediate",
    category: "Workflows"
  },
  {
    title: "Integrating with Salesforce CRM",
    type: "guide",
    duration: "15 min",
    views: "28K",
    rating: 4.7,
    description: "Complete integration guide for syncing data between LUUNO and Salesforce",
    difficulty: "Advanced", 
    category: "Integrations"
  },
  {
    title: "Analytics Dashboard Setup",
    type: "video",
    duration: "10 min",
    views: "19K",
    rating: 4.6,
    description: "Create custom dashboards to track your automation performance",
    difficulty: "Intermediate",
    category: "Analytics"
  }
];

const documentation = [
  {
    title: "API Reference",
    description: "Complete API documentation with examples",
    category: "Developer",
    pages: 247,
    updated: "2 days ago"
  },
  {
    title: "Integration Guides", 
    description: "Step-by-step integration instructions for popular tools",
    category: "Integrations",
    pages: 156,
    updated: "1 week ago"
  },
  {
    title: "Best Practices",
    description: "Proven strategies and optimization techniques",
    category: "Guidelines", 
    pages: 89,
    updated: "3 days ago"
  },
  {
    title: "Troubleshooting Guide",
    description: "Common issues and their solutions",
    category: "Support",
    pages: 124,
    updated: "5 days ago"
  }
];

export function Knowledge() {
  const [activeTab, setActiveTab] = useState("learning");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Center</h1>
          <p className="text-muted-foreground">Learn, explore, and master the LUUNO platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass-card">
            Request Tutorial
          </Button>
          <Button className="btn-premium">
            Get Certified
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border/50">
        {["learning", "tutorials", "docs", "certification"].map((tab) => (
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
            {tab === "docs" ? "Documentation" : tab}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 glass-card border-border/50"
        />
      </div>

      {/* Content */}
      {activeTab === "learning" && (
        <div className="space-y-8">
          {/* Learning Paths */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${path.color} rounded-xl flex items-center justify-center`}>
                      <path.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">{path.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">{path.level}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{path.lessons} lessons</span>
                    <span>{path.duration}</span>
                  </div>
                  
                  <Button className="w-full btn-premium">
                    {path.progress > 0 ? "Continue Learning" : "Start Path"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Start */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
              <p className="text-muted-foreground">Get up and running with LUUNO in under 30 minutes</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <h4 className="font-semibold">Setup Account</h4>
                  <p className="text-sm text-muted-foreground">5 minutes</p>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <PlayCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">Create First Agent</h4>
                  <p className="text-sm text-muted-foreground">15 minutes</p>
                </div>
                <div className="text-center p-4 border border-border/50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <h4 className="font-semibold">Connect Tools</h4>
                  <p className="text-sm text-muted-foreground">10 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "tutorials" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      {tutorial.type === "video" && <Video className="h-5 w-5 text-white" />}
                      {tutorial.type === "tutorial" && <BookOpen className="h-5 w-5 text-white" />}
                      {tutorial.type === "guide" && <FileText className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">{tutorial.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs capitalize">{tutorial.type}</Badge>
                        <Badge variant="secondary" className="text-xs">{tutorial.difficulty}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{tutorial.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{tutorial.rating}</span>
                  </div>
                </div>

                <Badge variant="outline" className="w-fit">{tutorial.category}</Badge>
                
                <Button className="w-full btn-premium">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Tutorial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "docs" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {documentation.map((doc, index) => (
            <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{doc.pages} pages</span>
                        <Badge variant="outline">{doc.category}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">Updated {doc.updated}</span>
                    </div>
                    
                    <Button className="w-full mt-4 btn-premium">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "certification" && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-accent rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">LUUNO Certified Professional</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Become a certified LUUNO expert and demonstrate your mastery of AI automation, 
                workflow building, and platform best practices.
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">95%</p>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">2.5k+</p>
                  <p className="text-sm text-muted-foreground">Certified</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">4.9★</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
              <Button size="lg" className="btn-premium">
                <CheckCircle className="mr-2 h-5 w-5" />
                Start Certification
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}