import axios from 'axios';
import { GetTokensDto } from './auth.dtos';
import { AuthorizationCodeResponse } from './auth.types'

export async function reqGetTokens({ code, redirectUri }: GetTokensDto): Promise<AuthorizationCodeResponse> {
  console.log({ code, redirectUri });

  const url = process.env.COGNITO_ENDPOINT + process.env.COGNITO_TOKEN_ROUTE
  const client_id = process.env.COGNITO_CLIENT_ID
  const client_secret = process.env.COGNITO_CLIENT_SECRET
  const grant_type = 'authorization_code'
  const redirect_uri = redirectUri
  const body = { grant_type, client_id, code, redirect_uri }
  const Authorization = 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Authorization
  }

  const response = await axios.post<AuthorizationCodeResponse>(url, body, { headers })
  return response.data
}


