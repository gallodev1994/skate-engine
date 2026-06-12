// Trick Controller
// Presentation layer - HTTP endpoints

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TrickService } from './trick.service';
import {
  CreateTrickInput,
  UpdateTrickInput,
  ListTricksInput,
  GetTrickStatsInput,
  GetOverallStatsInput,
  ExecuteTrickInput,
  // Specific inputs
  KickflipInput,
  HeelflipInput,
  VarialKickflipInput,
  VarialHeelflipInput,
  TreFlipInput,
  LaserFlipInput,
  HardflipInput,
  InwardHeelflipInput,
  HellflipInput,
  OllieInput,
  NollieInput,
  FakieOllieInput,
  SwitchOllieInput,
  PopShoveItInput,
  ManualInput,
  NoseManualInput,
  GrindInput,
  SlideInput,
  GrabInput,
} from '../../application/dtos/trick.dtos';
import {
  TrickOutput,
  ListTricksOutput,
  TrickStatsOutput,
  OverallStatsOutput,
  ExecuteTrickOutput,
  // Specific outputs
  KickflipOutput,
  HeelflipOutput,
  VarialKickflipOutput,
  VarialHeelflipOutput,
  TreFlipOutput,
  LaserFlipOutput,
  HardflipOutput,
  InwardHeelflipOutput,
  HellflipOutput,
  OllieOutput,
  NollieOutput,
  FakieOllieOutput,
  SwitchOllieOutput,
  PopShoveItOutput,
  ManualOutput,
  NoseManualOutput,
  GrindOutput,
  SlideOutput,
  GrabOutput,
} from '../../application/dtos/trick.dtos';

