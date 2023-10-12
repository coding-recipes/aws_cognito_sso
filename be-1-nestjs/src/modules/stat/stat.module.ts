import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stat } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Stat])],
  controllers: [StatController],
  providers: [StatService]
})
export class StatModule { }
