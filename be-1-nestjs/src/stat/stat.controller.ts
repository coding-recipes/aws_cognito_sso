import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@/auth';
import { StatService } from './stat.service';
import { Stat } from './stat.entity';


export class StatRecords {
  data: Stat[]
}


@Controller('stats')
@UseGuards(AuthGuard)
export class StatController {
  constructor(private readonly statService: StatService) { }

  @Get("/")
  @ApiCreatedResponse({ type: StatRecords })
  async getStats(): Promise<StatRecords> {
    return {
      data: await this.statService.findAll()
    }
  }
}
