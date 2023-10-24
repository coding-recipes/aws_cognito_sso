import { useEffect } from "react";
import { useAuth } from "../../modules/auth/auth.context";

export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'

export const SignOutHandler = () => {
  const { signIn } = useAuth()
  useEffect(() => {
    signIn();
  }, [])

  return <></>
}