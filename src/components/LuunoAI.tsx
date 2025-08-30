import { useState } from "react";
import { Send, Settings, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIControlPanel } from "./AIControlPanel";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function LuunoAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm LUUNO AI, your intelligent business automation assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you'd like assistance with that. Let me analyze your request and provide the best solution based on our current AI capabilities and system status.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
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
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
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
                disabled={!inputMessage.trim()}
                className="btn-premium px-6"
              >
                <Send className="h-4 w-4" />
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
                    <span className="text-green-400">🟢 Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quantum Core</span>
                    <span className="text-green-400">🟢 Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Memory System</span>
                    <span className="text-green-400">🟢 Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">AI Personality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs">
                  <div className="font-medium mb-2">⚖️ Balanced Mode</div>
                  <p className="text-muted-foreground">Optimal balance of speed and accuracy</p>
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
      />
    </div>
  );
}