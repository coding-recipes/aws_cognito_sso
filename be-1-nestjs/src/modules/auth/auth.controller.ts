import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetTokensDto } from './auth.dtos';
import { Tokens } from './auth.entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('get-tokens')
  @ApiCreatedResponse({ type: Tokens })
  async getTokensGet(@Query() getTokensDto: GetTokensDto): Promise<Tokens> {
    return this.authService.getTokens(getTokensDto);
  }

  @Post('get-tokens')
  @ApiCreatedResponse({ type: Tokens })
  async getTokensPost(@Body() getTokensDto: GetTokensDto): Promise<Tokens> {
    return this.authService.getTokens(getTokensDto);
  }

}
