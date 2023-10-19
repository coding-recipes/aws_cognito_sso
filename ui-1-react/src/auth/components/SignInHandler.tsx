import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Tokens, setTokens } from "../store";
import { getCBPage, signInRedirectUrl } from "../util.app";
import { getRequestUnAuth } from "../../api-base";
import { config } from "../../config";

export type AuthStatus = 'init' | 'authCode' | 'success' | 'error'
let requestSent: boolean = false // to prevent React DevTools from calling this twice

const getTokensReqInputs = (code: string) => {
  const { api_route_get_token } = config();
  const route = api_route_get_token
  const redirectUri = signInRedirectUrl()
  const params = { code, redirectUri }
  const headers = {}
  return { route, params, headers }
}

export const SignInHandler = ({ onLoading, onFailed }: { onLoading: React.ReactNode, onFailed: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<AuthStatus>('init')

  const doThings = async () => {
    if (requestSent) return
    requestSent = true
    const authCode = searchParams.get("code")
    if (authCode) {
      setStatus('authCode')
      const { accessToken, refreshToken, idToken } = await getRequestUnAuth<Tokens>(getTokensReqInputs(authCode));
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