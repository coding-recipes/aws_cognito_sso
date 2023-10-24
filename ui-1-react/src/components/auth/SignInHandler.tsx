import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../modules/auth/auth.context";


export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'
let requestSent: boolean = false // to prevent React DevTools from calling this twice


export const SignInHandler = ({ onLoading, onFailed }: { onLoading: React.ReactNode, onFailed: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<AuthStatus>('init')
  const { requestTokens, getAppCallbackPage } = useAuth()

  const handleSignIn = async () => {
    if (requestSent) return
    requestSent = true
    const authCode = searchParams.get("code")
    if (authCode) {
      setStatus('authCode')
      requestTokens(authCode);
      setStatus('success')
    } else {
      console.log("no auth code")
      setStatus('error')
    }
  }

  useEffect(() => {
    handleSignIn()
  }, [])

  if (status === 'error') {
    return <>{onFailed}</>
  } else if (status === 'success') {
    return <Navigate to={getAppCallbackPage()} />
  } else {
    return <>{onLoading}</>
  }
}