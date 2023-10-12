import { Injectable } from '@nestjs/common';
import { Tokens } from './auth.entities';
import axios from 'axios';
import { ExchangeCodeDto } from './auth.dtos';
import { AuthorizationCodeResponse } from './auth.types'

@Injectable()
export class AuthService {

  async exchangeCode({ code, redirect_uri }: ExchangeCodeDto): Promise<Tokens> {
    console.log({ code, redirect_uri });

    const url = process.env.COGNITO_ENDPOINT + process.env.COGNITO_TOKEN_ROUTE
    const client_id = process.env.COGNITO_CLIENT_ID
    const client_secret = process.env.COGNITO_CLIENT_SECRET
    const Authorization = 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    const grant_type = 'authorization_code'
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': Authorization
    }
    const body = { grant_type, client_id, code, redirect_uri }

    try {
      const response = await axios.post<AuthorizationCodeResponse>(url, body, { headers })
      const { data, status, statusText } = response
      // console.log({ data, status, statusText })

      const tokens: Tokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        id_token: data.id_token,
      };
      return tokens;
    } catch (error: unknown) {
      // console.log(error)
      throw error
    }
  }


}
