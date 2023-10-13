import axios from "axios";
import { getApiCodeExchangeUrl, signInRedirectUrl } from "./util.urls";
import { redirectToSsLogout, redirectToSsoAuth } from "./util.sso";
import { Tokens } from "./auth.store";

const _getTokensReqInputs = async (code: string) => {
  const url = getApiCodeExchangeUrl()
  const redirectUri = signInRedirectUrl()
  const params = { code, redirectUri }
  const headers = {}
  return { url, params, headers }
}

export const reqGetTokens = async (code: string): Promise<Tokens> => {
  const { url, params, headers } = await _getTokensReqInputs(code)
  const response = await axios.get<Tokens>(url, { headers, params })
  return response.data
}

export const reqGetTokensPost = async (code: string): Promise<Tokens> => {
  const { url, params, headers } = await _getTokensReqInputs(code)
  const response = await axios.post<Tokens>(url, params, { headers })
  return response.data
}

export const signOut = () => {
  redirectToSsLogout("/")
}

export const signIn = () => {
  redirectToSsoAuth("/")
}