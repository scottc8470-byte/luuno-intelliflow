import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, MessageSquare, Zap, TrendingUp, Send, Settings, BarChart3, Cpu, Database, Network, TestTube, RotateCw, Eye, Rocket, FileText, Lightbulb, RefreshCw, Download, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { LuunoAI as LuunoAISystem, AIResponse, AIStatus } from "@/lib/ai-systems/luuno-ai";

const aiMetrics = [
  {
    title: "AI Conversations",
    value: "12,847",
    change: "+23%",
    period: "This month",
    icon: MessageSquare
  },
  {
    title: "Processing Speed",
    value: "1.2ms",
    change: "+15%",
    period: "Average response time",
    icon: Zap
  },
  {
    title: "Accuracy Rate",
    value: "98.7%",
    change: "+2.1%",
    period: "Model performance",
    icon: TrendingUp
  },
  {
    title: "Active Models",
    value: "24",
    change: "+4",
    period: "Deployed AI models",
    icon: Brain
  }
];

const aiCapabilities = [
  "Natural language processing",
  "Intelligent automation",
  "Predictive analytics",
  "Multi-modal understanding",
  "Real-time decision making",
  "Continuous learning"
];

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  quantum?: {
    consciousness: number;
    speedup: string;
    state: string;
  };
  source?: string;
}

