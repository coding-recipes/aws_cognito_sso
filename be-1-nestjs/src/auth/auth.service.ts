import { Injectable } from '@nestjs/common';
import { Tokens, GetTokensDto } from './auth.dtos';
import { getTokens, GetTokensResponse } from './util.get-tokens';

@Injectable()
export class AuthService {
  async getTokens(getTokensDto: GetTokensDto): Promise<Tokens> {
    const data: GetTokensResponse = await getTokens(getTokensDto)
    const tokens: Tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      idToken: data.id_token,
    };
    return tokens;
  }


}
