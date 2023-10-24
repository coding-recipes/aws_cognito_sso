import { useMemo } from "react";
import { create } from "zustand";
import { getRequestUnAuth } from "../api";
import { redirectToSSOsignOut, redirectToSSOsignIn, getTokensReqInputs } from "./auth.sso";
import { lsClearTokens, lsReadTokens, lsWriteTokens, getCBPage } from "./auth.local";

export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
}
interface AuthStoreState {
  tokens: Tokens;
}

const useAuthStore = create<AuthStoreState>(() => ({
  tokens: {},
}))

export const setTokens = (tokens: Tokens) => {
  lsWriteTokens(tokens)
  useAuthStore.setState({ tokens })
}

export const getTokens = () => {
  return useAuthStore.getState().tokens
}

const clearTokens = () => {
  lsClearTokens();
  setTokens({})
}

const requestTokens = async (authCode: string) => {
  const { accessToken, refreshToken, idToken } = await getRequestUnAuth<Tokens>(getTokensReqInputs(authCode));
  setTokens({ accessToken, refreshToken, idToken })
}

const initTokens: VoidFunction = () => {
  const _tokens = lsReadTokens()
  if (_tokens) setTokens(_tokens)
}

export const signOut = () => {
  clearTokens();
  redirectToSSOsignOut("/")
}

export const signIn = (callbackPage?: string) => {
  redirectToSSOsignIn(callbackPage)
}

const getAppCallbackPage = () => {
  return getCBPage()
}

export const useAuth = () => {
  const tokens = useAuthStore(state => state.tokens)

  const isLoggedIn = useMemo(() => {
    return !!tokens?.accessToken;
  }, [tokens]);

  return { isLoggedIn, tokens, getTokens, setTokens, signIn, signOut, initTokens, clearTokens, requestTokens, getAppCallbackPage } as const;
}

