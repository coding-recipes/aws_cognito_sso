import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { config } from './config'

import { DatabaseConnectionService } from './setupTypeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatModule } from './stat/stat.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
