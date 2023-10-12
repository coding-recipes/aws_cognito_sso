import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({ example: 'access-token' })
  accessToken: string;

  @ApiProperty({ example: 'refresh-token' })
  refreshToken: string;

  @ApiProperty({ nullable: true, type: 'string', example: 'id-token' })
  idToken: string | undefined;
}
