import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatService } from './stat.service';
import { Stat } from './stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stat])],
  controllers: [StatController],
  providers: [StatService],
  exports: [StatService]
})
export class StatModule { }
