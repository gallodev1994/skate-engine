// Application Service Interfaces (Ports)
// Define application business rules - orchestrate domain entities

import {
  ExecuteTrickInput,
  ExecuteTrickOutput,
  CreateTrickInput,
  UpdateTrickInput,
  ListTricksInput,
  ListTricksOutput,
  GetTrickStatsInput,
  TrickStatsOutput,
  GetOverallStatsInput,
  OverallStatsOutput,
  TrickOutput,
  // Specific inputs/outputs
  KickflipInput, KickflipOutput,
  HeelflipInput, HeelflipOutput,
  VarialKickflipInput, VarialKickflipOutput,
  VarialHeelflipInput, VarialHeelflipOutput,
  TreFlipInput, TreFlipOutput,
  LaserFlipInput, LaserFlipOutput,
  HardflipInput, HardflipOutput,
  InwardHeelflipInput, InwardHeelflipOutput,
  HellflipInput, HellflipOutput,
  OllieInput, OllieOutput,
  NollieInput, NollieOutput,
  FakieOllieInput, FakieOllieOutput,
  SwitchOllieInput, SwitchOllieOutput,
  PopShoveItInput, PopShoveItOutput,
  ManualInput, ManualOutput,
  NoseManualInput, NoseManualOutput,
  GrindInput, GrindOutput,
  SlideInput, SlideOutput,
  GrabInput, GrabOutput,
} from '../dtos/trick.dtos';

// Main Trick Service Port
export interface ITrickService {
  // Trick Management
  createTrick(input: CreateTrickInput): Promise<TrickOutput>;
  getTrickById(id: string): Promise<TrickOutput | null>;
  updateTrick(input: UpdateTrickInput): Promise<TrickOutput>;
  deleteTrick(id: string): Promise<void>;
  listTricks(input: ListTricksInput): Promise<ListTricksOutput>;

  // Execution
  executeTrick(input: ExecuteTrickInput): Promise<ExecuteTrickOutput>;

  // Statistics
  getTrickStats(input: GetTrickStatsInput): Promise<TrickStatsOutput>;
  getOverallStats(input: GetOverallStatsInput): Promise<OverallStatsOutput>;
}

// Specialized Service Ports (ISP)
export interface IFlipTrickService {
  kickflip(input: KickflipInput): Promise<KickflipOutput>;
  heelflip(input: HeelflipInput): Promise<HeelflipOutput>;
  varialKickflip(input: VarialKickflipInput): Promise<VarialKickflipOutput>;
  varialHeelflip(input: VarialHeelflipInput): Promise<VarialHeelflipOutput>;
  treFlip(input: TreFlipInput): Promise<TreFlipOutput>;
  laserFlip(input: LaserFlipInput): Promise<LaserFlipOutput>;
  hardflip(input: HardflipInput): Promise<HardflipOutput>;
  inwardHeelflip(input: InwardHeelflipInput): Promise<InwardHeelflipOutput>;
  hellflip(input: HellflipInput): Promise<HellflipOutput>;
}

export interface IOllieVariationService {
  ollie(input: OllieInput): Promise<OllieOutput>;
  nollie(input: NollieInput): Promise<NollieOutput>;
  fakieOllie(input: FakieOllieInput): Promise<FakieOllieOutput>;
  switchOllie(input: SwitchOllieInput): Promise<SwitchOllieOutput>;
  popShoveIt(input: PopShoveItInput): Promise<PopShoveItOutput>;
}

export interface IManualTrickService {
  manual(input: ManualInput): Promise<ManualOutput>;
  noseManual(input: NoseManualInput): Promise<NoseManualOutput>;
}

export interface IGrindSlideService {
  grind(input: GrindInput): Promise<GrindOutput>;
  slide(input: SlideInput): Promise<SlideOutput>;
}

export interface IGrabTrickService {
  grab(input: GrabInput): Promise<GrabOutput>;
}

// Aggregated Engine Service Port
export interface ITrickEngineService
  extends IFlipTrickService,
    IOllieVariationService,
    IManualTrickService,
    IGrindSlideService,
    IGrabTrickService,
    ITrickService {}