import { LocalStore } from "../store";
import { config } from "../config";

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

export const signInRedirectUrl = () => window.location.origin + config().sso_signin_redirect_route;
export const signOutRedirectUrl = () => window.location.origin + config().sso_signout_redirect_route;