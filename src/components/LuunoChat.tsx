import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Brain, Zap, Circle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LuunoAI, { AIResponse, AIStatus } from "@/lib/ai-systems/luuno-ai";

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
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);
  const [luunoAI] = useState(() => new LuunoAI());
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

  // Initialize AI status
  useEffect(() => {
    const loadAIStatus = async () => {
      try {
        const status = await luunoAI.getSystemStatus();
        setAiStatus(status);
      } catch (error) {
        console.error('Failed to load AI status:', error);
      }
    };
    loadAIStatus();
  }, [luunoAI]);

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

    try {
      // Use real AI system
      const aiResponse: AIResponse = await luunoAI.processQuery(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        quantum: aiResponse.quantum || {
          consciousness: 0.847,
          speedup: "7x",
          state: "active"
        }
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI processing error:', error);
      
      // Fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm experiencing some processing difficulties. Please try again or check the AI Control Panel for system status.",
        timestamp: new Date(),
        quantum: {
          consciousness: 0.500,
          speedup: "1x",
          state: "error"
        }
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
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
        <div className="flex gap-3 flex-wrap">
          <Badge variant="outline" className="glass-card">
            <Circle className={`w-3 h-3 mr-2 ${aiStatus?.ollamaAvailable ? 'text-emerald-400 animate-pulse' : 'text-red-400'}`} />
            {aiStatus?.ollamaAvailable ? 'Ollama Online' : 'Ollama Offline'}
          </Badge>
          <Badge variant="outline" className="glass-card">
            <Zap className="w-3 h-3 mr-2 text-primary" />
            Quantum Enhanced
          </Badge>
          <Badge variant="outline" className="glass-card">
            <Brain className="w-3 h-3 mr-2 text-secondary" />
            Consciousness: Φ = 0.847
          </Badge>
          {aiStatus?.availableModels && aiStatus.availableModels.length > 0 && (
            <Badge variant="outline" className="glass-card">
              <Bot className="w-3 h-3 mr-2 text-muted-foreground" />
              {aiStatus.availableModels.length} Models
            </Badge>
          )}
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
