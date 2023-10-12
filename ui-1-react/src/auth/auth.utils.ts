import { LocalStore } from "../store";
import { CONFIG } from "../config";

const {
  VITE_COGNITO_REGION,
  VITE_COGNITO_DOMAIN_NAME,
  VITE_COGNITO_CLIENT_ID,
  VITE_COGNITO_AUTH_RESPONSE_TYPE,
  VITE_SSO_SIGNIN_REDIRECT_ROUTE,
  // VITE_SSO_SIGNOUT_REDIRECT_ROUTE,
  VITE_SSO_AUTH_URL_TEMPLATE,
  VITE_API_URL,
  VITE_API_ROUTE_CODE_EXCHANGE,
} = import.meta.env;

export const getRedirectUrl = () => {
  return window.location.origin + "/" + VITE_SSO_SIGNIN_REDIRECT_ROUTE;
}

export const getSSOauthUrl = () => {
  const redirectUri = getRedirectUrl();
  const redirectUriEncoded = encodeURIComponent(redirectUri);
  const authUrl = VITE_SSO_AUTH_URL_TEMPLATE
    .replace('{domain}', VITE_COGNITO_DOMAIN_NAME)
    .replace('{region}', VITE_COGNITO_REGION)
    .replace('{response_type}', VITE_COGNITO_AUTH_RESPONSE_TYPE)
    .replace('{client_id}', VITE_COGNITO_CLIENT_ID)
    .replace('{redirect_uri}', redirectUriEncoded)
    .replace('{scope}', 'openid+profile+email')
    .replace('127\.0\.0\.1', 'localhost')
  console.log({ redirectUri, authUrl })
  return authUrl;
}


export const getApiCodeExchangeUrl = () => {
  const url = VITE_API_URL + "/" + VITE_API_ROUTE_CODE_EXCHANGE;
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