import React, { useEffect } from "react";
import { useAuth } from "../../modules/auth";
import { Wait } from "../atoms";
import { ProtectedPage } from "./ProtectedPage";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, initTokens } = useAuth();

  useEffect(() => {
    initTokens()
  }, []);

  if (isLoggedIn) {
    return <>{children}</>
  } else {
    return <Wait sec={1}>
      <ProtectedPage />;
    </Wait>
  }
}