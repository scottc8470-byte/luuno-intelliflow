import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Zap, Users2, Clock } from "lucide-react";

const metrics = [
  {
    title: "Revenue Generated",
    value: "$847K",
    change: "+23.4%",
    period: "This month from AI automation",
    icon: TrendingUp,
    color: "success"
  },
  {
    title: "Active AI Agents",
    value: "47",
    change: "+8",
    period: "Agents currently deployed",
    icon: Users2,
    color: "primary"
  },
  {
    title: "Workflows Running",
    value: "2,847",
    change: "+15.2%",
    period: "Active automations across platform",
    icon: Zap,
    color: "accent"
  },
  {
    title: "Time Saved",
    value: "1,247h",
    change: "+31%",
    period: "Total automation time saved",
    icon: Clock,
    color: "muted"
  }
];

const recentActivity = [
  {
    title: "Sales AI Agent closed deal worth $15K",
    time: "2 min ago",
    status: "Success"
  },
  {
    title: "Customer Support workflow resolved 12 tickets",
    time: "5 min ago",
    status: "Success"
  },
  {
    title: "Salesforce sync completed successfully",
    time: "8 min ago",
    status: "Success"
  },
  {
    title: "Content AI Agent published 3 blog posts",
    time: "12 min ago",
    status: "Success"
  },
  {
    title: "Invoice processing workflow saved 2.5 hours",
    time: "15 min ago",
    status: "Success"
  }
];

const quickActions = [
  {
    title: "Deploy New Agent",
    description: "Create and launch an AI agent",
    color: "bg-primary",
    icon: "🤖"
  },
  {
    title: "Create Workflow",
    description: "Build automated processes",
    color: "bg-success",
    icon: "⚡"
  },
  {
    title: "View Analytics",
    description: "Deep dive into performance",
    color: "bg-destructive",
    icon: "📈"
  },
  {
    title: "Browse Community",
    description: "Explore templates & guides",
    color: "bg-accent",
    icon: "👥"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient-purple">
          The Future of Business Automation
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Harness the power of AI agents and intelligent workflows to transform your 
          business operations. Join thousands of companies already revolutionizing their processes.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button variant="default" size="lg" className="glow">
            Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="glow-hover border-muted">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <metric.icon className="h-5 w-5 text-accent" />
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  {metric.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <div
                  key={action.title}
                  className="p-4 rounded-lg border border-muted hover:bg-card-elevated glow-hover cursor-pointer transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center text-2xl mb-3`}>
                    {action.icon}
                  </div>
                  <h4 className="font-semibold mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-card-elevated transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <div>
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-success border-success/30">
                    {activity.status}
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