import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stat } from './stat.entity';

@Injectable()
export class StatService {

  constructor(
    @InjectRepository(Stat)
    private statRepository: Repository<Stat>,
  ) { }

  async findAll(): Promise<Stat[]> {
    return this.statRepository.find();
  }

}
