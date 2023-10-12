import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { StatService } from './stat.service';
import { Stat } from '@/entities';

@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) { }

  @Get("/")
  @ApiCreatedResponse({ type: Stat, isArray: true })
  async getStats(): Promise<Stat[]> {
    return this.statService.findAll();
  }
}
