import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ExchangeCodeDto } from './auth.dtos';
import { Tokens } from './auth.entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('exchange-code')
  @ApiCreatedResponse({ type: Tokens })
  async exchangeCode(@Body() exchangeCodeDto: ExchangeCodeDto): Promise<Tokens> {
    return this.authService.exchangeCode(exchangeCodeDto);
  }
}
