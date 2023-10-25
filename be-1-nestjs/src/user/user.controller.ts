import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard, UserRequest } from '@/auth';
import { UserResponse } from './user.types';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {

  @Get("/")
  @ApiCreatedResponse({ type: UserResponse })
  async getUser(@Request() req: UserRequest): Promise<UserResponse> {
    const identity: UserResponse["identity"] = req.identity;
    const data: UserResponse["data"] = {}
    return { identity, data };
  }
}
