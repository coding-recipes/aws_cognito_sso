import { Controller, Get } from '@nestjs/common';

@Controller('stats')
export class StatController {

  @Get()
  getStats() {
    return { message: 'This action returns all stats' };
  }
}
