import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionRequest {
  messages: ChatMessage[];
  model?: string;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  appLink?: string;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface StreamingChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      content?: string;
    };
    finish_reason: string | null;
  }>;
}

class AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OMNIFLOW_API_KEY || '';
    this.baseUrl = 'https://app.omniflow.team/api';
  }

  /**
   * Make a non-streaming chat completion request
   */
  async chatCompletion(
    request: ChatCompletionRequest
  ): Promise<ChatCompletionResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/chat`,
        {
          ...request,
          stream: false,
          modelName: process.env.LLM_MODEL_NAME,
          appLink: request.appLink,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(`AI service request failed: ${error}`);
    }
  }

  /**
   * Make a streaming chat completion request
   */
  async *chatCompletionStream(
    request: ChatCompletionRequest
  ): AsyncGenerator<string, void, unknown> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/chat`,
        {
          ...request,
          stream: true,
          modelName: process.env.LLM_MODEL_NAME,
          appLink: request.appLink,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          responseType: 'stream',
        }
      );

      const stream = response.data;
      let buffer = '';

      for await (const chunk of stream) {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              return;
            }

            try {
              const parsed: StreamingChunk = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch (parseError) {
              console.warn('Failed to parse streaming chunk:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('AI Service Streaming Error:', error);
      throw new Error(`AI service streaming request failed: ${error}`);
    }
  }

  /**
   * Simple chat method for basic conversations (non-streaming)
   */
  async chat(
    message: string,
    systemPrompt?: string,
    appLink?: string
  ): Promise<string> {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: message });

    const response = await this.chatCompletion({ messages, appLink });
    return response.choices[0]?.message?.content || '';
  }

  /**
   * Default chat method that returns streaming response
   * This is the recommended method for user-facing chat
   */
  async *chatDefault(
    message: string,
    systemPrompt?: string,
    appLink?: string
  ): AsyncGenerator<string, void, unknown> {
    yield* this.chatStream(message, systemPrompt, appLink);
  }

  /**
   * Chat with conversation history
   */
  async chatWithHistory(messages: ChatMessage[]): Promise<string> {
    const response = await this.chatCompletion({ messages });
    return response.choices[0]?.message?.content || '';
  }

  /**
   * Streaming chat method
   */
  async *chatStream(
    message: string,
    systemPrompt?: string,
    appLink?: string
  ): AsyncGenerator<string, void, unknown> {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: message });

    yield* this.chatCompletionStream({ messages, appLink });
  }
}

// Factory function to create AI service instance
export function createAIService(): AIService {
  return new AIService();
}

export default AIService;
export type { ChatMessage, ChatCompletionRequest, ChatCompletionResponse };

