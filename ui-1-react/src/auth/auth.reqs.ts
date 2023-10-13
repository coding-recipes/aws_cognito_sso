import { redirectToSsLogout, redirectToSsoAuth } from "./util.sso";
import { clearTokens } from "./auth.store";

export const signOut = () => {
  clearTokens();
  redirectToSsLogout("/")
}

export const signIn = () => {
  redirectToSsoAuth("/")
}