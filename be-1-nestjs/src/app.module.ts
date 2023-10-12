import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from './config'

import { DatabaseConnectionService } from './setupTypeorm';
import { AppService } from './app.service';

import { AuthModule, StatModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConnectionService
    }),
    AuthModule,
    StatModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
