import React, { useEffect } from "react";
import { FullLoader } from "../../components/atoms";
import { redirectToSSOsignIn } from "../util.sso";

export const RedirectAuthDeferred = ({ callbackPage = "", timeoutSec = 1 }: { callbackPage?: string, timeoutSec?: number }) => {
  const [redirect, setRedirect] = React.useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setRedirect(true)
    }, timeoutSec * 1000)
    return () => clearTimeout(t);
  }, [])

  if (redirect) {
    return <RedirectAuth callbackPage={callbackPage} />;
  } else {
    return <FullLoader text="signing in..." />
  }
}

export const RedirectAuth = ({ callbackPage = "" }: { callbackPage?: string }) => {
  useEffect(() => {
    redirectToSSOsignIn(callbackPage)
  }, [])
  return <></>
}