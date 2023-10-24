import { LocalStore } from "../../utils";
import { config } from "../../config";
import { Tokens } from "./auth.context";

export const setCBPage = (callbackPage: string) => {
  const { store_callbackPage, sso_signin_redirect_route, sso_signout_redirect_route } = config();
  if (!callbackPage || [sso_signin_redirect_route, sso_signout_redirect_route].includes(callbackPage)) {
    callbackPage = "/"
  }
  LocalStore.set(store_callbackPage, callbackPage);
}

export const getCBPage = () => {
  const { store_callbackPage } = config();
  return LocalStore.get(store_callbackPage) || "";
}

export const lsWriteTokens = (tokens: Tokens) => {
  LocalStore.set('authTokens', JSON.stringify(tokens))
}

export const lsReadTokens = (): Tokens => {
  const tokens = LocalStore.get('authTokens')
  try {
    return JSON.parse(tokens || '{}') as Tokens
  } catch {
    return {}
  }
}

export const lsClearTokens = () => {
  LocalStore.remove('authTokens')
}