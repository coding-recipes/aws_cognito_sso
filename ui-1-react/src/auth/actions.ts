import { redirectToSSOsignOut, redirectToSSOsignIn } from "./util.sso";
import { Tokens, clearTokens, getTokens, patchTokens } from "./store";

export const authSignOut = () => {
  clearTokens();
  redirectToSSOsignOut("/")
}

export const authSignIn = () => {
  redirectToSSOsignIn("/")
}

export const authGetTokens = (): Tokens => {
  return getTokens();
}

export const authSetTokens = (newTokens: Partial<Tokens>) => {
  return patchTokens(newTokens);
}