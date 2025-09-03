/**
 * 🚀 LUUNO INTELLIGENCE - AI Router (TypeScript)
 * Smart routing between Ollama and Quantum AI - PRESERVED FROM WORKING SYSTEM
 */

export class AIRouter {
  
  shouldUseOllama(query: string): boolean {
    /**
     * Determine if query should go to Ollama (general) or Quantum AI (business/technical)
     */
    const queryLower = query.toLowerCase();
    
    // OLLAMA handles: Math, general knowledge, casual conversation
    const ollamaKeywords = [
      // Math
      '*', '+', '-', '/', 'calculate', 'math', 'equation', 'solve',
      // General knowledge  
      'what is', 'who is', 'when did', 'where is', 'how do', 'why do',
      'tell me about', 'explain', 'define', 'meaning of',
      // Casual conversation
      'hello', 'hi', 'hey', 'how are you', "what's up", 'good morning'
    ];
    
    // QUANTUM AI handles: Business, Luuno, quantum, automation
    const quantumKeywords = [
      'luuno', 'business', 'automat', 'workflow', 'crm', 'sales', 'marketing',
      'quantum', 'agent', 'ai agent', 'optimization', 'predictive', 'analytics',
      'platform', 'system', 'infrastructure', 'revenue', 'client'
    ];
    
    // Check for Ollama keywords
    if (ollamaKeywords.some(keyword => queryLower.includes(keyword))) {
      return true;
    }
    
    // Check for Quantum keywords (override Ollama)
    if (quantumKeywords.some(keyword => queryLower.includes(keyword))) {
      return false;
    }
    
    // Default: Short queries to Ollama, complex ones to Quantum
    return query.split(' ').length < 8;
  }

  async routeOllamaQuery(query: string): Promise<string> {
    /**
     * Route query to Ollama with natural conversation prompt
     */
    try {
      // Simple, natural conversation prompt
      const naturalPrompt = `You are a helpful AI assistant. Be conversational and natural.

User: ${query}

Response:`;
      
      const response = await fetch("http://localhost:11434/api/generate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "model": "llama3.2",
          "prompt": naturalPrompt,
          "stream": false,
          "options": {"temperature": 0.7, "top_p": 0.9}
        })
      });

      if (response.ok) {
        const data = await response.json();
        const ollamaResponse = data.response?.trim() || '';
        return ollamaResponse;
      }
      
      return "";
      
    } catch (error) {
      console.log(`❌ OLLAMA: Exception ${error}`);
      return "";
    }
  }

  generateLuunoFallback(query: string): string {
    /**
     * Simple, working Luuno responses when all LLMs fail
     * QUANTUM AI FALLBACK SYSTEM - PRESERVED FROM WORKING SYSTEM
     */
    const queryLower = query.toLowerCase().trim();
    
    // Simple greetings
    if (['hello', 'hi', 'hey'].includes(queryLower) || queryLower.startsWith('hello')) {
      return "Hello! I'm the Luuno AI - your quantum-enhanced business automation platform. How can I help transform your business today?";
    }
    
    // Simple responses
    if (['no', 'yes', 'ok', 'okay'].includes(queryLower)) {
      if (queryLower === 'no') {
        return "Understood. What would you like to focus on instead? I can help with AI agents, workflow automation, or business optimization.";
      } else {
        return "Excellent! What aspect of Luuno's capabilities would you like to explore?";
      }
    }
    
    // Business questions
    if (this.containsAny(queryLower, ['business', 'automat', 'workflow', 'crm', 'sales', 'marketing'])) {
      return `As the Luuno AI platform, I can help you build:

🤖 **Custom AI Agents** - Sales, booking, client management, analytics
⚡ **Workflow Automation** - n8n, Flozy integration, proprietary systems  
📊 **Business Intelligence** - Predictive analytics with quantum enhancement
🌐 **Infrastructure** - Centralized marketing, sales, CRM, operations

What specific business challenge would you like to solve?`;
    }

    // R7 Engine queries
    if (this.containsAny(queryLower, ['r7', 'recommendation', 'growth', 'analyze', 'business plan'])) {
      return `The R7 Recommendation Engine analyzes your business and provides 7 specific growth actions:

1. **Sales Optimization**
2. **Marketing Strategy**
3. **Operations Efficiency**
4. **Customer Retention**
5. **Revenue Streams**
6. **Cost Reduction**
7. **Growth Scaling**

Would you like me to run an R7 analysis for your business? Just tell me your business type (fitness, restaurant, consulting, etc.).`;
    }
    
    // Technical questions  
    if (this.containsAny(queryLower, ['quantum', 'how', 'what', 'why', 'fish', 'breathe'])) {
      return `I'm the Luuno AI with quantum-enhanced capabilities.

For questions like "${query}" - I can provide business-focused insights on automation, AI agents, and optimization.

My core expertise:
• Quantum-enhanced processing and optimization  
• AI agent deployment and management
• Workflow automation and intelligence
• Predictive business analytics

How can I help optimize your business operations?`;
    }
    
    // Default
    return "I'm the Luuno AI - your quantum-enhanced business automation platform. I can help with AI agents, workflow automation, quantum optimization, and predictive intelligence. What business challenge can I help you solve?";
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }
}

export default AIRouter;