import { redirectToSsLogout, redirectToSsoAuth } from "./util.sso";

export const signOut = () => {
  redirectToSsLogout("/")
}

export const signIn = () => {
  redirectToSsoAuth("/")
}