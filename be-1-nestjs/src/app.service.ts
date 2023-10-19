import { Injectable } from '@nestjs/common';
import { StatService } from './stat';

@Injectable()
export class AppService {
  constructor(private readonly statService: StatService) { }

  initMockData(): void {
    this.statService.initMockData()
  }
}
