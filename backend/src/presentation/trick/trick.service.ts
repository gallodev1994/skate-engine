// Trick Service
// Application service that orchestrates use cases

import { Injectable } from '@nestjs/common';
import {
  ExecuteTrickUseCase,
  FlipTricksUseCases,
  OllieVariationsUseCases,
  ManualTricksUseCases,
  GrindSlideTricksUseCases,
  GrabTricksUseCases,
  TrickManagementUseCases,
} from '../../application/usecases';
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
} from '../../application/dtos/trick.dtos';

@Injectable()
export class TrickService {
  constructor(
    private readonly executeTrickUseCase: ExecuteTrickUseCase,
    private readonly flipTricksUseCases: FlipTricksUseCases,
    private readonly ollieVariationsUseCases: OllieVariationsUseCases,
    private readonly manualTricksUseCases: ManualTricksUseCases,
    private readonly grindSlideTricksUseCases: GrindSlideTricksUseCases,
    private readonly grabTricksUseCases: GrabTricksUseCases,
    private readonly trickManagementUseCases: TrickManagementUseCases,
  ) {}

  // Trick Management
  async createTrick(input: CreateTrickInput): Promise<TrickOutput> {
    return this.trickManagementUseCases.createTrick(input);
  }

  async getTrickById(id: string): Promise<TrickOutput | null> {
    return this.trickManagementUseCases.getTrickById(id);
  }

  async updateTrick(input: UpdateTrickInput): Promise<TrickOutput> {
    return this.trickManagementUseCases.updateTrick(input);
  }

  async deleteTrick(id: string): Promise<void> {
    return this.trickManagementUseCases.deleteTrick(id);
  }

  async listTricks(input: ListTricksInput): Promise<ListTricksOutput> {
    return this.trickManagementUseCases.listTricks(input);
  }

  // Generic execution
  async executeTrick(input: ExecuteTrickInput): Promise<ExecuteTrickOutput> {
    return this.executeTrickUseCase.execute(input);
  }

  // Flip Tricks
  async kickflip(input: KickflipInput): Promise<KickflipOutput> {
    return this.flipTricksUseCases.kickflip(input);
  }

  async heelflip(input: HeelflipInput): Promise<HeelflipOutput> {
    return this.flipTricksUseCases.heelflip(input);
  }

  async varialKickflip(input: VarialKickflipInput): Promise<VarialKickflipOutput> {
    return this.flipTricksUseCases.varialKickflip(input);
  }

  async varialHeelflip(input: VarialHeelflipInput): Promise<VarialHeelflipOutput> {
    return this.flipTricksUseCases.varialHeelflip(input);
  }

  async treFlip(input: TreFlipInput): Promise<TreFlipOutput> {
    return this.flipTricksUseCases.treFlip(input);
  }

  async laserFlip(input: LaserFlipInput): Promise<LaserFlipOutput> {
    return this.flipTricksUseCases.laserFlip(input);
  }

  async hardflip(input: HardflipInput): Promise<HardflipOutput> {
    return this.flipTricksUseCases.hardflip(input);
  }

  async inwardHeelflip(input: InwardHeelflipInput): Promise<InwardHeelflipOutput> {
    return this.flipTricksUseCases.inwardHeelflip(input);
  }

  async hellflip(input: HellflipInput): Promise<HellflipOutput> {
    return this.flipTricksUseCases.hellflip(input);
  }

  // Ollie Variations
  async ollie(input: OllieInput): Promise<OllieOutput> {
    return this.ollieVariationsUseCases.ollie(input);
  }

  async nollie(input: NollieInput): Promise<NollieOutput> {
    return this.ollieVariationsUseCases.nollie(input);
  }

  async fakieOllie(input: FakieOllieInput): Promise<FakieOllieOutput> {
    return this.ollieVariationsUseCases.fakieOllie(input);
  }

  async switchOllie(input: SwitchOllieInput): Promise<SwitchOllieOutput> {
    return this.ollieVariationsUseCases.switchOllie(input);
  }

  async popShoveIt(input: PopShoveItInput): Promise<PopShoveItOutput> {
    return this.ollieVariationsUseCases.popShoveIt(input);
  }

  // Manual Tricks
  async manual(input: ManualInput): Promise<ManualOutput> {
    return this.manualTricksUseCases.manual(input);
  }

  async noseManual(input: NoseManualInput): Promise<NoseManualOutput> {
    return this.manualTricksUseCases.noseManual(input);
  }

  // Grind/Slide Tricks
  async grind(input: GrindInput): Promise<GrindOutput> {
    return this.grindSlideTricksUseCases.grind(input);
  }

  async slide(input: SlideInput): Promise<SlideOutput> {
    return this.grindSlideTricksUseCases.slide(input);
  }

  // Grab Tricks
  async grab(input: GrabInput): Promise<GrabOutput> {
    return this.grabTricksUseCases.grab(input);
  }

  // Statistics
  async getTrickStats(input: GetTrickStatsInput): Promise<TrickStatsOutput> {
    return this.trickManagementUseCases.getTrickStats(input);
  }

  async getOverallStats(input: GetOverallStatsInput): Promise<OverallStatsOutput> {
    return this.trickManagementUseCases.getOverallStats(input);
  }
}