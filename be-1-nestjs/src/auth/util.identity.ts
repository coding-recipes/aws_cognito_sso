import { UserIdentity, UserRequest } from './auth.types';

export const createIdentity = (claim: UserIdentity & { [key: string]: any }): UserIdentity => {
  return {
    sub: claim.sub,
    userName: claim.userName,
    clientId: claim.clientId
  }
}

export const setIdentity = (request: UserRequest, identity: UserIdentity) => {
  request.identity = identity;
}