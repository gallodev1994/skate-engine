// API Types matching backend DTOs

export type TrickCategory =
  | 'FLIP'
  | 'OLLIE_VARIATION'
  | 'MANUAL'
  | 'GRIND_SLIDE'
  | 'GRAB';

export type TrickDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type FlipDirection = 'frontside' | 'backside' | 'none';
export type Stance = 'regular' | 'goofy' | 'switch' | 'fakie' | 'nollie';
export type ManualType = 'manual' | 'noseManual';
export type GrindType = 'grind' | 'slide';
export type GrabType = string;

export interface BaseTrickInput {
  name: string;
  difficulty: TrickDifficulty;
  category: TrickCategory;
  videoUrl?: string;
}

export interface CreateFlipTrickInput extends BaseTrickInput {
  category: 'FLIP';
  rotationDegrees?: number;
  flipDirection?: FlipDirection;
}

export interface CreateOllieVariationInput extends BaseTrickInput {
  category: 'OLLIE_VARIATION';
  stance?: Stance;
  height?: number;
}

export interface CreateManualTrickInput extends BaseTrickInput {
  category: 'MANUAL';
  manualType?: ManualType;
  distance?: number;
}

export interface CreateGrindSlideTrickInput extends BaseTrickInput {
  category: 'GRIND_SLIDE';
  grindType?: GrindType;
  obstacleType?: string;
}

export interface CreateGrabTrickInput extends BaseTrickInput {
  category: 'GRAB';
  grabType?: GrabType;
  airTime?: number;
}

export type CreateTrickInput =
  | CreateFlipTrickInput
  | CreateOllieVariationInput
  | CreateManualTrickInput
  | CreateGrindSlideTrickInput
  | CreateGrabTrickInput;

export interface UpdateTrickInput {
  id: string;
  name?: string;
  videoUrl?: string;
  difficulty?: TrickDifficulty;
  rotationDegrees?: number;
  flipDirection?: FlipDirection;
  stance?: Stance;
  height?: number;
  manualType?: ManualType;
  distance?: number;
  grindType?: GrindType;
  obstacleType?: string;
  grabType?: GrabType;
  airTime?: number;
}

export interface ListTricksInput {
  category?: TrickCategory;
  difficulty?: TrickDifficulty;
  offset?: number;
  limit?: number;
}

export interface TrickOutput {
  id: string;
  name: string;
  difficulty: TrickDifficulty;
  category: TrickCategory;
  createdAt: string;
  videoUrl?: string;
  rotationDegrees?: number;
  flipDirection?: FlipDirection;
  stance?: Stance;
  height?: number;
  manualType?: ManualType;
  distance?: number;
  grindType?: GrindType;
  obstacleType?: string;
  grabType?: string;
  airTime?: number;
}

export interface ListTricksOutput {
  tricks: TrickOutput[];
  total: number;
  limit: number;
  offset: number;
}

export interface TrickStatsOutput {
  trickId: string;
  trickName: string;
  totalAttempts: number;
  successfulAttempts: number;
  successRate: number;
  averageScore: number;
  lastExecutedAt: string | null;
  period: string;
}

export interface OverallStatsOutput {
  totalTricks: number;
  totalExecutions: number;
  overallSuccessRate: number;
  tricksByCategory: Record<TrickCategory, number>;
  tricksByDifficulty: Record<string, number>;
  period: string;
}

export interface ExecuteTrickInput {
  trickId: string;
  skaterId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface ExecuteTrickOutput {
  success: boolean;
  trickId: string;
  trickName: string;
  message: string;
  timestamp: string;
  metadata: Record<string, unknown>;
  executionId: string;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}