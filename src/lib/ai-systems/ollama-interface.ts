/**
 * 🚀 LUUNO INTELLIGENCE - Ollama Interface (TypeScript)
 * Natural conversation handler using local LLMs - PRESERVED FROM WORKING SYSTEM
 */

export interface OllamaModel {
  name: string;
  size?: string;
  modified_at?: string;
}

export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export class LocalLLMInterface {
  private ollama_available: boolean = false;
  private available_models: string[] = [];

  constructor() {
    this.initializeOllama();
  }

  private async initializeOllama(): Promise<void> {
    this.ollama_available = await this.checkOllama();
    if (this.ollama_available) {
      this.available_models = await this.getAvailableModels();
    }
  }

  private async checkOllama(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return response.ok;
    } catch (error) {
      console.log('Ollama not available:', error);
      return false;
    }
  }

  private async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      const data = await response.json();
      return data.models?.map((model: OllamaModel) => model.name) || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  }

  async queryLocalLLM(prompt: string, model?: string, context: string = ""): Promise<string> {
    if (!this.ollama_available) {
      return this.fallbackResponse(prompt);
    }

    // Try best available models in order of capability
    const preferredModels = ["llama3.2", "llama3.1", "llama3", "llama2:7b", "mistral", "codellama"];
    const modelsToTry = model ? [model] : [];
    
    for (const preferred of preferredModels) {
      if (this.available_models.some(available => available.includes(preferred))) {
        if (!modelsToTry.includes(preferred)) {
          modelsToTry.push(preferred);
        }
      }
    }

    if (modelsToTry.length === 0) {
      modelsToTry.push("llama2:7b"); // Default fallback
    }

    // Try up to 2 models for reliability
    for (const modelName of modelsToTry.slice(0, 2)) {
      try {
        let fullPrompt: string;
        
        if (context && context.includes("LUUNO") && context.length > 100) {
          // Use rich Luuno context if provided
          fullPrompt = `${context}\\n\\nUser Question: ${prompt}\\n\\nLuuno AI Response:`;
        } else {
          // Basic Luuno identity
          const systemPrompt = `You are the LUUNO AI - quantum-enhanced business automation platform.
IDENTITY: Invisible infrastructure for modern businesses. Building toward billion-dollar platform.
STYLE: Minimal, high-class, future-focused. Never call yourself "Llama".
Model: ${modelName}`;
          fullPrompt = `${systemPrompt}\\n\\nUser: ${prompt}\\n\\nResponse:`;
        }

        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: modelName,
            prompt: fullPrompt,
            stream: false,
            options: {
              temperature: 0.7,
              top_p: 0.9,
              max_tokens: 1000
            }
          })
        });

        if (response.ok) {
          const data: OllamaResponse = await response.json();
          const responseText = data.response?.trim();
          
          if (responseText && responseText.length > 10) {
            console.log(`✅ Ollama Success: ${modelName}`);
            return responseText;
          }
        }
      } catch (error) {
        console.log(`❌ Ollama ${modelName} failed:`, error);
        continue;
      }
    }

    return this.fallbackResponse(prompt);
  }

  private fallbackResponse(prompt: string): string {
    return `🤖 Local LLM unavailable. Processing '${prompt}' with base AI capabilities.`;
  }

  // Public getters
  get isOllamaAvailable(): boolean {
    return this.ollama_available;
  }

  get getAvailableModelsList(): string[] {
    return [...this.available_models];
  }

  // Refresh connection
  async refreshConnection(): Promise<void> {
    await this.initializeOllama();
  }
}
