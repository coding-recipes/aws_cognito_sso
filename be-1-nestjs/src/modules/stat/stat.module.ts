import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from '../../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stats])],
  controllers: [StatController],
  providers: [StatService]
})
export class StatModule { }
