import React, { useEffect } from "react";
import { useAuth } from "../../modules/auth/auth.context";
import { SignInPage } from "./SignInPage";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, initTokens } = useAuth();

  useEffect(() => {
    initTokens()
  }, []);

  if (isLoggedIn) {
    return <>{children}</>
  } else {
    return <SignInPage />;
  }
}