@ApiTags('tricks')
@Controller('tricks')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class TrickController {
  constructor(private readonly trickService: TrickService) {}

  // Trick Management
  @Post()
  @ApiOperation({ summary: 'Create a new trick' })
  @ApiResponse({ status: 201, type: TrickOutput })
  async createTrick(@Body() input: CreateTrickInput): Promise<TrickOutput> {
    return this.trickService.createTrick(input);
  }

  @Get()
  @ApiOperation({ summary: 'List all tricks with filters' })
  @ApiResponse({ status: 200, type: ListTricksOutput })
  async listTricks(@Query() input: ListTricksInput): Promise<ListTricksOutput> {
    return this.trickService.listTricks(input);
  }

  @Get('stats/overall')
  @ApiOperation({ summary: 'Get overall statistics' })
  @ApiResponse({ status: 200, type: OverallStatsOutput })
  async getOverallStats(@Query() input: GetOverallStatsInput): Promise<OverallStatsOutput> {
    return this.trickService.getOverallStats(input);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trick by ID' })
  @ApiResponse({ status: 200, type: TrickOutput })
  @ApiResponse({ status: 404, description: 'Trick not found' })
  async getTrickById(@Param('id') id: string): Promise<TrickOutput | null> {
    return this.trickService.getTrickById(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get trick statistics' })
  @ApiResponse({ status: 200, type: TrickStatsOutput })
  async getTrickStats(@Param('id') id: string, @Query() input: GetTrickStatsInput): Promise<TrickStatsOutput> {
    return this.trickService.getTrickStats({ ...input, trickId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a trick' })
  @ApiResponse({ status: 200, type: TrickOutput })
  @ApiResponse({ status: 404, description: 'Trick not found' })
  async updateTrick(@Param('id') id: string, @Body() input: UpdateTrickInput): Promise<TrickOutput> {
    return this.trickService.updateTrick({ ...input, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a trick' })
  @ApiResponse({ status: 204, description: 'Trick deleted' })
  @ApiResponse({ status: 404, description: 'Trick not found' })
  async deleteTrick(@Param('id') id: string): Promise<void> {
    return this.trickService.deleteTrick(id);
  }

  // Generic execution
  @Post('execute')
  @ApiOperation({ summary: 'Execute any trick by ID' })
  @ApiResponse({ status: 200, type: ExecuteTrickOutput })
  async executeTrick(@Body() input: ExecuteTrickInput): Promise<ExecuteTrickOutput> {
    return this.trickService.executeTrick(input);
  }

  // Flip Tricks
  @Post('flip/kickflip')
  @ApiOperation({ summary: 'Execute Kickflip' })
  @ApiResponse({ status: 200, type: KickflipOutput })
  async kickflip(@Body() input: KickflipInput): Promise<KickflipOutput> {
    return this.trickService.kickflip(input);
  }

  @Post('flip/heelflip')
  @ApiOperation({ summary: 'Execute Heelflip' })
  @ApiResponse({ status: 200, type: HeelflipOutput })
  async heelflip(@Body() input: HeelflipInput): Promise<HeelflipOutput> {
    return this.trickService.heelflip(input);
  }

  @Post('flip/varial-kickflip')
  @ApiOperation({ summary: 'Execute Varial Kickflip' })
  @ApiResponse({ status: 200, type: VarialKickflipOutput })
  async varialKickflip(@Body() input: VarialKickflipInput): Promise<VarialKickflipOutput> {
    return this.trickService.varialKickflip(input);
  }

  @Post('flip/varial-heelflip')
  @ApiOperation({ summary: 'Execute Varial Heelflip' })
  @ApiResponse({ status: 200, type: VarialHeelflipOutput })
  async varialHeelflip(@Body() input: VarialHeelflipInput): Promise<VarialHeelflipOutput> {
    return this.trickService.varialHeelflip(input);
  }

  @Post('flip/tre-flip')
  @ApiOperation({ summary: 'Execute Tre Flip (360 Flip)' })
  @ApiResponse({ status: 200, type: TreFlipOutput })
  async treFlip(@Body() input: TreFlipInput): Promise<TreFlipOutput> {
    return this.trickService.treFlip(input);
  }

  @Post('flip/laser-flip')
  @ApiOperation({ summary: 'Execute Laser Flip' })
  @ApiResponse({ status: 200, type: LaserFlipOutput })
  async laserFlip(@Body() input: LaserFlipInput): Promise<LaserFlipOutput> {
    return this.trickService.laserFlip(input);
  }

  @Post('flip/hardflip')
  @ApiOperation({ summary: 'Execute Hardflip' })
  @ApiResponse({ status: 200, type: HardflipOutput })
  async hardflip(@Body() input: HardflipInput): Promise<HardflipOutput> {
    return this.trickService.hardflip(input);
  }

  @Post('flip/inward-heelflip')
  @ApiOperation({ summary: 'Execute Inward Heelflip' })
  @ApiResponse({ status: 200, type: InwardHeelflipOutput })
  async inwardHeelflip(@Body() input: InwardHeelflipInput): Promise<InwardHeelflipOutput> {
    return this.trickService.inwardHeelflip(input);
  }

  @Post('flip/hellflip')
  @ApiOperation({ summary: 'Execute Hellflip' })
  @ApiResponse({ status: 200, type: HellflipOutput })
  async hellflip(@Body() input: HellflipInput): Promise<HellflipOutput> {
    return this.trickService.hellflip(input);
  }

  // Ollie Variations
  @Post('ollie/ollie')
  @ApiOperation({ summary: 'Execute Ollie' })
  @ApiResponse({ status: 200, type: OllieOutput })
  async ollie(@Body() input: OllieInput): Promise<OllieOutput> {
    return this.trickService.ollie(input);
  }

  @Post('ollie/nollie')
  @ApiOperation({ summary: 'Execute Nollie' })
  @ApiResponse({ status: 200, type: NollieOutput })
  async nollie(@Body() input: NollieInput): Promise<NollieOutput> {
    return this.trickService.nollie(input);
  }

  @Post('ollie/fakie')
  @ApiOperation({ summary: 'Execute Fakie Ollie' })
  @ApiResponse({ status: 200, type: FakieOllieOutput })
  async fakieOllie(@Body() input: FakieOllieInput): Promise<FakieOllieOutput> {
    return this.trickService.fakieOllie(input);
  }

  @Post('ollie/switch')
  @ApiOperation({ summary: 'Execute Switch Ollie' })
  @ApiResponse({ status: 200, type: SwitchOllieOutput })
  async switchOllie(@Body() input: SwitchOllieInput): Promise<SwitchOllieOutput> {
    return this.trickService.switchOllie(input);
  }

  @Post('ollie/pop-shove-it')
  @ApiOperation({ summary: 'Execute Pop Shove-it' })
  @ApiResponse({ status: 200, type: PopShoveItOutput })
  async popShoveIt(@Body() input: PopShoveItInput): Promise<PopShoveItOutput> {
    return this.trickService.popShoveIt(input);
  }

  // Manual Tricks
  @Post('manual/manual')
  @ApiOperation({ summary: 'Execute Manual' })
  @ApiResponse({ status: 200, type: ManualOutput })
  async manual(@Body() input: ManualInput): Promise<ManualOutput> {
    return this.trickService.manual(input);
  }

  @Post('manual/nose-manual')
  @ApiOperation({ summary: 'Execute Nose Manual' })
  @ApiResponse({ status: 200, type: NoseManualOutput })
  async noseManual(@Body() input: NoseManualInput): Promise<NoseManualOutput> {
    return this.trickService.noseManual(input);
  }

  // Grind/Slide Tricks
  @Post('grind-slide/grind')
  @ApiOperation({ summary: 'Execute Grind' })
  @ApiResponse({ status: 200, type: GrindOutput })
  async grind(@Body() input: GrindInput): Promise<GrindOutput> {
    return this.trickService.grind(input);
  }

  @Post('grind-slide/slide')
  @ApiOperation({ summary: 'Execute Slide' })
  @ApiResponse({ status: 200, type: SlideOutput })
  async slide(@Body() input: SlideInput): Promise<SlideOutput> {
    return this.trickService.slide(input);
  }

  // Grab Tricks
  @Post('grab/grab')
  @ApiOperation({ summary: 'Execute Grab' })
  @ApiResponse({ status: 200, type: GrabOutput })
  async grab(@Body() input: GrabInput): Promise<GrabOutput> {
    return this.trickService.grab(input);
  }
}