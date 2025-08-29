import { useState } from "react";
import { X, Brain, Circle, Settings, Zap, Database, Activity, TestTube, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AIControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const personalityModes = [
  { id: "balanced", label: "Balanced", emoji: "⚖️", description: "Optimal balance of speed and accuracy" },
  { id: "rodeo", label: "Rodeo AGI", emoji: "🤠", description: "High-performance autonomous mode" },
  { id: "academic", label: "Academic", emoji: "🎓", description: "Research-focused analytical mode" },
  { id: "hybrid", label: "Hybrid", emoji: "🔄", description: "Adaptive multi-modal approach" },
];

const systemStatus = [
  { label: "Local LLM", status: "Online", icon: Brain, active: true },
  { label: "Available Models", status: "llama2:7b", icon: Database, active: true },
  { label: "Quantum Core", status: "Active", icon: Zap, active: true },
  { label: "Blockchain", status: "Verified", icon: Circle, active: true },
  { label: "Knowledge Graph", status: "Loaded", icon: Activity, active: true },
];

const quickActions = [
  { label: "Test Ollama", icon: TestTube },
  { label: "Test Consciousness", icon: Brain },
  { label: "Quantum Demo", icon: Zap },
  { label: "Show Knowledge Graph", icon: Eye },
];

export function AIControlPanel({ isOpen, onClose }: AIControlPanelProps) {
  const [selectedMode, setSelectedMode] = useState("balanced");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 z-50 glass-card border-l border-border/50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">AI Control Panel</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto">
            {/* AI Personality Mode */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                AI Personality Mode
              </h3>
              <RadioGroup value={selectedMode} onValueChange={setSelectedMode}>
                {personalityModes.map((mode) => (
                  <div key={mode.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <RadioGroupItem value={mode.id} id={mode.id} />
                    <Label htmlFor={mode.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{mode.emoji}</span>
                        <div>
                          <div className="font-medium">{mode.label}</div>
                          <div className="text-xs text-muted-foreground">{mode.description}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator className="bg-border/50" />

            {/* System Status */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                System Status
              </h3>
              <div className="space-y-3">
                {systemStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-card">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-emerald-400 pulse-glow' : 'bg-muted'}`} />
                      <span className="text-xs text-emerald-400">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Self-Improvement */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Self-Improvement
              </h3>
              <div className="p-4 rounded-lg glass-card">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm">Learning from interactions...</span>
                </div>
                <div className="mt-3 w-full bg-muted/20 rounded-full h-1">
                  <div className="bg-gradient-primary h-1 rounded-full w-3/4 animate-pulse" />
                </div>
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="glass-card hover:bg-white/10 h-auto p-3 flex flex-col items-center gap-2"
                  >
                    <action.icon className="h-4 w-4" />
                    <span className="text-xs text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}