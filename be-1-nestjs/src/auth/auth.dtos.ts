import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExchangeCodeDto {

  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @ApiProperty()
  redirect_uri: string;
}