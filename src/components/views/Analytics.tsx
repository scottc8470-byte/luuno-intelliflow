import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Zap, BarChart3, Download, Plus } from "lucide-react";

const analyticsMetrics = [
  {
    title: "Revenue Impact",
    value: "$2.4M",
    change: "+34.2%",
    period: "Generated through automation",
    subtitle: "Last 30 days",
    icon: DollarSign,
    color: "text-success"
  },
  {
    title: "Cost Savings",
    value: "$845K",
    change: "+28.7%",
    period: "Operational cost reduction",
    subtitle: "This quarter",
    icon: TrendingUp,
    color: "text-accent"
  },
  {
    title: "Efficiency Improvement",
    value: "247%",
    change: "+15.3%",
    period: "Process speed increase",
    subtitle: "vs. manual processes",
    icon: Zap,
    color: "text-primary"
  },
  {
    title: "ROI",
    value: "425%",
    change: "+67.1%",
    period: "Return on investment",
    subtitle: "Annualized",
    icon: BarChart3,
    color: "text-purple-primary"
  }
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Business Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Deep insights into your automation performance and ROI
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="glow">
            <Plus className="h-4 w-4 mr-2" />
            Create Dashboard
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsMetrics.map((metric) => (
          <Card key={metric.title} className="glow-hover">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  {metric.change}
                </Badge>
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.period}</p>
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Growth Chart */}
      <Card className="glow-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Growth Trend
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Monthly revenue comparison: automated vs manual processes
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Revenue Chart</h3>
              <p className="text-muted-foreground">
                Revenue data visualization would be displayed here with interactive charts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}