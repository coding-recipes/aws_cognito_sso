import { authGetTokens, authSetTokens } from "../auth";
import { Headers } from "./types";

export const addRequestTokens = (headers: Headers): Headers => {
  const { accessToken, refreshToken } = authGetTokens()
  if (accessToken || refreshToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken,
      // "x-access-token": accessToken,
    }
  }
  return headers
}

export const extractResponseTokens = (headers: Headers): void => {
  const accessToken = headers['x-access-token']
  const refreshToken = headers['x-refresh-token']
  if (accessToken || refreshToken)
    authSetTokens({ accessToken, refreshToken })
}