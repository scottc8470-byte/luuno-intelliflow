import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Play, Pause, Settings, Workflow, Zap } from "lucide-react";

const workflows = [
  {
    id: 1,
    title: "Lead Qualification Pipeline",
    description: "Automatically qualify and route leads from multiple sources",
    status: "Active",
    category: "Sales",
    triggers: 247,
    success_rate: "94%",
    tags: ["CRM", "Email", "Slack"]
  },
  {
    id: 2,
    title: "Customer Onboarding Sequence",
    description: "Welcome new customers with automated email sequences and setup tasks",
    status: "Active",
    category: "Customer Success",
    triggers: 156,
    success_rate: "89%",
    tags: ["Email", "Tasks", "Support"]
  },
  {
    id: 3,
    title: "Invoice Processing Automation",
    description: "Extract data from invoices and sync with accounting software",
    status: "Paused",
    category: "Finance",
    triggers: 89,
    success_rate: "97%",
    tags: ["OCR", "QuickBooks", "PDF"]
  }
];

const templates = [
  {
    id: 1,
    title: "Social Media Content Pipeline",
    description: "Auto-generate and schedule social media posts across platforms",
    category: "Marketing",
    downloads: "2.1K",
    rating: 4.8
  },
  {
    id: 2,
    title: "E-commerce Order Fulfillment",
    description: "Process orders, update inventory, and send tracking information",
    category: "E-commerce",
    downloads: "1.8K",
    rating: 4.7
  },
  {
    id: 3,
    title: "HR Candidate Screening",
    description: "Screen resumes and schedule interviews automatically",
    category: "HR",
    downloads: "1.3K",
    rating: 4.6
  }
];

export default function Workflows() {
  const [activeTab, setActiveTab] = useState("my-workflows");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground mt-1">
            Build and manage automated business processes
          </p>
        </div>
        <Button className="glow">
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-workflows">My Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="workflow-builder">Workflow Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="my-workflows" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search workflows..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="glow-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                        <Workflow className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{workflow.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={workflow.status === "Active" ? "default" : "secondary"}
                        className={workflow.status === "Active" ? "bg-success text-success-foreground" : ""}
                      >
                        {workflow.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {workflow.status === "Active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-6">
                      <div>
                        <span className="text-sm text-muted-foreground">Triggers</span>
                        <div className="font-semibold">{workflow.triggers}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <div className="font-semibold text-success">{workflow.success_rate}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Category</span>
                        <div className="font-semibold">{workflow.category}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {workflow.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="glow-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{template.category}</Badge>
                    <div className="text-sm text-muted-foreground">
                      ⭐ {template.rating} • {template.downloads} downloads
                    </div>
                  </div>
                  <Button className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflow-builder" className="space-y-6">
          <Card className="border-accent/30 glow-border">
            <CardContent className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                <Workflow className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Build Custom Workflows</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create powerful automation workflows with our drag-and-drop builder. 
                Connect apps, set triggers, and automate your business processes.
              </p>
              <Button size="lg" className="glow">
                <Plus className="h-4 w-4 mr-2" />
                Start Building
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}