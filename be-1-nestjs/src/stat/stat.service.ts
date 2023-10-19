import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stat } from './stat.entity';
import { generateMockStats } from './stat.mock-data';

@Injectable()
export class StatService {

  constructor(
    @InjectRepository(Stat)
    private statRepository: Repository<Stat>,
  ) { }

  async findAll(): Promise<Stat[]> {
    return this.statRepository.find();
  }

  initMockData(): void {
    const stats: Stat[] = generateMockStats()
    stats.forEach(stat => {
      this.statRepository.save(stat)
    });
  }

}
