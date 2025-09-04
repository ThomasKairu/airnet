import {
  apiCache,
  textRateLimiter,
  promptFilter,
  fetchWithTimeout,
  generateCacheKey
} from '../utils/apiCache';

export interface TextGenerationOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}


export interface GenerationResult {
  success: boolean;
  data?: string;
  error?: string;
  cached?: boolean;
}

class PollinationsService {
  private readonly BASE_URL = {
    text: 'https://text.pollinations.ai'
  };

  private readonly DEFAULT_TIMEOUT = 30000; // 30 seconds
  private readonly CACHE_TTL = {
    text: 10 * 60 * 1000 // 10 minutes
  };

  /**
   * Generate text using Pollinations AI
   */
  async generateText(
    prompt: string,
    options: TextGenerationOptions = {}
  ): Promise<GenerationResult> {
    try {
      console.log('PollinationsService.generateText called with:', prompt);
      
      // Validate input
      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        console.error('Validation failed: empty prompt');
        return {
          success: false,
          error: 'Prompt is required and must be a non-empty string'
        };
      }

      // Check rate limit
      const userKey = this.getUserKey();
      console.log('User key for rate limiting:', userKey);
      
      if (!textRateLimiter.isAllowed(userKey)) {
        console.error('Rate limit exceeded for user:', userKey);
        return {
          success: false,
          error: 'Rate limit exceeded. Please wait before trying again.'
        };
      }

      // Filter prompt for safety
      const filteredPrompt = promptFilter.filterPrompt(prompt);
      console.log('Filtered prompt:', filteredPrompt);
      
      // Check cache
      const cacheKey = generateCacheKey(`${this.BASE_URL.text}/prompt/${encodeURIComponent(filteredPrompt)}`, Object.fromEntries(
        Object.entries(options).map(([key, value]) => [key, String(value)])
      ));
      console.log('Cache key:', cacheKey);
      
      const cachedResult = apiCache.get<string>(cacheKey);
      
      if (cachedResult) {
        console.log('Returning cached result');
        return {
          success: true,
          data: cachedResult,
          cached: true
        };
      }

      // Build URL with options - using the correct format from Pollinations API
      const baseUrl = `${this.BASE_URL.text}/`;
      const url = new URL(baseUrl);
      url.pathname = `/prompt/${encodeURIComponent(filteredPrompt)}`;
      
      const params = new URLSearchParams();
      
      if (options.model) params.append('model', options.model);
      if (options.temperature) params.append('temperature', options.temperature.toString());
      if (options.maxTokens) params.append('maxTokens', options.maxTokens.toString());
      
      if (params.toString()) {
        url.search = params.toString();
      }

      console.log('Final URL:', url.toString());

      // Make request with timeout
      console.log('Making fetch request...');
      const response = await fetchWithTimeout(url.toString(), {}, this.DEFAULT_TIMEOUT);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP error:', response.status, response.statusText, errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.text();
      console.log('Response data length:', data.length);
      console.log('Response data preview:', data.substring(0, 200));
      
      // Check if the response is empty or just an error message
      if (!data || data.trim().length === 0) {
        throw new Error('Empty response from API');
      }
      
      // Check if the response contains error keywords
      const lowerData = data.toLowerCase();
      if (lowerData.includes('error') || lowerData.includes('failed') || lowerData.includes('sorry')) {
        console.warn('API response may contain error:', data);
      }

      // Cache the result
      apiCache.set(cacheKey, data, this.CACHE_TTL.text);

      return {
        success: true,
        data
      };

    } catch (error) {
      console.error('Text generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate text'
      };
    }
  }


  /**
   * Get available text models
   */
  async getTextModels(): Promise<string[]> {
    try {
      const cacheKey = 'text-models';
      const cachedModels = apiCache.get<string[]>(cacheKey);
      
      if (cachedModels) {
        return cachedModels;
      }

      const response = await fetchWithTimeout(
        `${this.BASE_URL.text}/models`, 
        {}, 
        this.DEFAULT_TIMEOUT
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const models = await response.json();
      apiCache.set(cacheKey, models, 60 * 60 * 1000); // Cache for 1 hour

      return models;
    } catch (error) {
      console.error('Error fetching text models:', error);
      return [];
    }
  }


  /**
   * Generate audio using Pollinations AI
   */
  async generateAudio(
    prompt: string, 
    voice: string = 'alloy'
  ): Promise<GenerationResult> {
    try {
      // Validate input
      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return {
          success: false,
          error: 'Prompt is required and must be a non-empty string'
        };
      }

      // Check rate limit
      const userKey = this.getUserKey();
      if (!textRateLimiter.isAllowed(userKey)) {
        return {
          success: false,
          error: 'Rate limit exceeded. Please wait before trying again.'
        };
      }

      // Filter prompt for safety
      const filteredPrompt = promptFilter.filterPrompt(prompt);
      
      const url = new URL(`${this.BASE_URL.text}/${encodeURIComponent(filteredPrompt)}`);
      url.search = new URLSearchParams({
        model: 'openai-audio',
        voice: voice
      }).toString();

      const response = await fetchWithTimeout(url.toString(), {}, this.DEFAULT_TIMEOUT);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      return {
        success: true,
        data
      };

    } catch (error) {
      console.error('Audio generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate audio'
      };
    }
  }

  /**
   * Get real-time text feed
   */
  async getTextFeed(): Promise<string[]> {
    try {
      const response = await fetchWithTimeout(
        `${this.BASE_URL.text}/feed`, 
        {}, 
        this.DEFAULT_TIMEOUT
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching text feed:', error);
      return [];
    }
  }


  /**
   * Clear all caches
   */
  clearCache(): void {
    apiCache.clear();
  }

  /**
   * Get user key for rate limiting
   */
  private getUserKey(): string {
    // In a real application, you might want to use user ID, IP address, or session ID
    // For now, we'll use a simple approach based on browser fingerprint
    if (typeof window !== 'undefined') {
      return `browser_${window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, '_')}`;
    }
    return 'default_user';
  }

  /**
   * Add custom words to the blacklist
   */
  addToBlacklist(words: string[]): void {
    promptFilter.addToBlacklist(words);
  }

  /**
   * Check if a prompt is safe
   */
  isSafePrompt(prompt: string): boolean {
    return promptFilter.isSafePrompt(prompt);
  }

  /**
   * Convert options object to string record for URL parameters
   */
}

// Create singleton instance
export const pollinationsService = new PollinationsService();

// Export convenience functions
export const generateText = (prompt: string, options?: TextGenerationOptions) => 
  pollinationsService.generateText(prompt, options);

export const getTextModels = () => pollinationsService.getTextModels();
export const generateAudio = (prompt: string, voice?: string) =>
  pollinationsService.generateAudio(prompt, voice);
export const getTextFeed = () => pollinationsService.getTextFeed();
export const clearCache = () => pollinationsService.clearCache();
export const addToBlacklist = (words: string[]) => pollinationsService.addToBlacklist(words);
export const isSafePrompt = (prompt: string) => pollinationsService.isSafePrompt(prompt);