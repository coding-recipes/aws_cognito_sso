import { getTokens, updateTokens } from "../auth";
import { Headers } from "./types";

export const addRequestTokens = (headers: Headers): Headers => {
  const tokens = getTokens()
  if (tokens) {
    const { accessToken, refreshToken } = tokens
    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken,
      "x-access-token": accessToken,
    }
  }
  return headers
}

export const extractResponseTokens = (headers: Headers): void => {
  const newAccessToken = headers['x-access-token']
  const newRefreshToken = headers['x-refresh-token']
  updateTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken })
}