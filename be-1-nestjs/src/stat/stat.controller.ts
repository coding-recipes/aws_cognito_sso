import { Controller, Get } from '@nestjs/common';

@Controller('stats')
export class StatController {

  @Get()
  getStats() {
    return {

    };
  }
}
