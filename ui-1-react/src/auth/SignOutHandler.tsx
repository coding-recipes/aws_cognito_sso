import { useEffect } from "react";
import { redirectToSsoAuth } from "./auth.utils";

export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'

export const SignOutHandler = () => {
  useEffect(() => {
    redirectToSsoAuth("/");
  }, [])

  return <></>
}