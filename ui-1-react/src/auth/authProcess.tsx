import { getSSOauthUrl } from "./urls";
import { LocalStore, setStoreState } from "../store";
import { CONFIG } from "../config";
import { Navigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";


type AuthStatus = 'init' | 'authCode' | 'success' | 'error'

const setCBPage = (callbackPage: string) => {
  LocalStore.set(CONFIG.store_callbackPage, callbackPage);
}

const getCBPage = () => {
  return LocalStore.get(CONFIG.store_callbackPage) || "";
}

export const redirectToSSO = (callbackPage: string = "") => {
  setCBPage(callbackPage)
  const authUrl = getSSOauthUrl();
  window.location.href = authUrl
}

export const AfterAuthPage = ({ onLoading, onFailed }: { onLoading: React.ReactNode, onFailed: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<AuthStatus>('init')

  const doThings = () => {
    const authCode = searchParams.get("code")
    if (authCode) {
      setStoreState({ authCode })
      setStatus('authCode')
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