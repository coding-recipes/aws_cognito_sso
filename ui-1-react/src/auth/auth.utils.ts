import { LocalStore } from "../store";
import { config } from "../config";

const CONFIG = config();

export const getRedirectUrl = () => {
  return window.location.origin + "/" + CONFIG.sso_signin_redirect_route;
}

export const getSSOauthUrl = () => {
  const redirectUri = getRedirectUrl();
  const redirectUriEncoded = encodeURIComponent(redirectUri);
  const authUrl = CONFIG.sso_auth_url_template
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
  LocalStore.set(CONFIG.store_callbackPage, callbackPage);
}

export const getCBPage = () => {
  return LocalStore.get(CONFIG.store_callbackPage) || "";
}

export const redirectToSSO = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl();
  window.location.href = authUrl
}