/**
 * API client with error handling and authentication
 */
import { ApiError } from '@/shared/types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface FetchConfig extends RequestInit {
  timeout?: number;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number = 10000; // 10 seconds

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string, 
    config: FetchConfig = {}
  ): Promise<T> {
    const { timeout = this.defaultTimeout, ...restConfig } = config;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...restConfig,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...restConfig.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          error: {
            code: 'UNKNOWN_ERROR',
            message: `HTTP ${response.status}: ${response.statusText}`,
          },
          success: false,
          timestamp: new Date().toISOString(),
        }));

        throw new ApiClientError(errorData);
      }

      // Handle no content responses
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiClientError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiClientError({
          error: {
            code: 'REQUEST_TIMEOUT',
            message: 'İstek zaman aşımına uğradı',
          },
          success: false,
          timestamp: new Date().toISOString(),
        });
      }

      throw new ApiClientError({
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Bilinmeyen ağ hatası',
        },
        success: false,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async get<T>(endpoint: string, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  async postFormData<T>(endpoint: string, formData: FormData, config?: FetchConfig): Promise<T> {
    const { headers, ...restConfig } = config || {};
    return this.request<T>(endpoint, {
      ...restConfig,
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...headers,
      },
    });
  }
}

export class ApiClientError extends Error {
  public readonly apiError: ApiError;

  constructor(apiError: ApiError) {
    super(apiError.error.message);
    this.name = 'ApiClientError';
    this.apiError = apiError;
  }

  get code(): string {
    return this.apiError.error.code;
  }

  get details(): any {
    return this.apiError.error.details;
  }
}

// Singleton instance
export const apiClient = new ApiClient();