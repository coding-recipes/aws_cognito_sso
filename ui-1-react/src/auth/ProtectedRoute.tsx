import React from "react";
import { userSelector } from "../store";
import { RedirectAuthDeferred } from "./RedirectAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = userSelector();
  const callbackPage = window.location.pathname;
  const timeoutSec = 1;

  if (!user) {
    return <RedirectAuthDeferred {...{ callbackPage, timeoutSec }} />;
  } else {
    return <>{children}</>
  }
}