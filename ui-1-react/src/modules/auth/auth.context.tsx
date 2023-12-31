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

export const authPutTokens = (tokens: Tokens) => {
  lsWriteTokens(tokens)
  useAuthStore.setState({ tokens })
}

export const authPatchTokens = (tokens: Partial<Tokens>) => {
  let newTokens = { ...useAuthStore.getState().tokens }
  Object.keys(tokens).forEach(key => {
    if (tokens[key as keyof Tokens]) {
      newTokens[key as keyof Tokens] = tokens[key as keyof Tokens]
    }
  })
  authPutTokens(newTokens)
}

export const authGetTokens = () => {
  return useAuthStore.getState().tokens
}

export const authSignOut = (callbackPage?: string) => {
  lsClearTokens();
  authPutTokens({})
  redirectToSSOsignOut(callbackPage)
}

export const authSignIn = (callbackPage?: string) => {
  redirectToSSOsignIn(callbackPage)
}

const authRequestTokens = async (authCode: string) => {
  const { accessToken, refreshToken, idToken } = await getRequestUnAuth<Tokens>(getTokensReqInputs(authCode));
  authPutTokens({ accessToken, refreshToken, idToken })
}

const authInitTokens: VoidFunction = () => {
  const _tokens = lsReadTokens()
  if (_tokens) authPutTokens(_tokens)
}



const authCallbackPage = () => {
  return getCBPage()
}

export const useAuth = () => {
  const tokens = useAuthStore(state => state.tokens)

  const isLoggedIn = useMemo(() => {
    return !!tokens?.accessToken;
  }, [tokens]);

  const getTokens = authGetTokens;
  const putTokens = authPutTokens;
  const patchTokens = authPatchTokens;
  const signIn = authSignIn;
  const signOut = authSignOut;
  const initTokens = authInitTokens;
  const requestTokens = authRequestTokens;
  const getAuthCallbackPage = authCallbackPage;

  return { isLoggedIn, tokens, getTokens, putTokens, patchTokens, signIn, signOut, initTokens, requestTokens, getAuthCallbackPage } as const;
}

