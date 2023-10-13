import { Request } from 'express';

export interface UserIdentity {
  sub: string;
  userName: string;
  clientId: string;
}

export interface UserRequest extends Request {
  identity?: UserIdentity
}
