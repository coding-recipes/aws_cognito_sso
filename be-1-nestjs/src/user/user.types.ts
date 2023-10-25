import { UserIdentity } from "@/auth";
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  identity: UserIdentity;
  @ApiProperty()
  data: any;
}