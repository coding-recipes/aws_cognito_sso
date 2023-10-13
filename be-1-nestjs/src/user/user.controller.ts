import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard, UserRequest } from '@/auth';
import { UserResponse } from './user.types';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {

  @Get("/")
  async getUser(@Request() req: UserRequest): Promise<UserResponse> {
    const identity: UserResponse["identity"] = req.identity;
    const data: UserResponse["data"] = {}
    return { identity, data };
  }
}
