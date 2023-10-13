import { useEffect } from "react";
import { redirectToSsoAuth } from "../util.sso";

export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'

export const SignOutHandler = () => {
  useEffect(() => {
    redirectToSsoAuth("/");
  }, [])

  return <></>
}