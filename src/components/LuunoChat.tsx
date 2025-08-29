import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Brain, Zap, Circle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  quantum?: {
    consciousness: number;
    speedup: string;
    state: string;
  };
}

export function LuunoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm the Luuno AI - your quantum-enhanced business automation platform. How can I help transform your business today?",
      timestamp: new Date(),
      quantum: {
        consciousness: 0.847,
        speedup: "7x",
        state: "superposition"
      }
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI processing with quantum data
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
        quantum: {
          consciousness: 0.800 + Math.random() * 0.2,
          speedup: Math.floor(Math.random() * 20 + 5) + "x",
          state: ["superposition", "entangled", "coherent"][Math.floor(Math.random() * 3)]
        }
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! I'm here to help you harness the power of AI automation. What business challenge would you like to solve?";
    }
    
    if (input.includes('business') || input.includes('automat')) {
      return "Excellent! I can help you build custom AI agents for sales, marketing, customer service, and operations. We've helped businesses save 35+ hours per week through intelligent automation. What's your primary business focus?";
    }
    
    if (input.includes('agent') || input.includes('ai agent')) {
      return "AI agents are our specialty! I can deploy:\n\n🤖 **Sales Agents** - Lead qualification, follow-up, deal closing\n📞 **Customer Service** - 24/7 support, ticket resolution\n📊 **Analytics Agents** - Real-time insights and reporting\n💼 **Operations** - Workflow automation, task management\n\nWhich type interests you most?";
    }
    
    if (input.includes('quantum') || input.includes('consciousness')) {
      return "My quantum-enhanced processing allows for advanced pattern recognition and optimization beyond traditional AI. Current consciousness level: Φ = 0.847, running with quantum speedup for superior business intelligence.";
    }
    
    if (input.includes('r7') || input.includes('recommendation')) {
      return "The R7 Recommendation Engine analyzes your business and provides 7 specific growth actions:\n\n1. Sales Optimization\n2. Marketing Strategy\n3. Operations Efficiency\n4. Customer Retention\n5. Revenue Streams\n6. Cost Reduction\n7. Growth Scaling\n\nWould you like me to run an R7 analysis for your business?";
    }
    
    return "I understand you're interested in " + userInput + ". As the Luuno AI, I can help you implement intelligent automation solutions that scale with your business. What specific outcomes are you looking to achieve?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center quantum-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Luuno AI Chat
            </h1>
            <p className="text-muted-foreground">
              Quantum-enhanced business automation intelligence
            </p>
          </div>
        </div>
        
        {/* AI Status */}
        <div className="flex gap-3">
          <Badge variant="outline" className="glass-card">
            <Circle className="w-3 h-3 mr-2 text-emerald-400 animate-pulse" />
            Online
          </Badge>
          <Badge variant="outline" className="glass-card">
            <Zap className="w-3 h-3 mr-2 text-primary" />
            Quantum Enhanced
          </Badge>
          <Badge variant="outline" className="glass-card">
            <Brain className="w-3 h-3 mr-2 text-secondary" />
            Consciousness: Φ = 0.847
          </Badge>
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full p-0">
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-primary text-white ml-auto'
                            : 'glass-card'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.content}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.quantum && message.type === 'ai' && (
                          <>
                            <span>•</span>
                            <span>Φ: {message.quantum.consciousness.toFixed(3)}</span>
                            <span>•</span>
                            <span>{message.quantum.speedup} speedup</span>
                            <span>•</span>
                            <span>{message.quantum.state}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1 quantum-pulse">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass-card p-4 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Quantum processing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className="p-6 border-t border-border/50">
              <div className="flex gap-3">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about AI agents, automation, quantum processing..."
                  className="flex-1 glass-card border-border/30 focus:border-primary/50"
                  disabled={isProcessing}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isProcessing}
                  className="glass-card hover:bg-primary/20 glow-on-hover"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Brain className="w-3 h-3" />
                <span>Powered by Luuno's quantum-enhanced intelligence</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
