import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTokensDto {
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @ApiProperty()
  redirectUri: string;
}