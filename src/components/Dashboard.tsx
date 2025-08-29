import { TrendingUp, Bot, Zap, Clock, DollarSign, Users, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-image.jpg";

const metrics = [
  {
    title: "Revenue Generated",
    value: "$847K",
    change: "+23.4%",
    trend: "up",
    icon: DollarSign,
    description: "This month from AI automation"
  },
  {
    title: "Active AI Agents",
    value: "47",
    change: "+8",
    trend: "up", 
    icon: Bot,
    description: "Agents currently deployed"
  },
  {
    title: "Workflows Running",
    value: "2,847",
    change: "+15.2%",
    trend: "up",
    icon: Zap,
    description: "Active automations across platform"
  },
  {
    title: "Time Saved",
    value: "1,247h",
    change: "+31%",
    trend: "up",
    icon: Clock, 
    description: "Total automation time saved"
  }
];

const quickActions = [
  {
    title: "Deploy New Agent",
    description: "Create and launch an AI agent",
    icon: Bot,
    href: "/agents/create",
    gradient: "gradient-primary"
  },
  {
    title: "Create Workflow", 
    description: "Build automated processes",
    icon: Zap,
    href: "/workflows/create",
    gradient: "gradient-secondary"
  },
  {
    title: "View Analytics",
    description: "Deep dive into performance",
    icon: TrendingUp,
    href: "/analytics",
    gradient: "gradient-accent"
  },
  {
    title: "Browse Community",
    description: "Explore templates & guides",
    icon: Users,
    href: "/community",
    gradient: "gradient-primary"
  }
];

const recentActivity = [
  { type: "agent", message: "Sales AI Agent closed deal worth $15K", time: "2 min ago", status: "success" },
  { type: "workflow", message: "Customer Support workflow resolved 12 tickets", time: "5 min ago", status: "success" },
  { type: "integration", message: "Salesforce sync completed successfully", time: "8 min ago", status: "success" },
  { type: "agent", message: "Content AI Agent published 3 blog posts", time: "12 min ago", status: "success" },
  { type: "workflow", message: "Invoice processing workflow saved 2.5 hours", time: "15 min ago", status: "success" }
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI Automation Platform" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary/20"></div>
        </div>
        <div className="relative text-center space-y-6 py-20 px-6">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            The Future of Business Automation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Harness the power of AI agents and intelligent workflows to transform your business operations. 
            Join thousands of companies already revolutionizing their processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-premium text-lg px-8 py-6">
              Start Building
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="glass-card text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="metric-card group cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-gradient-secondary text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="glass-card group cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-12 h-12 mx-auto rounded-xl bg-${action.gradient} flex items-center justify-center`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Activity</h2>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-gradient-secondary rounded-full pulse-glow"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Success
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}