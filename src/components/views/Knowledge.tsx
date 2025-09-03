import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, Award, Play, Clock, CheckCircle } from "lucide-react";

const learningProgress = [
  {
    title: "AI Agent Fundamentals",
    progress: 85,
    completed: 12,
    total: 14,
    category: "Basics"
  },
  {
    title: "Advanced Workflow Design",
    progress: 60,
    completed: 9,
    total: 15,
    category: "Advanced"
  },
  {
    title: "Integration Patterns",
    progress: 30,
    completed: 4,
    total: 12,
    category: "Technical"
  }
];

const tutorials = [
  {
    id: 1,
    title: "Getting Started with AI Agents",
    description: "Learn the basics of creating and deploying your first AI agent",
    duration: "15 min",
    level: "Beginner",
    views: "12.3K",
    type: "video"
  },
  {
    id: 2,
    title: "Building Complex Workflows",
    description: "Master advanced workflow patterns and conditional logic",
    duration: "28 min",
    level: "Advanced",
    views: "8.7K",
    type: "video"
  },
  {
    id: 3,
    title: "API Integration Best Practices",
    description: "Connect external services securely and efficiently",
    duration: "22 min",
    level: "Intermediate",
    views: "15.1K",
    type: "video"
  }
];

const documentation = [
  {
    id: 1,
    title: "Agent Configuration Guide",
    description: "Complete reference for configuring AI agents",
    category: "Agents",
    updated: "2 days ago"
  },
  {
    id: 2,
    title: "Workflow Trigger Reference",
    description: "All available triggers and their parameters",
    category: "Workflows",
    updated: "1 week ago"
  },
  {
    id: 3,
    title: "API Documentation",
    description: "REST API endpoints and authentication",
    category: "Technical",
    updated: "3 days ago"
  },
  {
    id: 4,
    title: "Integration Catalog",
    description: "Available integrations and setup guides",
    category: "Integrations",
    updated: "5 days ago"
  }
];

const certifications = [
  {
    id: 1,
    title: "LUUNO Certified Agent Developer",
    description: "Master AI agent development and deployment",
    duration: "4-6 weeks",
    level: "Intermediate",
    status: "Available"
  },
  {
    id: 2,
    title: "Workflow Automation Specialist",
    description: "Expert-level workflow design and optimization",
    duration: "6-8 weeks",
    level: "Advanced",
    status: "Available"
  },
  {
    id: 3,
    title: "Enterprise Integration Architect",
    description: "Large-scale automation and enterprise patterns",
    duration: "8-10 weeks",
    level: "Expert",
    status: "Coming Soon"
  }
];

export default function Knowledge() {
  const [activeTab, setActiveTab] = useState("learning");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Knowledge</h1>
          <p className="text-muted-foreground mt-1">
            Learn, grow, and master automation with LUUNO
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="certification">Certification</TabsTrigger>
        </TabsList>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Learning Progress
              </CardTitle>
              <p className="text-muted-foreground">
                Track your progress through LUUNO courses and certifications
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningProgress.map((course) => (
                  <div key={course.title} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{course.progress}%</div>
                        <div className="text-xs text-muted-foreground">
                          {course.completed}/{course.total} lessons
                        </div>
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Video className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
                <p className="text-muted-foreground mb-4">
                  Watch step-by-step video guides
                </p>
                <Button variant="outline">Browse Videos</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <FileText className="h-12 w-12 mx-auto mb-4 text-success" />
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive guides and references
                </p>
                <Button variant="outline">Read Docs</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                <p className="text-muted-foreground mb-4">
                  Earn recognized credentials
                </p>
                <Button variant="outline">Get Certified</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                      <Video className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{tutorial.title}</h3>
                          <p className="text-muted-foreground">{tutorial.description}</p>
                        </div>
                        <Button size="sm" className="glow">
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="secondary">{tutorial.level}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {tutorial.duration}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tutorial.views} views
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentation.map((doc) => (
              <Card key={doc.id} className="glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-semibold">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {doc.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Updated {doc.updated}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certification" className="space-y-6">
          <div className="grid gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                        <Award className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{cert.title}</h3>
                        <p className="text-muted-foreground mb-3">{cert.description}</p>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{cert.level}</Badge>
                          <div className="text-sm text-muted-foreground">
                            Duration: {cert.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={cert.status === "Available" ? "default" : "secondary"}
                        className="mb-2"
                      >
                        {cert.status}
                      </Badge>
                      <div>
                        <Button 
                          variant={cert.status === "Available" ? "default" : "outline"}
                          disabled={cert.status !== "Available"}
                          className={cert.status === "Available" ? "glow" : ""}
                        >
                          {cert.status === "Available" ? "Enroll Now" : "Coming Soon"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}