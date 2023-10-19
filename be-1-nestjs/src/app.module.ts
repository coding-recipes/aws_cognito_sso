import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from './config'

import { AppService } from './app.service';
import { DatabaseConnectionService } from './db';

import { AuthModule } from './auth';
import { StatModule } from './stat';
import { UserModule } from './user';
import { InfoModule } from './info';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConnectionService
    }),
    AuthModule,
    StatModule,
    UserModule,
    InfoModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly appService: AppService) { }
  async onModuleInit() {
    this.appService.initMockData()
  }
}
