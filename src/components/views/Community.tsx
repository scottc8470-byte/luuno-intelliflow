import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Star, Filter, Users, MessageSquare, Trophy, ExternalLink } from "lucide-react";

const communityStats = [
  { title: "Active Members", value: "47K+", icon: Users, color: "text-primary" },
  { title: "Downloads", value: "156K+", icon: Download, color: "text-success" },
  { title: "Discussions", value: "8.9K+", icon: MessageSquare, color: "text-accent" },
  { title: "Avg Rating", value: "4.8★", icon: Star, color: "text-yellow-500" }
];

const marketplaceItems = [
  {
    id: 1,
    title: "E-commerce Customer Service AI",
    author: "Sarah Chen",
    description: "Advanced customer service bot with order tracking and returns processing",
    category: "Agent",
    tags: ["E-commerce", "Support", "Orders"],
    rating: 4.9,
    downloads: "15.2K",
    price: "$49"
  },
  {
    id: 2,
    title: "Social Media Content Pipeline",
    author: "Marcus Rodriguez",
    description: "Complete social media automation from content creation to posting",
    category: "Workflow",
    tags: ["Social Media", "Content", "Marketing"],
    rating: 4.8,
    downloads: "8.7K",
    price: "Free"
  },
  {
    id: 3,
    title: "Advanced Slack Integration",
    author: "Tech Innovations Co.",
    description: "Enhanced Slack connector with custom commands and AI responses",
    category: "Integration",
    tags: ["Slack", "Communication", "AI"],
    rating: 4.7,
    downloads: "12.3K",
    price: "$29"
  }
];

const discussions = [
  {
    id: 1,
    title: "Best practices for AI agent training",
    author: "Alex Johnson",
    replies: 23,
    views: "1.2K",
    lastActive: "2h ago"
  },
  {
    id: 2,
    title: "How to optimize workflow performance",
    author: "Maria Santos",
    replies: 15,
    views: "890",
    lastActive: "4h ago"
  },
  {
    id: 3,
    title: "Integration patterns for enterprise systems",
    author: "David Kim",
    replies: 31,
    views: "2.1K",
    lastActive: "6h ago"
  }
];

const successStories = [
  {
    id: 1,
    title: "How TechCorp Automated 90% of Support Tickets",
    company: "TechCorp Inc.",
    results: "90% automation, 60% cost reduction",
    category: "Customer Support"
  },
  {
    id: 2,
    title: "Sales Team Increases Conversion by 150%",
    company: "GrowthCo",
    results: "150% conversion increase, $2M revenue boost",
    category: "Sales Automation"
  },
  {
    id: 3,
    title: "Marketing Agency Scales to 10x Clients",
    company: "Digital Agency Pro",
    results: "10x client capacity, 80% time savings",
    category: "Marketing Automation"
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("marketplace");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Hub</h1>
          <p className="text-muted-foreground mt-1">
            Connect, learn, and share with the LUUNO community
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Join Discord
          </Button>
          <Button className="glow">
            Share Your Work
          </Button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {communityStats.map((stat) => (
          <Card key={stat.title} className="text-center">
            <CardContent className="pt-6">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search marketplace..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {marketplaceItems.map((item) => (
              <Card key={item.id} className="glow-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{item.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <Download className="h-3 w-3 inline mr-1" />
                        {item.downloads}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  <p className="text-xs text-muted-foreground">by {item.author}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent">{item.price}</span>
                    <Button size="sm" className="glow">
                      <Download className="h-4 w-4 mr-2" />
                      Get {item.category.toLowerCase()}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10" />
            </div>
            <Button className="glow">Start Discussion</Button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="glow-hover">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1">{discussion.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {discussion.author} • {discussion.lastActive}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {discussion.replies}
                      </div>
                      <div>{discussion.views} views</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="success-stories" className="space-y-6">
          <div className="grid gap-6">
            {successStories.map((story) => (
              <Card key={story.id} className="glow-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="secondary" className="mb-2">{story.category}</Badge>
                      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                      <p className="text-muted-foreground mb-2">{story.company}</p>
                      <p className="text-success font-medium">{story.results}</p>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                  <Button variant="outline" className="mt-4">
                    Read Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}