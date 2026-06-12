// App Controller
// Root endpoint for API info

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get API information' })
  @ApiResponse({ status: 200, description: 'API info' })
  getRoot() {
    return {
      name: 'Skate Trick Engine API',
      version: '1.0.0',
      description: 'API for managing and executing skate tricks',
      docs: '/api/docs',
      endpoints: {
        tricks: '/api/tricks',
        health: '/api/health',
      },
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'OK' })
  healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}