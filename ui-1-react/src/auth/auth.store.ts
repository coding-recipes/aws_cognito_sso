import { setStoreState, getStoreState, createSelector } from "../store"

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export const setTokens = (tokens?: Tokens) => {
  setStoreState({ tokens })
}
export const setToken = (newTokens: Tokens) => {
  const defaultTokens = { access_token: "", refresh_token: "", id_token: "" }
  const oldTokens = getStoreState().tokens
  const tokens = { ...defaultTokens, ...oldTokens, ...newTokens }
  setStoreState({ tokens })
}

export const tokensSelector = createSelector<Tokens>((state) => state.tokens)