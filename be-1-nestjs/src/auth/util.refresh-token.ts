// https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html

import axios from 'axios';
import { config } from '@/config'

export interface RefreshAccessTokenResult {
  access_token: string,
  id_token: string,
  token_type: string, // Bearer Basic
  expires_in: number
}

export interface RefreshTokenProps {
  refreshToken: string
}

export const refreshAccessToken = async (refresh_token: string): Promise<RefreshAccessTokenResult> => {
  const { clientId, clientSecret, clientDomain, clientRegion } = config().cognito

  const url = `https://${clientDomain}.auth.${clientRegion}.amazoncognito.com/oauth2/token`
  const client_id = clientId
  const grant_type = 'refresh_token'
  const params = { grant_type, client_id, refresh_token }
  const Authorization = 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Authorization
  }

  console.log('...COGNITO --> refreshAccessToken')
  const response = await axios.request<RefreshAccessTokenResult>({ url, params, headers, method: 'POST' })
  return response.data
}

