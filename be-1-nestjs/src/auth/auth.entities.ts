import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({ example: 'access-token' })
  access_token: string;

  @ApiProperty({ example: 'refresh-token' })
  refresh_token: string;

  @ApiProperty({ nullable: true, type: 'string', example: 'id-token' })
  id_token: string | undefined;
}
