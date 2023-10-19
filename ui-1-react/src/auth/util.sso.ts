import { setCBPage, signInRedirectUrl, signOutRedirectUrl, } from "./util.app";
import { config } from "../config";

const signInUrlTemplate = () => config().sso_signin_url_template
const signOutUrlTemplate = () => config().sso_sigout_url_template

const getSSOauthUrl = (urlTemplate: string, redirectUri: string) => {
  const CONFIG = config();
  const redirectUriEncoded = encodeURIComponent(redirectUri);
  const authUrl = urlTemplate
    .replace('{domain}', CONFIG.cognito_domain_name)
    .replace('{region}', CONFIG.cognito_region)
    .replace('{response_type}', CONFIG.cognito_auth_response_type)
    .replace('{client_id}', CONFIG.cognito_client_id)
    .replace('{redirect_uri}', redirectUriEncoded)
    .replace('{scope}', 'openid+profile+email')
    .replace('127\.0\.0\.1', 'localhost')
  return authUrl;
}

export const redirectToSSOsignIn = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl(signInUrlTemplate(), signInRedirectUrl());
  window.location.href = authUrl
}

export const redirectToSSOsignOut = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl(signOutUrlTemplate(), signOutRedirectUrl());
  window.location.href = authUrl
}