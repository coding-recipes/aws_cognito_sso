import { Injectable } from '@nestjs/common';
import { Tokens } from './auth.entities';
import { GetTokensDto } from './auth.dtos';
import { reqGetTokens } from './auth.reqs';

@Injectable()
export class AuthService {

  async getTokens(getTokensDto: GetTokensDto): Promise<Tokens> {
    const data = await reqGetTokens(getTokensDto)
    const tokens: Tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      idToken: data.id_token,
    };
    return tokens;
  }


}
