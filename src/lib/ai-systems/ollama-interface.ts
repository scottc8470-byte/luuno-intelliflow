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
      // Check via API bridge
      const response = await fetch('http://localhost:3001/api/status');
      if (response.ok) {
        const status = await response.json();
        this.ollama_available = status.ollamaAvailable;
        this.available_models = status.availableModels || [];
        return this.ollama_available;
      } else {
        this.ollama_available = false;
        return false;
      }
    } catch (error) {
      console.log('API bridge not available:', error);
      this.ollama_available = false;
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
    
    // Use specified model or find best available
    const modelsToTry = model ? [model] : [];
    for (const preferred of preferredModels) {
      if (this.available_models.some(available => available.includes(preferred))) {
        if (!modelsToTry.includes(preferred)) {
          modelsToTry.push(preferred);
        }
      }
    }
    
    if (modelsToTry.length === 0) {
      modelsToTry.push("llama2:7b"); // Ultimate fallback
    }

    // Try top 2 models for reliability
    for (const modelName of modelsToTry.slice(0, 2)) {
      try {
        // Use the rich Luuno context if provided, otherwise basic rules
        let fullPrompt: string;
        if (context && context.includes("LUUNO") && context.length > 100) {
          // Use the full Luuno context as the system prompt
          fullPrompt = `${context}\n\nUser Question: ${prompt}\n\nLuuno AI Response:`;
        } else {
          // Fallback to basic Luuno identity
          const systemPrompt = `You are the LUUNO AI - quantum-enhanced business automation platform.

IDENTITY: Invisible infrastructure for modern businesses. Building toward billion-dollar platform.
STYLE: Minimal, high-class, future-focused. Never call yourself "Llama".

Model: ${modelName}`;
          fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\n\nResponse:`;
        }

        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: modelName,
            prompt: fullPrompt,
            stream: false,
            options: {
              temperature: 0.8,
              top_p: 0.9,
              top_k: 40,
              num_predict: 1000,
            }
          })
        });

        if (response.ok) {
          const data: OllamaResponse = await response.json();
          const llmResponse = data.response || 'No response generated';
          
          // Clean up the response
          let cleanResponse = llmResponse;
          if (cleanResponse.startsWith('Assistant:')) {
            cleanResponse = cleanResponse.substring(10).trim();
          }
          
          // Check if response follows our rules
          const bannedPhrases = ["as a quantum ai assistant", "as an ai", "*smiles*", "*chuckles*"];
          const responseLower = cleanResponse.toLowerCase();
          
          if (!bannedPhrases.some(banned => responseLower.includes(banned))) {
            console.log(`✅ SUCCESS: Model ${modelName} gave clean response!`);
            return cleanResponse;
          } else {
            console.log(`❌ FAILED: Model ${modelName} used banned phrases`);
            // Try next model in the loop
            continue;
          }
        } else {
          console.log(`❌ HTTP ERROR: Model ${modelName} returned status ${response.status}`);
          continue;
        }
      } catch (error) {
        console.log(`❌ EXCEPTION: Model ${modelName} failed: ${error}`);
        continue;
      }
    }

    // If all models failed, return fallback
    console.log(`⚠️ ALL MODELS FAILED: Using fallback response`);
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