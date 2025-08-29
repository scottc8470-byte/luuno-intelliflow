import { useState } from "react";
import { Zap, Play, Pause, Plus, GitBranch, Clock, Users, Settings, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const workflows = [
  {
    id: 1,
    name: "Customer Support Automation",
    description: "Automatically route and respond to customer inquiries",
    status: "active",
    executions: 1247,
    success_rate: 94,
    last_run: "2 min ago",
    nodes: 8,
    category: "Support"
  },
  {
    id: 2,
    name: "Sales Lead Processing",
    description: "Qualify leads and automatically add to CRM pipeline",
    status: "active", 
    executions: 892,
    success_rate: 97,
    last_run: "5 min ago",
    nodes: 12,
    category: "Sales"
  },
  {
    id: 3,
    name: "Content Publishing Pipeline", 
    description: "Generate, review, and publish content across platforms",
    status: "paused",
    executions: 156,
    success_rate: 89,
    last_run: "1 hour ago",
    nodes: 15,
    category: "Content"
  },
  {
    id: 4,
    name: "Invoice Generation & Follow-up",
    description: "Automatically create invoices and send payment reminders",
    status: "active",
    executions: 634,
    success_rate: 98,
    last_run: "8 min ago", 
    nodes: 6,
    category: "Finance"
  }
];

const templates = [
  {
    name: "E-commerce Order Processing",
    description: "Complete order fulfillment automation",
    nodes: 10,
    difficulty: "Intermediate",
    uses: 2847
  },
  {
    name: "Social Media Management",
    description: "Schedule and post content across platforms", 
    nodes: 7,
    difficulty: "Beginner",
    uses: 1956
  },
  {
    name: "HR Onboarding Process",
    description: "Automate new employee setup and training",
    nodes: 14,
    difficulty: "Advanced", 
    uses: 743
  }
];

export function Workflows() {
  const [activeTab, setActiveTab] = useState("workflows");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Visual Workflows</h1>
          <p className="text-muted-foreground">Build and manage automated business processes</p>
        </div>
        <Button size="lg" className="btn-premium">
          <Plus className="mr-2 h-5 w-5" />
          Create Workflow
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border/50">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("workflows")}
          className={`px-0 pb-4 border-b-2 rounded-none ${
            activeTab === "workflows" 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          My Workflows
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("templates")}
          className={`px-0 pb-4 border-b-2 rounded-none ${
            activeTab === "templates"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Templates
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("builder")}
          className={`px-0 pb-4 border-b-2 rounded-none ${
            activeTab === "builder"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Workflow Builder
        </Button>
      </div>

      {/* Content */}
      {activeTab === "workflows" && (
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Workflows</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Zap className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Now</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                  <Play className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">94%</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Executions Today</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Workflows List */}
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="glass-card group hover:shadow-premium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{workflow.name}</h3>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                            {workflow.status === "active" ? (
                              <Play className="h-3 w-3 mr-1" />
                            ) : (
                              <Pause className="h-3 w-3 mr-1" />
                            )}
                            {workflow.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{workflow.nodes} nodes</span>
                          <span className="text-xs text-muted-foreground">{workflow.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-sm font-medium">{workflow.executions.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">executions</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-secondary">{workflow.success_rate}%</p>
                          <p className="text-xs text-muted-foreground">success rate</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{workflow.last_run}</p>
                          <p className="text-xs text-muted-foreground">last run</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="glass-card">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="btn-premium">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <GitBranch className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{template.difficulty}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{template.nodes} nodes</span>
                    <span className="text-muted-foreground">{template.uses.toLocaleString()} uses</span>
                  </div>
                  
                  <Button className="w-full btn-premium">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "builder" && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <GitBranch className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Visual Workflow Builder</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Drag and drop nodes to create powerful automated workflows. Connect triggers, actions, and conditions with an intuitive visual interface.
                  </p>
                </div>
                <Button size="lg" className="btn-premium">
                  <Plus className="mr-2 h-5 w-5" />
                  Open Workflow Builder
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Builder Preview */}
          <Card className="glass-card overflow-hidden">
            <CardHeader>
              <CardTitle>Builder Preview</CardTitle>
              <p className="text-muted-foreground">Interactive canvas for building workflows</p>
            </CardHeader>
            <CardContent>
              <div className="workflow-canvas min-h-[400px] rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <GitBranch className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Drag & Drop Workflow Builder</h4>
                    <p className="text-sm text-muted-foreground">Visual canvas for creating automated processes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}