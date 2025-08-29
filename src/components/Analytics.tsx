import { TrendingUp, TrendingDown, DollarSign, Users, Zap, Clock, BarChart3, PieChart, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const kpiData = [
  {
    title: "Revenue Impact",
    value: "$2.4M",
    change: "+34.2%",
    trend: "up",
    icon: DollarSign,
    description: "Generated through automation",
    period: "Last 30 days"
  },
  {
    title: "Cost Savings",
    value: "$845K",
    change: "+28.7%", 
    trend: "up",
    icon: TrendingDown,
    description: "Operational cost reduction",
    period: "This quarter"
  },
  {
    title: "Efficiency Improvement",
    value: "247%",
    change: "+15.3%",
    trend: "up", 
    icon: Zap,
    description: "Process speed increase",
    period: "vs. manual processes"
  },
  {
    title: "ROI",
    value: "425%",
    change: "+67.1%",
    trend: "up",
    icon: TrendingUp,
    description: "Return on investment",
    period: "Annualized"
  }
];

const chartData = [
  { month: "Jan", revenue: 245000, automation: 189000, manual: 56000 },
  { month: "Feb", revenue: 289000, automation: 234000, manual: 55000 },
  { month: "Mar", revenue: 387000, automation: 329000, manual: 58000 },
  { month: "Apr", revenue: 456000, automation: 398000, manual: 58000 },
  { month: "May", revenue: 523000, automation: 465000, manual: 58000 },
  { month: "Jun", revenue: 678000, automation: 615000, manual: 63000 }
];

const workflowPerformance = [
  { name: "Customer Support", executions: 12847, success: 94.2, revenue: 234000 },
  { name: "Sales Pipeline", executions: 8956, success: 97.1, revenue: 1200000 },
  { name: "Content Creation", executions: 3421, success: 89.7, revenue: 156000 },
  { name: "Invoice Processing", executions: 6789, success: 98.4, revenue: 89000 },
  { name: "Lead Qualification", executions: 15678, success: 91.8, revenue: 567000 }
];

export function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Business Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your automation performance and ROI</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass-card">
            Export Report
          </Button>
          <Button className="btn-premium">
            Create Dashboard
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="metric-card group cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-gradient-secondary text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {kpi.change}
                </Badge>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
                <p className="text-xs text-muted-foreground font-medium">{kpi.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Growth Chart */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Revenue Growth Trend
          </CardTitle>
          <p className="text-muted-foreground">Monthly revenue comparison: automated vs manual processes</p>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-border/50 rounded-lg">
            <div className="text-center space-y-2">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Interactive Revenue Chart</p>
              <p className="text-xs text-muted-foreground">Real-time data visualization would appear here</p>
            </div>
          </div>
          
          {/* Chart Legend */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-primary rounded"></div>
              <span className="text-sm">Automated Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-secondary rounded"></div>
              <span className="text-sm">Manual Revenue</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Performance Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Workflow Performance Analysis
          </CardTitle>
          <p className="text-muted-foreground">Detailed breakdown of individual workflow metrics</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Workflow</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Executions</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Success Rate</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Revenue Impact</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {workflowPerformance.map((workflow, index) => (
                  <tr key={index} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{workflow.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono">{workflow.executions.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{workflow.success}%</span>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-secondary rounded-full"
                            style={{ width: `${workflow.success}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-secondary">
                        ${workflow.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="default" className="bg-gradient-secondary">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Optimized
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Time Saved Analysis</CardTitle>
            <p className="text-muted-foreground">Cumulative time savings across all workflows</p>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center border-2 border-dashed border-border/50 rounded-lg">
              <div className="text-center space-y-2">
                <Clock className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="font-semibold text-2xl">12,847 hours</p>
                <p className="text-sm text-muted-foreground">Total time saved this year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>User Adoption</CardTitle>
            <p className="text-muted-foreground">Team engagement with automation tools</p>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center border-2 border-dashed border-border/50 rounded-lg">
              <div className="text-center space-y-2">
                <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="font-semibold text-2xl">94% adoption</p>
                <p className="text-sm text-muted-foreground">Across 156 team members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}