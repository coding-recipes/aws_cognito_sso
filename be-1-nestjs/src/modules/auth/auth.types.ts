export interface AuthorizationCodeResponse {
  access_token: string,
  id_token: string,
  refresh_token: string,
  token_type: string, // Bearer Basic
  expires_in: number
}