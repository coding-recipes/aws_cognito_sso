import { setStoreState, getStoreState, createSelector } from "../store"

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export const setTokens = (tokens?: Tokens) => {
  setStoreState({ tokens })
}

export const clearTokens = () => {
  setTokens()
}

export const updateTokens = (newTokens: Partial<Tokens>) => {
  const oldTokens = getStoreState().tokens
  const tokens: Tokens = {
    accessToken: newTokens.accessToken || oldTokens?.accessToken || "",
    refreshToken: newTokens.refreshToken || oldTokens?.refreshToken || "",
    idToken: newTokens.idToken || oldTokens?.idToken || "",
  }
  setTokens(tokens)
}

export const getTokens = () => {
  return getStoreState().tokens
}

export const tokensSelector = createSelector<Tokens>((state) => state.tokens)