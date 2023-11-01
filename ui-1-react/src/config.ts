import { DefaultOptions } from "react-query";

const {
  VITE_COGNITO_REGION,
  VITE_COGNITO_CLIENT_DOMAIN,
  VITE_COGNITO_CLIENT_HOST,
  VITE_COGNITO_CLIENT_ID,
  VITE_API_URL,
} = import.meta.env;

export const reactQueryConfig: DefaultOptions = {
  queries: {
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 10,
  },
}


export const config = () => ({
  cognito_region: VITE_COGNITO_REGION,
  cognito_domain_name: VITE_COGNITO_CLIENT_DOMAIN,
  cognito_client_id: VITE_COGNITO_CLIENT_ID,
  cognito_auth_response_type: "code",
  sso_signin_redirect_route: "/signin",
  sso_signout_redirect_route: "/signout",
  sso_signin_url_template: VITE_COGNITO_CLIENT_HOST + "/oauth2/authorize?client_id={client_id}&response_type={response_type}&redirect_uri={redirect_uri}",
  sso_sigout_url_template: VITE_COGNITO_CLIENT_HOST + "/logout?client_id={client_id}&logout_uri={redirect_uri}",

  api_url: VITE_API_URL,
  api_route_get_token: "/auth/get-tokens",

  store_callbackPage: "authCallbackPage",

  ui_info: {
    framework: "React",
    repo: "https://github.com/coding-recipes/aws_cognito_sso/tree/main/ui-1-react"
  }
})

export type Config = ReturnType<typeof config>;
