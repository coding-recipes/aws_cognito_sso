
const {
  VITE_COGNITO_REGION,
  VITE_COGNITO_DOMAIN_NAME,
  VITE_COGNITO_CLIENT_ID,
  VITE_SSO_SIGNIN_REDIRECT_ROUTE,
  // VITE_SSO_SIGNOUT_REDIRECT_ROUTE,
  VITE_API_URL,
} = import.meta.env;

export const config = () => ({
  cognito_region: VITE_COGNITO_REGION,
  cognito_domain_name: VITE_COGNITO_DOMAIN_NAME,
  cognito_client_id: VITE_COGNITO_CLIENT_ID,
  cognito_auth_response_type: "code",
  sso_signin_redirect_route: VITE_SSO_SIGNIN_REDIRECT_ROUTE,
  // sso_signout_redirect_route: VITE_SSO_SIGNOUT_REDIRECT_ROUTE,
  sso_auth_url_template: "https://{domain}.auth.{region}.amazoncognito.com/oauth2/authorize?client_id={client_id}&response_type={response_type}&redirect_uri={redirect_uri}",

  api_url: VITE_API_URL,
  api_route_get_token: "/auth/get-tokens",

  store_callbackPage: "authCallbackPage",
})