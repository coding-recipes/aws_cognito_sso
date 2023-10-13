import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { getCBPage } from "./auth.utils";
import { reqGetTokens } from "./auth.reqs";
import { setTokens } from "./auth.store";

export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'
let requestSent: boolean = false // to prevent React DevTools from calling this twice

export const SignInHandler = ({ onLoading, onFailed }: { onLoading: React.ReactNode, onFailed: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<AuthStatus>('init')

  const doThings = async () => {
    if (requestSent) return
    requestSent = true
    const authCode = searchParams.get("code")
    if (authCode) {
      setStatus('authCode')
      const { accessToken, refreshToken, idToken } = await reqGetTokens(authCode);
      setTokens({ accessToken, refreshToken, idToken })
      setStatus('success')
    } else {
      console.log("no auth code")
      setStatus('error')
    }
  }

  useEffect(() => {
    doThings()
  }, [])

  if (status === 'error') {
    return <>{onFailed}</>
  } else if (status === 'success') {
    return <Navigate to={getCBPage()} />
  } else {
    return <>{onLoading}</>
  }
}