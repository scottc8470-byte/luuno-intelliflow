import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Users, 
  Puzzle, 
  CreditCard, 
  Bell, 
  Shield,
  Upload,
  Save
} from "lucide-react";

const integrations = [
  {
    name: "Slack",
    description: "Team communication and notifications",
    status: "Connected",
    lastSync: "2 min ago"
  },
  {
    name: "Google Workspace",
    description: "Email, Calendar, and Drive integration",
    status: "Connected",
    lastSync: "1 hour ago"
  },
  {
    name: "Salesforce",
    description: "CRM and sales automation",
    status: "Disconnected",
    lastSync: "Never"
  },
  {
    name: "Microsoft Teams",
    description: "Enterprise communication platform",
    status: "Connected",
    lastSync: "15 min ago"
  }
];

const teamMembers = [
  {
    name: "John Doe",
    email: "john@company.com",
    role: "Admin",
    status: "Active",
    lastActive: "Online"
  },
  {
    name: "Sarah Wilson",
    email: "sarah@company.com", 
    role: "Developer",
    status: "Active",
    lastActive: "2h ago"
  },
  {
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "1 week ago"
  }
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account, team, and platform preferences
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  JD
                </div>
                <div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@company.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="TechCorp Inc." />
              </div>

              <Button className="glow">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
                <Button className="glow">Invite Member</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.email} className="flex items-center justify-between p-4 border border-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                          {member.role}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{member.lastActive}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Puzzle className="h-5 w-5" />
                Connected Services
              </CardTitle>
              <p className="text-muted-foreground">
                Manage your third-party integrations and API connections
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border border-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <Puzzle className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge 
                          variant={integration.status === "Connected" ? "default" : "secondary"}
                          className={integration.status === "Connected" ? "bg-success text-success-foreground" : ""}
                        >
                          {integration.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last sync: {integration.lastSync}
                        </p>
                      </div>
                      <Button 
                        variant={integration.status === "Connected" ? "outline" : "default"}
                        size="sm"
                        className={integration.status !== "Connected" ? "glow" : ""}
                      >
                        {integration.status === "Connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Subscription & Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 border border-accent/30 rounded-lg glow-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Enterprise Plan</h3>
                    <p className="text-muted-foreground">Advanced features and unlimited usage</p>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">Current Plan</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-2xl font-bold">$299</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next billing</p>
                    <p className="font-medium">Jan 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment method</p>
                    <p className="font-medium">•••• 4242</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Update Payment</Button>
                  <Button variant="outline">Download Invoice</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Workflow Completions", description: "Get notified when workflows finish running" },
                { title: "Agent Alerts", description: "Receive alerts about agent performance and issues" },
                { title: "System Updates", description: "Platform updates and maintenance notifications" },
                { title: "Security Alerts", description: "Important security-related notifications" },
                { title: "Weekly Reports", description: "Summary of your automation performance" }
              ].map((setting) => (
                <div key={setting.title} className="flex items-center justify-between p-4 border border-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">{setting.title}</h4>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <Badge className="bg-success text-success-foreground">Enabled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="p-4 border border-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">API Keys</h4>
                    <Badge variant="secondary">3 Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manage API keys for external integrations
                  </p>
                  <Button variant="outline" size="sm">Manage Keys</Button>
                </div>

                <div className="p-4 border border-muted rounded-lg">
                  <h4 className="font-medium mb-2">Password</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Last changed 3 months ago
                  </p>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}