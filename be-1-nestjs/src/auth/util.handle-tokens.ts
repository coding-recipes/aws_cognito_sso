import { verifyAccessToken, VerifyAccessTokenResult } from './util.verify-token';
import { refreshAccessToken, RefreshAccessTokenResult } from './util.refresh-token'
import { UserIdentity } from './auth.types';
import { createIdentity } from './util.identity';

export interface HandleTokensResult {
  readonly isValid: boolean;
  readonly error?: any;
  readonly identity?: UserIdentity
  readonly accessToken?: string
}

interface HandleTokensProps {
  accessToken: string;
  refreshToken: string;
}

export const handleTokens = async ({ accessToken, refreshToken }: HandleTokensProps): Promise<HandleTokensResult> => {
  try {
    if (!accessToken) {
      throw new Error('No access token')
    }

    const verifRes: VerifyAccessTokenResult = await verifyAccessToken(accessToken)
    if (verifRes.isValid) {
      return { isValid: true, identity: createIdentity(verifRes) }
    }

    if (refreshToken) {
      const refreshRes: RefreshAccessTokenResult = await refreshAccessToken(refreshToken)
      const newAccessToken = refreshRes.access_token;
      const verifResNew: VerifyAccessTokenResult = await verifyAccessToken(newAccessToken)

      if (newAccessToken) {
        console.log('...new access token', newAccessToken.substring(0, 8))
        return { isValid: true, identity: createIdentity(verifResNew), accessToken: newAccessToken }
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
