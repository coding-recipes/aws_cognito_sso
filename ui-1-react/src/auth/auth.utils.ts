import { LocalStore } from "../store";
import { config } from "../config";

const CONFIG = config();

export const signInRedirectUrl = () => window.location.origin + "/" + CONFIG.sso_signin_redirect_route;
const signOutRedirectUrl = () => window.location.origin + "/" + CONFIG.sso_signout_redirect_route;

const signInUrlTemplate = () => CONFIG.sso_signin_url_template
const ignOutUrlTemplate = () => CONFIG.sso_sigout_url_template

const getSSOauthUrl = (urlTemplate: string, redirectUri: string) => {
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

export const getApiCodeExchangeUrl = () => {
  const url = CONFIG.api_url + CONFIG.api_route_get_token;
  return url
}

export const setCBPage = (callbackPage: string) => {
  if (!callbackPage || ['/signin', '/signout'].includes(callbackPage)) {
    callbackPage = "/"
  }
  LocalStore.set(CONFIG.store_callbackPage, callbackPage);
}

export const getCBPage = () => {
  return LocalStore.get(CONFIG.store_callbackPage) || "";
}

export const redirectToSsoAuth = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl(signInUrlTemplate(), signInRedirectUrl());
  window.location.href = authUrl
}

export const redirectToSsLogout = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl(ignOutUrlTemplate(), signOutRedirectUrl());
  window.location.href = authUrl
}