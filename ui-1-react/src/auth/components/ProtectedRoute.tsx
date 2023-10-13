import React from "react";
import { RedirectAuthDeferred } from "./RedirectAuth";
import { tokensSelector } from "..";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const tokens = tokensSelector();
  const callbackPage = window.location.pathname;
  const timeoutSec = 1;

  if (tokens?.accessToken) {
    return <>{children}</>
  } else {
    return <RedirectAuthDeferred {...{ callbackPage, timeoutSec }} />;
  }
}