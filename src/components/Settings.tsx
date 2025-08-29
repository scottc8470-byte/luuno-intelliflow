import { useState } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, Users, Zap, Globe, Key, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const integrations = [
  {
    name: "Salesforce",
    description: "Sync contacts, leads, and opportunities",
    status: "connected",
    icon: "🏢",
    lastSync: "2 minutes ago"
  },
  {
    name: "Slack",
    description: "Send notifications and updates",
    status: "connected", 
    icon: "💬",
    lastSync: "5 minutes ago"
  },
  {
    name: "Google Workspace",
    description: "Calendar, Drive, and Gmail integration",
    status: "connected",
    icon: "📧",
    lastSync: "1 hour ago"
  },
  {
    name: "HubSpot",
    description: "Marketing automation and CRM",
    status: "disconnected",
    icon: "🚀",
    lastSync: "Never"
  },
  {
    name: "Microsoft Teams",
    description: "Team collaboration and notifications", 
    status: "disconnected",
    icon: "👥",
    lastSync: "Never"
  }
];

const teamMembers = [
  {
    name: "John Doe",
    email: "john@company.com",
    role: "Owner",
    avatar: "JD",
    lastActive: "Active now",
    permissions: ["Admin", "Create", "Edit", "Delete"]
  },
  {
    name: "Sarah Chen",
    email: "sarah@company.com", 
    role: "Admin",
    avatar: "SC",
    lastActive: "2 hours ago",
    permissions: ["Create", "Edit", "Delete"]
  },
  {
    name: "Mike Johnson", 
    email: "mike@company.com",
    role: "Member",
    avatar: "MJ",
    lastActive: "1 day ago",
    permissions: ["Create", "Edit"]
  }
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    workflow: true,
    agent: false,
    security: true
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account, team, and platform preferences</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border/50 overflow-x-auto">
        {["profile", "team", "integrations", "billing", "notifications", "security"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            onClick={() => setActiveTab(tab)}
            className={`px-0 pb-4 border-b-2 rounded-none capitalize whitespace-nowrap ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "profile" && (
        <div className="max-w-2xl space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="glass-card">Change Photo</Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 5MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <input 
                    type="text" 
                    value="John" 
                    className="mt-1 w-full p-3 bg-muted/20 border border-border/50 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <input 
                    type="text" 
                    value="Doe" 
                    className="mt-1 w-full p-3 bg-muted/20 border border-border/50 rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  value="john@company.com" 
                  className="mt-1 w-full p-3 bg-muted/20 border border-border/50 rounded-lg"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Company</label>
                <input 
                  type="text" 
                  value="TechCorp Inc." 
                  className="mt-1 w-full p-3 bg-muted/20 border border-border/50 rounded-lg"
                />
              </div>

              <Button className="btn-premium">Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "team" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Team Members</h3>
              <p className="text-muted-foreground">Manage who has access to your workspace</p>
            </div>
            <Button className="btn-premium">
              <Users className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </div>

          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">{member.lastActive}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant={member.role === "Owner" ? "default" : "secondary"}>
                          {member.role}
                        </Badge>
                        <div className="flex gap-1 mt-2">
                          {member.permissions.map((permission, permIndex) => (
                            <Badge key={permIndex} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {member.role !== "Owner" && (
                        <Button variant="outline" size="sm" className="glass-card">
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "integrations" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Connected Integrations</h3>
            <p className="text-muted-foreground">Manage your external service connections</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="glass-card group hover:shadow-premium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-2xl">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                          {integration.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last sync: {integration.lastSync}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                        {integration.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="glass-card"
                      >
                        {integration.status === "connected" ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="max-w-2xl space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-gradient-primary/10 rounded-lg border border-primary/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-primary">Enterprise Plan</h3>
                    <p className="text-muted-foreground">Unlimited agents and workflows</p>
                  </div>
                  <Badge className="bg-gradient-primary text-white">Active</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">$299<span className="text-lg font-normal">/month</span></p>
                  <p className="text-sm text-muted-foreground">Billed annually</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Plan Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Unlimited AI Agents",
                    "Advanced Workflows", 
                    "Custom Integrations",
                    "Priority Support",
                    "Advanced Analytics",
                    "Team Collaboration"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="glass-card">Change Plan</Button>
                <Button variant="outline" className="glass-card">View Invoice</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="max-w-2xl space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: "email", label: "Email Notifications", description: "Receive updates via email" },
                { key: "push", label: "Push Notifications", description: "Browser and mobile notifications" },
                { key: "workflow", label: "Workflow Updates", description: "When workflows complete or fail" },
                { key: "agent", label: "Agent Activities", description: "AI agent actions and responses" },
                { key: "security", label: "Security Alerts", description: "Important security notifications" }
              ].map((notification) => (
                <div key={notification.key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{notification.label}</h4>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <Switch
                    checked={notifications[notification.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, [notification.key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "security" && (
        <div className="max-w-2xl space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">Authentication App</p>
                    <p className="text-sm text-muted-foreground">Use an app to generate codes</p>
                  </div>
                  <Badge className="bg-gradient-secondary text-white">Enabled</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">API Keys</h4>
                <Button variant="outline" className="glass-card">
                  <Key className="mr-2 h-4 w-4" />
                  Manage API Keys
                </Button>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Data Export</h4>
                <Button variant="outline" className="glass-card">
                  <Database className="mr-2 h-4 w-4" />
                  Export Account Data
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button variant="destructive">Delete Account</Button>
                <p className="text-sm text-muted-foreground mt-2">
                  This action cannot be undone. All data will be permanently deleted.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}