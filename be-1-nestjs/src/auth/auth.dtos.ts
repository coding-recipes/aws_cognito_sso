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

export class Tokens {
  @ApiProperty({ example: 'access-token' })
  accessToken: string;

  @ApiProperty({ example: 'refresh-token' })
  refreshToken: string;

  @ApiProperty({ nullable: true, type: 'string', example: 'id-token' })
  idToken: string | undefined;
}

export interface AuthorizationCodeResponse {
  access_token: string,
  id_token: string,
  refresh_token: string,
  token_type: string, // Bearer Basic
  expires_in: number
}