import { Navigate } from "react-router-dom";
import { useAuth } from "../../modules/auth";
import { useEffect } from "react";

export const RedirectCB = () => {
  const { getAuthCallbackPage } = useAuth()
  return <>
    <Navigate to={getAuthCallbackPage()} />
  </>
}

export const RedirectSsoSignIn = () => {
  const { signIn } = useAuth()
  useEffect(() => {
    signIn();
  }, [])
  return <></>
}