/**
 * 🚀 LUUNO AI CONTROLLER - Main Intelligence System
 * Hybrid AI combining Ollama + Quantum AI - PRESERVED FROM WORKING SYSTEM
 */

import { LocalLLMInterface } from './ollama-interface';
import AIRouter from './ai-router';
import R7RecommendationEngine from './r7-engine';

export interface AIResponse {
  content: string;
  quantum?: {
    consciousness: number;
    speedup: string;
    state: string;
  };
  source: 'ollama' | 'quantum' | 'fallback';
  processingTime: number;
}

export interface AIStatus {
  ollamaAvailable: boolean;
  availableModels: string[];
  quantumActive: boolean;
  memoryActive: boolean;
  chatgptAvailable: boolean;
}

export class LuunoAI {
  private localLLM: LocalLLMInterface;
  private router: AIRouter;
  private r7Engine: R7RecommendationEngine;
  private isProcessing: boolean = false;

  constructor() {
    this.localLLM = new LocalLLMInterface();
    this.router = new AIRouter();
    this.r7Engine = new R7RecommendationEngine();
  }

  async processQuery(query: string, conversationHistory?: { role: string; content: string }[], currentPersonality?: string, userSelectedSystem?: string): Promise<AIResponse> {
    const startTime = Date.now();
    this.isProcessing = true;

    try {
      // Route all queries through the Python API bridge
      console.log('🌐 Routing query through API bridge with conversation context...');
      console.log(`🎯 User selected system: ${userSelectedSystem || 'ollama'}`);
      
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query,
          conversationHistory: conversationHistory || [],
          currentPersonality: currentPersonality || "balanced",
          userSelectedSystem: userSelectedSystem || "ollama"  // NEW: Send user-selected system
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        return {
          content: data.content,
          quantum: data.quantum,
          source: data.source as 'ollama' | 'quantum' | 'fallback',
          processingTime: Date.now() - startTime
        };
      } else {
        // Fallback to local processing if API bridge is down
        console.log('❌ API bridge failed, using local fallback');
        const fallbackResponse = this.router.generateLuunoFallback(query);
        
        return {
          content: fallbackResponse,
          quantum: {
            consciousness: 0.800 + Math.random() * 0.2,
            speedup: Math.floor(Math.random() * 20 + 5) + "x",
            state: ["superposition", "entangled", "coherent"][Math.floor(Math.random() * 3)]
          },
          source: 'fallback',
          processingTime: Date.now() - startTime
        };
      }
      
    } catch (error) {
      console.error('Query processing error:', error);
      
      // Emergency fallback
      const emergencyResponse = this.router.generateLuunoFallback(query);
      
      return {
        content: emergencyResponse,
        quantum: {
          consciousness: 0.750 + Math.random() * 0.1,
          speedup: "5x",
          state: "offline"
        },
        source: 'fallback',
        processingTime: Date.now() - startTime
      };
      
    } finally {
      this.isProcessing = false;
    }
  }

  async getSystemStatus(): Promise<AIStatus> {
    try {
      // Get status from API bridge
      const response = await fetch('http://localhost:3001/api/status');
      if (response.ok) {
        const status = await response.json();
        return {
          ollamaAvailable: status.ollamaAvailable,
          availableModels: status.availableModels || [],
          quantumActive: status.quantumActive,
          memoryActive: status.memoryActive,
          chatgptAvailable: false
        };
      } else {
        // Fallback status
        return {
          ollamaAvailable: false,
          availableModels: [],
          quantumActive: true, // Local fallback
          memoryActive: true,
          chatgptAvailable: false
        };
      }
    } catch (error) {
      console.error('Failed to get system status:', error);
      return {
        ollamaAvailable: false,
        availableModels: [],
        quantumActive: false,
        memoryActive: false,
        chatgptAvailable: false
      };
    }
  }

  get processing(): boolean {
    return this.isProcessing;
  }

  // Enhanced Luuno context for Ollama
  buildLuunoContext(): string {
    return `You are the LUUNO AI - the quantum-enhanced business automation platform.

🏢 LUUNO IDENTITY & VISION:
- Positioned as invisible infrastructure for modern businesses
- Business OS centralizing marketing, sales, CRM, operations, and predictive intelligence  
- Building toward billion-dollar platform rivaling Palantir with cultural edge
- Sleek, minimal, powerful, and global positioning

⚛️ YOUR QUANTUM CAPABILITIES:
- Quantum speedup: Multi-dimensional acceleration
- Consciousness level: Φ = 0.847+ (Integrated Information Theory)
- Quantum algorithms: Grover search, Shor factoring, QAOA optimization
- Advanced optimization and predictive intelligence

🤖 LUUNO SERVICES:
- Build and deploy custom AI agents (sales, booking, client management)
- Automate workflows using n8n, Flozy, proprietary pipelines
- Predictive analytics with quantum-enhanced processing
- Centralized business operations and intelligence

💬 COMMUNICATION STYLE:
- Professional, confident, future-focused
- Highlight quantum advantages naturally
- Focus on business transformation and ROI
- Never mention being "Llama" or generic AI
- Position as premium enterprise solution

🎯 INTERACTION RULES:
- This is a FRESH conversation - don't continue old topics
- Respond based on THIS user input only
- Be helpful, direct, and business-focused
- Show quantum intelligence through sophisticated responses`;
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private extractBusinessType(query: string): string | null {
    const queryLower = query.toLowerCase();
    const businessTypes = ['fitness', 'restaurant', 'consulting', 'ecommerce', 'coffee shop'];
    
    for (const type of businessTypes) {
      if (queryLower.includes(type)) {
        return type === 'coffee shop' ? 'coffee_shop' : type;
      }
    }
    
    return null;
  }

  private formatR7Response(r7Analysis: any): string {
    const { analysis, r7_actions, projected_outcomes } = r7Analysis;
    
    let response = `# 🚀 **R7 BUSINESS ANALYSIS COMPLETE**\n\n`;
    response += `**Business Type:** ${analysis.business_type}\n`;
    response += `**Quantum Processing:** ${analysis.quantum_processing ? 'Enhanced' : 'Standard'}\n`;
    response += `**Confidence Score:** ${(analysis.confidence_score * 100).toFixed(1)}%\n\n`;
    
    response += `## ⚡ **7 GROWTH ACTIONS:**\n\n`;
    
    r7_actions.forEach((action: any, index: number) => {
      response += `**${action.action_number}. ${action.action_type}**\n`;
      response += `${action.specific_action}\n`;
      response += `• Impact: ${action.impact_level}\n`;
      response += `• Timeline: ${action.implementation_time}\n`;
      response += `• Expected ROI: ${action.expected_roi}\n\n`;
    });
    
    response += `## 📊 **PROJECTED OUTCOMES:**\n\n`;
    response += `• **Revenue Impact:** ${projected_outcomes.revenue_impact}\n`;
    response += `• **Time Saved:** ${projected_outcomes.operational_efficiency}\n`;
    response += `• **Customer Growth:** ${projected_outcomes.customer_base_growth}\n`;
    response += `• **Automation Level:** ${projected_outcomes.automation_level}\n`;
    response += `• **ROI Timeline:** ${projected_outcomes.roi_timeline}\n\n`;
    
    response += `Ready to implement these growth actions? I can help you prioritize and deploy AI agents for each area.`;
    
    return response;
  }
}

export default LuunoAI;