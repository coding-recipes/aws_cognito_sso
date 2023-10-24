import React, { useEffect } from "react";
import { useAuth } from "../../modules/auth/auth.context";
import { ProtectedPage } from "./ProtectedPage";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, initTokens } = useAuth();

  useEffect(() => {
    initTokens()
  }, []);

  if (isLoggedIn) {
    return <>{children}</>
  } else {
    return <ProtectedPage />;
  }
}