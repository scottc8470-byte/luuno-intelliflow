import { useState, useEffect } from "react";
import { Send, Settings, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIControlPanel } from "./AIControlPanel";
import LuunoAISystem from "@/lib/ai-systems/luuno-ai";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  quantum?: {
    consciousness: number;
    speedup: string;
    state: string;
  };
  source?: string;
}

export function LuunoAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm LUUNO AI, your quantum-enhanced business automation platform. How can I help transform your business today?",
      isUser: false,
      timestamp: new Date(),
      quantum: {
        consciousness: 0.847,
        speedup: "7x",
        state: "superposition"
      },
      source: "quantum"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [currentPersonality, setCurrentPersonality] = useState("balanced");
  const [userSelectedSystem, setUserSelectedSystem] = useState("ollama");
  const [luunoAI] = useState(() => new LuunoAISystem());
  const [aiStatus, setAIStatus] = useState({
    ollamaAvailable: false,
    availableModels: [],
    quantumActive: true,
    memoryActive: true
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Load AI status on component mount
  useEffect(() => {
    const loadAIStatus = async () => {
      try {
        const status = await luunoAI.getSystemStatus();
        setAIStatus(status);
      } catch (error) {
        console.error('Failed to load AI status:', error);
      }
    };
    
    loadAIStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(loadAIStatus, 30000);
    return () => clearInterval(interval);
  }, [luunoAI]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputMessage;
    setInputMessage("");
    setIsProcessing(true);

    try {
      // Use the real LUUNO AI system with current personality and user-selected system
      const response = await luunoAI.processQuery(currentQuery, [], currentPersonality, userSelectedSystem);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.content,
        isUser: false,
        timestamp: new Date(),
        quantum: response.quantum,
        source: response.source
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI processing error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
        source: "error"
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LUUNO AI
            </h1>
            <p className="text-sm text-muted-foreground">Intelligent Business Assistant</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsControlPanelOpen(true)}
          className="glass-card"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-primary text-white'
                      : 'glass-card'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`text-xs mt-2 ${
                    message.isUser ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.quantum && (
                        <>
                          <span>•</span>
                          <span>Φ: {message.quantum.consciousness.toFixed(3)}</span>
                          <span>•</span>
                          <span>{message.quantum.speedup} speedup</span>
                          <span>•</span>
                          <span>{message.quantum.state}</span>
                        </>
                      )}
                      {message.source && !message.quantum && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{message.source}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask LUUNO AI anything about business automation..."
                className="flex-1 glass-card"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isProcessing}
                className="btn-premium px-6"
              >
                {isProcessing ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Control Panel Features Below Chat */}
      <div className="p-6 border-t border-border/50 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Control Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Local LLM</span>
                    <span className={aiStatus.ollamaAvailable ? "text-green-400" : "text-red-400"}>
                      {aiStatus.ollamaAvailable ? "🟢 Online" : "🔴 Offline"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quantum Core</span>
                    <span className={aiStatus.quantumActive ? "text-green-400" : "text-red-400"}>
                      {aiStatus.quantumActive ? "🟢 Active" : "🔴 Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Memory System</span>
                    <span className={aiStatus.memoryActive ? "text-green-400" : "text-red-400"}>
                      {aiStatus.memoryActive ? "🟢 Active" : "🔴 Inactive"}
                    </span>
                  </div>
                  {aiStatus.availableModels.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Models</span>
                      <span className="text-blue-400">{aiStatus.availableModels.length} Available</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">AI System Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* System Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-foreground">AI System:</label>
                    <Select value={userSelectedSystem} onValueChange={setUserSelectedSystem}>
                      <SelectTrigger className="w-full text-xs h-8 glass-card border border-primary/30">
                        <SelectValue placeholder="Select AI System" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border border-primary/30">
                        <SelectItem value="ollama">🐙 Ollama - Local LLM</SelectItem>
                        <SelectItem value="agi">⚛️ AGI - Quantum Intelligence</SelectItem>
                        <SelectItem value="business">💼 Business - R7 Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Personality Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-foreground">Personality:</label>
                    <Select value={currentPersonality} onValueChange={setCurrentPersonality}>
                      <SelectTrigger className="w-full text-xs h-8 glass-card border border-secondary/30">
                        <SelectValue placeholder="Select Personality" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border border-secondary/30">
                        <SelectItem value="balanced">⚖️ Balanced</SelectItem>
                        <SelectItem value="strict_business">💼 Strict Business</SelectItem>
                        <SelectItem value="quantum_expert">⚛️ Quantum Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Current Selection Display */}
                  <div className="flex gap-2 pt-2">
                    <div className="text-xs px-2 py-1 rounded bg-primary/10 border border-primary/30 text-primary">
                      🎯 {userSelectedSystem.toUpperCase()}
                    </div>
                    <div className="text-xs px-2 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary">
                      🎭 {currentPersonality.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Queries Analyzed</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Avg Quality Score</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => setIsControlPanelOpen(true)}
                >
                  Open Full Control Panel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Control Panel */}
      <AIControlPanel
        isOpen={isControlPanelOpen}
        onClose={() => setIsControlPanelOpen(false)}
        currentPersonality={currentPersonality}
        onPersonalityChange={setCurrentPersonality}
      />
    </div>
  );
}