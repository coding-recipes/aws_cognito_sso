import { redirectToSsLogout, redirectToSsoAuth } from "./util.sso";
import { Tokens, clearTokens, getTokens, patchTokens } from "./auth.store";

export const authSignOut = () => {
  clearTokens();
  redirectToSsLogout("/")
}

export const authSignIn = () => {
  redirectToSsoAuth("/")
}

export const authGetTokens = (): Tokens => {
  return getTokens();
}

export const authPatchTokens = (newTokens: Partial<Tokens>) => {
  return patchTokens(newTokens);
}