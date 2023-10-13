import { getSSOauthUrl, signInUrlTemplate, signInRedirectUrl, signOutRedirectUrl, signOutUrlTemplate } from "./util.urls";
import { setCBPage } from "./util.app";

export const redirectToSsoAuth = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl(signInUrlTemplate(), signInRedirectUrl());
  window.location.href = authUrl
}

export const redirectToSsLogout = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl(signOutUrlTemplate(), signOutRedirectUrl());
  window.location.href = authUrl
}