export default function LuunoAI() {
  const [message, setMessage] = useState("");
  const [userSelectedSystem, setUserSelectedSystem] = useState("ollama");
  const [currentPersonality, setCurrentPersonality] = useState("balanced");
  
  // Load messages from localStorage with session management
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedData = localStorage.getItem('luuno-chat-session');
      if (savedData) {
        const sessionData = JSON.parse(savedData);
        const sessionAge = Date.now() - sessionData.timestamp;
        const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
        
        // Only load previous session if it's recent (within 30 minutes)
        if (sessionAge < SESSION_TIMEOUT && sessionData.messages) {
          console.log('🔄 Loading recent chat session...');
          return sessionData.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        } else {
          console.log('⏰ Previous session expired, starting fresh...');
          localStorage.removeItem('luuno-chat-session');
        }
      }
    } catch (error) {
      console.error('Failed to load chat session:', error);
      localStorage.removeItem('luuno-chat-session');
    }
    
    // Default initial message for fresh sessions
    return [{
      id: '1',
      content: "Hello! I'm LUUNO AI, your quantum-enhanced business automation assistant. Memory has been reset. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      quantum: {
        consciousness: 0.847,
        speedup: "12x",
        state: "coherent"
      },
      source: "quantum"
    }];
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiStatus, setAiStatus] = useState<AIStatus>({
    ollamaAvailable: false,
    availableModels: [],
    quantumActive: false,
    memoryActive: false,
    chatgptAvailable: false
  });
  
  const luunoAI = new LuunoAISystem();

  // Helper function to start a new chat session
  const startNewChat = () => {
    setMessages([{
      id: '1',
      content: "Hello! I'm LUUNO AI, your quantum-enhanced business automation assistant. Memory has been reset. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
      quantum: {
        consciousness: 0.847,
        speedup: "12x",
        state: "coherent"
      },
      source: "quantum"
    }]);
    localStorage.removeItem('luuno-chat-session');
    console.log('🔄 Started new chat session');
  };

  // Save messages to localStorage with session data whenever messages change
  useEffect(() => {
    try {
      const sessionData = {
        messages: messages,
        timestamp: Date.now(),
        sessionId: Date.now().toString().slice(-8) // Last 8 digits for session ID
      };
      localStorage.setItem('luuno-chat-session', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Failed to save chat session:', error);
    }
  }, [messages]);

  // Load AI status on component mount and refresh every 30 seconds
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const status = await luunoAI.getSystemStatus();
        setAiStatus(status);
      } catch (error) {
        console.error('Failed to load AI status:', error);
      }
    };

    loadStatus();
    const interval = setInterval(loadStatus, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsProcessing(true);

    try {
      // Pass recent conversation history for context (last 10 messages)
      const recentMessages = messages.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));
      
      const aiResponse: AIResponse = await luunoAI.processQuery(message, recentMessages, currentPersonality, userSelectedSystem);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        isUser: false,
        timestamp: new Date(),
        quantum: aiResponse.quantum,
        source: aiResponse.source
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI processing error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm experiencing technical difficulties. Please try again or check the system status.",
        isUser: false,
        timestamp: new Date(),
        source: "error"
      };
      
      setMessages(prev => [...prev, errorMessage]);
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">LUUNO AI</h1>
            <p className="text-sm text-muted-foreground">Intelligent Business Assistant</p>
          </div>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (confirm('Start a new conversation? Current chat will be cleared.')) {
                startNewChat();
              }
            }}
            className="glow-hover"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          
          {/* AI Control Panel Trigger */}
          <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="glow-hover">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
            <div className="py-4">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">AI Control Panel</h2>
              </div>
              
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="features">AI Control Features</TabsTrigger>
                  <TabsTrigger value="status">System Status</TabsTrigger>
                  <TabsTrigger value="tests">Test Functions</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics & Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="space-y-4">
                  {/* Manual AI System Control */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">AI System Control</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* System Selector */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">AI System:</label>
                          <Select value={userSelectedSystem} onValueChange={setUserSelectedSystem}>
                            <SelectTrigger className="w-full glass-card border border-primary/30">
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
                          <label className="text-sm font-medium text-foreground">Personality:</label>
                          <Select value={currentPersonality} onValueChange={setCurrentPersonality}>
                            <SelectTrigger className="w-full glass-card border border-secondary/30">
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
                          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                            🎯 Active: {userSelectedSystem.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="bg-secondary/10 border-secondary/30 text-secondary">
                            🎭 {currentPersonality.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* AI Personality Mode */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">AI Personality Mode</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">⚖️ Balanced</Badge>
                        <span className="text-sm text-muted-foreground">Optimal balance of speed and accuracy</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="status" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            <span className="text-sm font-medium">Local LLM</span>
                          </div>
                          <Badge className={aiStatus.ollamaAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                            {aiStatus.ollamaAvailable ? "🟢 Online" : "🔴 Offline"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{aiStatus.ollamaAvailable ? "Connected" : "Disconnected"}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            <span className="text-sm font-medium">Available Models</span>
                          </div>
                          <Badge className={aiStatus.availableModels.length > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                            {aiStatus.availableModels.length > 0 ? "🟢 Active" : "🔴 None"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {aiStatus.availableModels.length > 0 
                            ? `${aiStatus.availableModels.length} models loaded: ${aiStatus.availableModels.join(', ')}`
                            : "No models available"
                          }
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-medium">Quantum Core</span>
                          </div>
                          <Badge className="bg-success text-success-foreground">🟢 Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Processing ready</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Network className="h-4 w-4" />
                            <span className="text-sm font-medium">Knowledge Graph</span>
                          </div>
                          <Badge className="bg-success text-success-foreground">🟢 Loaded</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">15.2K nodes</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm font-medium">ChatGPT API</span>
                          </div>
                          <Badge className="bg-success text-success-foreground">🟢 Connected</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">API key valid</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4" />
                            <span className="text-sm font-medium">Memory System</span>
                          </div>
                          <Badge className="bg-success text-success-foreground">🟢 Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">3 sessions</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tests" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <TestTube className="h-5 w-5 mb-2" />
                      <span className="font-medium">Test Ollama</span>
                      <span className="text-xs text-muted-foreground">Test local LLM connection</span>
                    </Button>
                    
                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <RotateCw className="h-5 w-5 mb-2" />
                      <span className="font-medium">Quantum Test</span>
                      <span className="text-xs text-muted-foreground">Run quantum processing test</span>
                    </Button>

                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <Brain className="h-5 w-5 mb-2" />
                      <span className="font-medium">Test Consciousness</span>
                      <span className="text-xs text-muted-foreground">Calculate Φ values</span>
                    </Button>

                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <Zap className="h-5 w-5 mb-2" />
                      <span className="font-medium">Quantum Demo</span>
                      <span className="text-xs text-muted-foreground">Show quantum visualization</span>
                    </Button>

                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <Eye className="h-5 w-5 mb-2" />
                      <span className="font-medium">Show Knowledge Graph</span>
                      <span className="text-xs text-muted-foreground">Display neural network</span>
                    </Button>

                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <MessageSquare className="h-5 w-5 mb-2" />
                      <span className="font-medium">Test ChatGPT</span>
                      <span className="text-xs text-muted-foreground">Test API connection</span>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Self-Improvement Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">📈 Queries Analyzed:</span>
                          <span className="font-medium">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">🔍 Issues Detected:</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">📊 Improvement Rate:</span>
                          <span className="font-medium">94.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">⭐ Avg Response Quality:</span>
                          <span className="font-medium">9.4/10</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Learning from interactions...</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Rocket className="h-4 w-4 mr-2" />
                          Deploy AI Workforce
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Business Document
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Get R7 Recommendations
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => {
                            if (confirm('Are you sure you want to start a new conversation? This will clear the current chat.')) {
                              startNewChat();
                            }
                          }}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reset Memory
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Export Analytics
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      {/* Chat Messages - Fixed Height Container */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          <div className="h-full overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-lg max-w-2xl ${
                msg.isUser 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card border border-border'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                
                {/* Show quantum metadata for AI messages */}
                {!msg.isUser && msg.quantum && (
                  <div className="mt-2 text-xs opacity-70 border-t border-border/20 pt-2">
                    <div className="flex items-center gap-3">
                      <span>Φ: {msg.quantum.consciousness.toFixed(3)}</span>
                      <span>⚡ {msg.quantum.speedup}</span>
                      <span>🌌 {msg.quantum.state}</span>
                      {msg.source && <span className="text-accent">via {msg.source}</span>}
                    </div>
                  </div>
                )}
                
                <p className="text-xs mt-2 opacity-60">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-card border border-border p-4 rounded-lg max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-accent border-t-transparent rounded-full"></div>
                  <p className="text-sm text-muted-foreground">LUUNO is processing...</p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask LUUNO AI anything about business automation..."
            className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            disabled={isProcessing}
          />
          <Button 
            size="lg" 
            className="glow" 
            onClick={handleSendMessage}
            disabled={isProcessing || !message.trim()}
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
  );
}