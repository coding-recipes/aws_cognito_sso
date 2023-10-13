import { verifyAccessToken, VerifyAccessTokenResult } from './util.verify-token';
import { refreshAccessToken, RefreshAccessTokenResult } from './util.refresh-token'
import { UserIdentity } from './auth.types';
import { Request } from 'express';

export interface ValidateAccessTokenResult {
  readonly isValid: boolean;
  readonly error?: any;
  readonly identity?: UserIdentity
  readonly newAccessToken?: string
}

const createIdentity = (claim: VerifyAccessTokenResult): UserIdentity => {
  return {
    sub: claim.sub,
    userName: claim.userName,
    clientId: claim.clientId
  }
}

export const validateAccessToken = async (request: Request): Promise<ValidateAccessTokenResult> => {
  try {

    const accessToken0 = request.headers.authorization?.split(' ')[1];
    const accessToken1 = request.headers['x-access-token'][0]
    const refreshToken1 = request.headers['x-refresh-token'][0]

    const accessToken = accessToken0 || accessToken1
    const refreshToken = refreshToken1

    if (!accessToken) {
      throw new Error('No access token')
    }

    const verifRes: VerifyAccessTokenResult = await verifyAccessToken(accessToken)
    if (verifRes.isValid) {
      return { isValid: true, identity: createIdentity(verifRes) }
    }

    if (refreshToken) {
      const refreshRes: RefreshAccessTokenResult = await refreshAccessToken(refreshToken1)
      const newAccessToken = refreshRes.access_token;
      const verifResNew: VerifyAccessTokenResult = await verifyAccessToken(newAccessToken)

      if (newAccessToken) {
        console.log('...new access token', newAccessToken.substring(0, 8))
        return { isValid: true, identity: createIdentity(verifResNew), newAccessToken }
      } else {
        throw new Error('No new access token')
      }
    } else {
      throw new Error('No refresh token')
    }

  } catch (error) {
    console.log("ERROR validateAccessToken ---> ", error.message)
    return { isValid: false, error: error.message }
  }
}
