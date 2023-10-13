import { Request, Response } from 'express';

export const getRequestTokens = (request: Request): { accessToken: string, refreshToken: string } => {
  const accessToken0 = request.headers.authorization?.split(' ')[1];
  const accessToken1 = request.headers['x-access-token'] as string;
  const refreshToken1 = request.headers['x-refresh-token'] as string;
  const accessToken = accessToken0 || accessToken1
  const refreshToken = refreshToken1
  return { accessToken, refreshToken }
}

export interface SetResponseTokensProps {
  accessToken?: string;
  refreshToken?: string;
}

export const setResponseTokens = (
  response: Response,
  { accessToken, refreshToken }: SetResponseTokensProps
) => {
  accessToken && response.setHeader('x-access-token', accessToken);
  refreshToken && response.setHeader('x-refresh-token', refreshToken);
}