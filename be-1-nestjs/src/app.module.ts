import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    StatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
