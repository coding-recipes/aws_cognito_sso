import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from './config'

import { AppService } from './app.service';
import { DatabaseConnectionService } from './setupTypeorm';

import { AuthModule } from './auth';
import { StatModule } from './stat';

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
