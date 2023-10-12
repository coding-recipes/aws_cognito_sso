const {
  VITE_COGNITO_REGION,
  VITE_COGNITO_DOMAIN_NAME,
  VITE_COGNITO_CLIENT_ID,
  VITE_COGNITO_AUTH_RESPONSE_TYPE,
  VITE_SSO_SIGNIN_REDIRECT_ROUTE,
  // VITE_SSO_SIGNOUT_REDIRECT_ROUTE,
  VITE_SSO_AUTH_URL_TEMPLATE
} = import.meta.env;

export const getSSOauthUrl = (redirectRoute: string = VITE_SSO_SIGNIN_REDIRECT_ROUTE) => {
  const _redirectUri = window.location.origin + "/" + redirectRoute;
  const redirectUri = encodeURIComponent(_redirectUri);
  const authUrl = VITE_SSO_AUTH_URL_TEMPLATE
    .replace('{domain}', VITE_COGNITO_DOMAIN_NAME)
    .replace('{region}', VITE_COGNITO_REGION)
    .replace('{response_type}', VITE_COGNITO_AUTH_RESPONSE_TYPE)
    .replace('{client_id}', VITE_COGNITO_CLIENT_ID)
    .replace('{redirect_uri}', redirectUri)
    .replace('{scope}', 'openid+profile+email')
    .replace('127\.0\.0\.1', 'localhost')
  console.log({ _redirectUri, redirectUri, authUrl })
  return authUrl;
}

