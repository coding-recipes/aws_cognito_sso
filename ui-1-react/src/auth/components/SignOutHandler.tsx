import { useEffect } from "react";
import { redirectToSSOsignIn } from "../util.sso";

export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'

export const SignOutHandler = () => {
  useEffect(() => {
    redirectToSSOsignIn("/");
  }, [])

  return <></>
}