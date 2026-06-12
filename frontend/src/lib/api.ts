import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type {
  CreateTrickInput,
  UpdateTrickInput,
  ListTricksInput,
  TrickOutput,
  ListTricksOutput,
  TrickStatsOutput,
  OverallStatsOutput,
  ExecuteTrickInput,
  ExecuteTrickOutput,
  ApiError,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        const message = error.response?.data?.message || error.message;
        console.error('API Error:', message);
        return Promise.reject(error);
      }
    );
  }

  // Trick Management
  async createTrick(input: CreateTrickInput): Promise<TrickOutput> {
    const response = await this.client.post<TrickOutput>('/tricks', input);
    return response.data;
  }

  async listTricks(params?: ListTricksInput): Promise<ListTricksOutput> {
    const response = await this.client.get<ListTricksOutput>('/tricks', { params });
    return response.data;
  }

  async getTrickById(id: string): Promise<TrickOutput | null> {
    try {
      const response = await this.client.get<TrickOutput>(`/tricks/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async updateTrick(id: string, input: UpdateTrickInput): Promise<TrickOutput> {
    const response = await this.client.put<TrickOutput>(`/tricks/${id}`, input);
    return response.data;
  }

  async deleteTrick(id: string): Promise<void> {
    await this.client.delete(`/tricks/${id}`);
  }

  // Statistics
  async getTrickStats(trickId: string, period?: string): Promise<TrickStatsOutput> {
    const response = await this.client.get<TrickStatsOutput>(`/tricks/${trickId}/stats`, {
      params: { period },
    });
    return response.data;
  }

  async getOverallStats(period?: string): Promise<OverallStatsOutput> {
    const response = await this.client.get<OverallStatsOutput>('/tricks/stats/overall', {
      params: { period },
    });
    return response.data;
  }

  // Execution
  async executeTrick(input: ExecuteTrickInput): Promise<ExecuteTrickOutput> {
    const response = await this.client.post<ExecuteTrickOutput>('/tricks/execute', input);
    return response.data;
  }

  // Specific trick executions
  async executeFlipTrick(endpoint: string, trickId: string, metadata?: Record<string, unknown>) {
    return this.client.post(`/tricks/flip/${endpoint}`, { trickId, metadata });
  }

  async executeOllieTrick(endpoint: string, trickId: string, metadata?: Record<string, unknown>) {
    return this.client.post(`/tricks/ollie/${endpoint}`, { trickId, metadata });
  }

  async executeManualTrick(endpoint: string, trickId: string, metadata?: Record<string, unknown>) {
    return this.client.post(`/tricks/manual/${endpoint}`, { trickId, metadata });
  }

  async executeGrindSlideTrick(endpoint: string, trickId: string, metadata?: Record<string, unknown>) {
    return this.client.post(`/tricks/grind-slide/${endpoint}`, { trickId, metadata });
  }

  async executeGrabTrick(trickId: string, metadata?: Record<string, unknown>) {
    return this.client.post('/tricks/grab/grab', { trickId, metadata });
  }
}

export const api = new ApiClient();

// Server-side API client for SSR
export function createServerApiClient() {
  return new ApiClient();
}