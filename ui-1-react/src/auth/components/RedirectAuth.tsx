import React, { useEffect } from "react";
import { FullLoader } from "../../components/atoms";
import { redirectToSSOsignIn } from "../util.sso";

export const RedirectAuthDeferred = ({ callbackPage = "", timeoutSec = 1 }: { callbackPage?: string, timeoutSec?: number }) => {
  return <WaitForAuth {...{ timeoutSec, loaderText: "signing in..." }} >
    <RedirectAuth callbackPage={callbackPage} />
  </WaitForAuth>
}

export const RedirectAuth = ({ callbackPage = "" }: { callbackPage?: string }) => {
  useEffect(() => {
    redirectToSSOsignIn(callbackPage)
  }, [])
  return <></>
}

export const WaitForAuth = ({ timeoutSec = 1, children, loaderText }: { timeoutSec?: number, children: React.ReactNode, loaderText: string }) => {
  const [toWait, setWait] = React.useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setWait(false)
    }, timeoutSec * 1000)
    return () => clearTimeout(t);
  }, [])

  if (toWait) {
    return <FullLoader text={loaderText} />
  } else {
    return children
  }
}
