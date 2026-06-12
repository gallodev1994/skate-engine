// Legacy DTOs - Simple data transfer objects for standalone usage

export interface TrickResult {
  success: boolean;
  trickName: string;
  message: string;
  timestamp: Date;
}

export interface EngineConfig {
  enableLogging?: boolean;
  customTricks?: Record<string, () => Promise<TrickResult>>;
}