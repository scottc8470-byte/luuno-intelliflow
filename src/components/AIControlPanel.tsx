import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AIControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersonality: string;
  onPersonalityChange: (personality: string) => void;
}

export function AIControlPanel({ isOpen, onClose, currentPersonality, onPersonalityChange }: AIControlPanelProps) {
  console.log('AIControlPanel loaded with personality:', currentPersonality);
  
  if (!isOpen) return null;

  const personalityModes = [
    { value: "balanced", label: "⚖️ Balanced", description: "Optimal balance of speed and accuracy - Team use" },
    { value: "strict_business", label: "💼 Strict Business", description: "Professional business focus - Client demos" },
    { value: "quantum_expert", label: "⚛️ Quantum Expert", description: "Technical quantum expertise - Technical queries" }
  ];

  const systemStatus = [
    { label: "🧠 Local LLM", status: "🟢 Online", description: "Connected" },
    { label: "📦 Available Models", status: "llama3.2", description: "1 model loaded" },
    { label: "⚡ Quantum Core", status: "🟢 Active", description: "Processing ready" },
    { label: "🔗 Blockchain", status: "🟢 Verified", description: "Hash validated" },
    { label: "📊 Knowledge Graph", status: "🟢 Loaded", description: "15.2K nodes" },
    { label: "🎭 Personality System", status: "🟢 Active", description: "2 modes available" },
    { label: "💾 Memory System", status: "🟢 Active", description: "3 sessions" }
  ];

  const testButtons = [
    { label: "🧪 Test Ollama", description: "Test local LLM connection" },
    { label: "🔄 Quantum Test", description: "Run quantum processing test" },
    { label: "🧠 Test Consciousness", description: "Calculate Φ values" },
    { label: "⚛️ Quantum Demo", description: "Show quantum visualization" },
    { label: "🔗 Show Knowledge Graph", description: "Display neural network" },
    { label: "🎭 Test Personality", description: "Test current personality mode" }
  ];

  const metrics = {
    queriesAnalyzed: 1247,
    issuesDetected: 3,
    improvementRate: "94.2%",
    avgResponseQuality: "9.4/10",
    learningStatus: "Learning from interactions..."
  };

  const quickActions = [
    "🚀 Deploy AI Workforce",
    "📄 Generate Business Document",
    "💡 Get R7 Recommendations",
    "🔄 Reset Memory",
    "📊 Export Analytics"
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50 z-50 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h2 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              🤖 AI Control Panel
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Personality Modes */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">AI Personality Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={currentPersonality} onValueChange={onPersonalityChange}>
                  <SelectTrigger className="glass-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {personalityModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        <div>
                          <div className="font-medium">{mode.label}</div>
                          <div className="text-xs text-muted-foreground">{mode.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">System Status Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemStatus.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Test Buttons */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">Test Functions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {testButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto p-2 flex flex-col items-start glass-card"
                    >
                      <div className="font-medium">{button.label}</div>
                      <div className="text-xs text-muted-foreground text-left">{button.description}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Self-Improvement Metrics */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">Self-Improvement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>📈 Queries Analyzed:</span>
                    <span className="font-medium">{metrics.queriesAnalyzed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>🔍 Issues Detected:</span>
                    <span className="font-medium">{metrics.issuesDetected}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>📊 Improvement Rate:</span>
                    <span className="font-medium text-green-400">{metrics.improvementRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>⭐ Avg Response Quality:</span>
                    <span className="font-medium text-green-400">{metrics.avgResponseQuality}</span>
                  </div>
                  <div className="pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">{metrics.learningStatus}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs glass-card"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}