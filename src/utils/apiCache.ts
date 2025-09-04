// Simple in-memory cache for API responses
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class APICache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private maxSize: number = 100; // Maximum number of cached items
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes default TTL

  constructor(maxSize: number = 100, defaultTTL: number = 5 * 60 * 1000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private cleanup(): void {
    // Remove expired entries
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
      }
    }

    // If still over max size, remove oldest entries
    if (this.cache.size > this.maxSize) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toRemove = entries.slice(0, this.cache.size - this.maxSize);
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cleanup();
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Create a singleton instance
export const apiCache = new APICache();

// Rate limiting interface
interface RateLimitConfig {
  requests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const userRequests = this.requests.get(key)!;
    
    // Remove old requests outside the time window
    const validRequests = userRequests.filter(time => time > windowStart);
    
    // Check if we're under the limit
    if (validRequests.length >= this.config.requests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }

  clear(): void {
    this.requests.clear();
  }
}

// Create rate limiter for text generation
export const textRateLimiter = new RateLimiter({
  requests: 10, // 10 requests per window
  windowMs: 60 * 1000 // 1 minute window
});

// Prompt filtering utilities
export class PromptFilter {
  private inappropriateWords: Set<string>;
  private customBlacklist: Set<string> = new Set();

  constructor() {
    this.inappropriateWords = new Set([
      'violence', 'hate', 'explicit', 'adult', 'nsfw', 'porn', 'sex', 'nude',
      'weapon', 'drug', 'illegal', 'hack', 'malware', 'spam', 'scam',
      'terrorist', 'murder', 'kill', 'death', 'suicide', 'self-harm',
      'racist', 'discrimination', 'offensive', 'harassment', 'bullying'
    ]);
  }

  addToBlacklist(words: string[]): void {
    words.forEach(word => this.customBlacklist.add(word.toLowerCase()));
  }

  filterPrompt(prompt: string): string {
    let filtered = prompt.toLowerCase();
    
    // Filter inappropriate words
    this.inappropriateWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      filtered = filtered.replace(regex, '[REMOVED]');
    });
    
    // Filter custom blacklist words
    this.customBlacklist.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      filtered = filtered.replace(regex, '[REMOVED]');
    });
    
    console.log('Original prompt:', prompt);
    console.log('Filtered prompt:', filtered);
    
    // Return original if no filtering was needed, otherwise return filtered version
    return filtered === prompt.toLowerCase() ? prompt : filtered;
  }

  isSafePrompt(prompt: string): boolean {
    const filtered = this.filterPrompt(prompt);
    return filtered === prompt;
  }
}

export const promptFilter = new PromptFilter();

// Utility functions for API calls
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 30000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export function generateCacheKey(endpoint: string, params?: Record<string, string>): string {
  const paramString = params ? `?${new URLSearchParams(params).toString()}` : '';
  return `${endpoint}${paramString}`;
}