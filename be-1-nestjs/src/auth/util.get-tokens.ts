import axios from 'axios';
import { GetTokensDto } from './auth.dtos';
import { config } from '@/config'

export interface GetTokensResponse {
  access_token: string,
  id_token: string,
  refresh_token: string,
  token_type: string, // Bearer Basic
  expires_in: number
}

export const getTokens = async ({ code, redirectUri }: GetTokensDto): Promise<GetTokensResponse> => {
  const { clientId, clientSecret, clientDomain, clientRegion } = config().cognito
  const url = `https://${clientDomain}.auth.${clientRegion}.amazoncognito.com/oauth2/token`
  const client_id = clientId
  const grant_type = 'authorization_code'
  const redirect_uri = redirectUri
  const params = { grant_type, client_id, code, redirect_uri }
  const Authorization = 'Basic ' + Buffer.from(client_id + ':' + clientSecret).toString('base64')

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Authorization
  }

  const response = await axios.request<GetTokensResponse>({ url, params, headers, method: 'POST' })
  return response.data
}
