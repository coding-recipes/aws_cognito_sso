import { config } from "../config";

export const signInRedirectUrl = () => window.location.origin + "/" + config().sso_signin_redirect_route;
export const signOutRedirectUrl = () => window.location.origin + "/" + config().sso_signout_redirect_route;

export const signInUrlTemplate = () => config().sso_signin_url_template
export const signOutUrlTemplate = () => config().sso_sigout_url_template

export const getSSOauthUrl = (urlTemplate: string, redirectUri: string) => {
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

export const getApiCodeExchangeUrl = () => {
  const { api_url, api_route_get_token } = config();
  const url = api_url + api_route_get_token;
  return url
}
