// Application DTOs - Data Transfer Objects
// Used for communication between layers

// Input DTOs (Commands)
export interface ExecuteTrickInput {
  trickId: string;
  skaterId?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateTrickInput {
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  category: 'FLIP' | 'OLLIE_VARIATION' | 'MANUAL' | 'GRIND_SLIDE' | 'GRAB';
  // Flip specific
  rotationDegrees?: number;
  flipDirection?: 'frontside' | 'backside' | 'none';
  // Ollie specific
  stance?: 'regular' | 'goofy' | 'switch' | 'fakie' | 'nollie';
  height?: number;
  // Manual specific
  manualType?: 'manual' | 'noseManual';
  distance?: number;
  // Grind/Slide specific
  grindType?: 'grind' | 'slide';
  obstacleType?: string;
  // Grab specific
  grabType?: string;
  airTime?: number;
}

export interface UpdateTrickInput {
  id: string;
  name?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  rotationDegrees?: number;
  flipDirection?: 'frontside' | 'backside' | 'none';
  stance?: 'regular' | 'goofy' | 'switch' | 'fakie' | 'nollie';
  height?: number;
  manualType?: 'manual' | 'noseManual';
  distance?: number;
  grindType?: 'grind' | 'slide';
  obstacleType?: string;
  grabType?: string;
  airTime?: number;
}

export interface ListTricksInput {
  category?: 'FLIP' | 'OLLIE_VARIATION' | 'MANUAL' | 'GRIND_SLIDE' | 'GRAB';
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  limit?: number;
  offset?: number;
}

export interface GetTrickStatsInput {
  trickId: string;
  period?: 'day' | 'week' | 'month' | 'year' | 'all';
}

export interface GetOverallStatsInput {
  skaterId?: string;
  period?: 'day' | 'week' | 'month' | 'year' | 'all';
}

// Output DTOs (Queries)
export interface TrickOutput {
  id: string;
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  category: 'FLIP' | 'OLLIE_VARIATION' | 'MANUAL' | 'GRIND_SLIDE' | 'GRAB';
  rotationDegrees?: number;
  flipDirection?: 'frontside' | 'backside' | 'none';
  stance?: 'regular' | 'goofy' | 'switch' | 'fakie' | 'nollie';
  height?: number;
  manualType?: 'manual' | 'noseManual';
  distance?: number;
  grindType?: 'grind' | 'slide';
  obstacleType?: string;
  grabType?: string;
  airTime?: number;
  createdAt: Date;
}

export interface ExecuteTrickOutput {
  success: boolean;
  trickId: string;
  trickName: string;
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
  executionId: string;
}

export interface TrickStatsOutput {
  trickId: string;
  trickName: string;
  totalAttempts: number;
  successfulAttempts: number;
  successRate: number;
  averageScore?: number;
  lastExecutedAt?: Date;
  period: string;
}

export interface OverallStatsOutput {
  totalTricks: number;
  totalExecutions: number;
  overallSuccessRate: number;
  tricksByCategory: Record<string, number>;
  tricksByDifficulty: Record<string, number>;
  period: string;
}

export interface ListTricksOutput {
  tricks: TrickOutput[];
  total: number;
  limit: number;
  offset: number;
}

// Specific Input DTOs for each trick type (for use cases)
export interface KickflipInput extends ExecuteTrickInput {}
export interface HeelflipInput extends ExecuteTrickInput {}
export interface VarialKickflipInput extends ExecuteTrickInput {}
export interface VarialHeelflipInput extends ExecuteTrickInput {}
export interface TreFlipInput extends ExecuteTrickInput {}
export interface LaserFlipInput extends ExecuteTrickInput {}
export interface HardflipInput extends ExecuteTrickInput {}
export interface InwardHeelflipInput extends ExecuteTrickInput {}
export interface HellflipInput extends ExecuteTrickInput {}

export interface OllieInput extends ExecuteTrickInput {}
export interface NollieInput extends ExecuteTrickInput {}
export interface FakieOllieInput extends ExecuteTrickInput {}
export interface SwitchOllieInput extends ExecuteTrickInput {}
export interface PopShoveItInput extends ExecuteTrickInput {}

export interface ManualInput extends ExecuteTrickInput {}
export interface NoseManualInput extends ExecuteTrickInput {}

export interface GrindInput extends ExecuteTrickInput {}
export interface SlideInput extends ExecuteTrickInput {}

export interface GrabInput extends ExecuteTrickInput {}

// Specific Output DTOs
export interface KickflipOutput extends ExecuteTrickOutput {}
export interface HeelflipOutput extends ExecuteTrickOutput {}
export interface VarialKickflipOutput extends ExecuteTrickOutput {}
export interface VarialHeelflipOutput extends ExecuteTrickOutput {}
export interface TreFlipOutput extends ExecuteTrickOutput {}
export interface LaserFlipOutput extends ExecuteTrickOutput {}
export interface HardflipOutput extends ExecuteTrickOutput {}
export interface InwardHeelflipOutput extends ExecuteTrickOutput {}
export interface HellflipOutput extends ExecuteTrickOutput {}

export interface OllieOutput extends ExecuteTrickOutput {}
export interface NollieOutput extends ExecuteTrickOutput {}
export interface FakieOllieOutput extends ExecuteTrickOutput {}
export interface SwitchOllieOutput extends ExecuteTrickOutput {}
export interface PopShoveItOutput extends ExecuteTrickOutput {}

export interface ManualOutput extends ExecuteTrickOutput {}
export interface NoseManualOutput extends ExecuteTrickOutput {}

export interface GrindOutput extends ExecuteTrickOutput {}
export interface SlideOutput extends ExecuteTrickOutput {}

export interface GrabOutput extends ExecuteTrickOutput {}