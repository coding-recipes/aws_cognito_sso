import { useEffect, useMemo } from "react";
import { redirectToSSOsignOut, redirectToSSOsignIn } from "./util.sso";
import { initTokens, setTokens, clearTokens, tokensSelector } from './store';


export const useAuth = () => {
  const tokens = tokensSelector();

  const isLoggedIn = useMemo(() => {
    return !!tokens?.accessToken;
  }, [tokens]);

  const signOut = () => {
    clearTokens();
    redirectToSSOsignOut("/")
  }

  const signIn = () => {
    redirectToSSOsignIn("/")
  }

  useEffect(() => {
    initTokens();
  }, []);


  return [isLoggedIn, signIn, signOut, initTokens, setTokens, clearTokens] as const;
}

