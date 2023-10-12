import React from "react";
import { RedirectAuthDeferred } from "./RedirectAuth";
import { tokensSelector } from ".";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, refreshToken } = tokensSelector();
  const callbackPage = window.location.pathname;
  const timeoutSec = 1;

  if (accessToken || refreshToken) {
    return <>{children}</>
  } else {
    return <RedirectAuthDeferred {...{ callbackPage, timeoutSec }} />;
  }
}