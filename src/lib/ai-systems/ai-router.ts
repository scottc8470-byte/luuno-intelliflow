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
    
    // Ollama keywords - general conversation and simple queries
    const ollamaKeywords = [
      '*', '+', '-', '/', 'calculate', 'math', 'equation', 'solve',
      'what is', 'who is', 'when did', 'where is', 'how do', 'why do',
      'tell me about', 'explain', 'define', 'meaning of',
      'hello', 'hi', 'hey', 'how are you', "what's up", 'good morning'
    ];
    
    // Quantum/Business keywords - specialized Luuno queries
    const quantumKeywords = [
      'luuno', 'business', 'automat', 'workflow', 'crm', 'sales', 'marketing',
      'quantum', 'agent', 'ai agent', 'optimization', 'predictive', 'analytics',
      'platform', 'system', 'infrastructure', 'revenue', 'client'
    ];
    
    // Check for Ollama keywords
    if (ollamaKeywords.some(keyword => queryLower.includes(keyword))) {
      return true;
    }
    
    // Check for Quantum keywords
    if (quantumKeywords.some(keyword => queryLower.includes(keyword))) {
      return false;
    }
    
    // Default: Short queries to Ollama, complex ones to Quantum
    return query.split(' ').length < 8;
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
    
    // Simple affirmations
    if (['no', 'yes', 'ok', 'okay'].includes(queryLower)) {
      if (queryLower === 'no') {
        return "Understood. What would you like to focus on instead? I can help with AI agents, workflow automation, or business optimization.";
      } else {
        return "Excellent! What aspect of Luuno's capabilities would you like to explore?";
      }
    }
    
    // Business-related queries
    if (this.containsAny(queryLower, ['business', 'automat', 'workflow', 'crm', 'sales', 'marketing'])) {
      return `As the Luuno AI platform, I can help you build:
🤖 **Custom AI Agents** - Sales, booking, client management, analytics
⚡ **Workflow Automation** - n8n, Flozy integration, proprietary systems
📊 **Business Intelligence** - Predictive analytics with quantum enhancement
🌐 **Infrastructure** - Centralized marketing, sales, CRM, operations

What specific business challenge would you like to solve?`;
    }
    
    // Technical/Quantum queries
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
    
    // Default response
    return "I'm the Luuno AI - your quantum-enhanced business automation platform. I can help with AI agents, workflow automation, quantum optimization, and predictive intelligence. What business challenge can I help you solve?";
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }
}

export default AIRouter;
