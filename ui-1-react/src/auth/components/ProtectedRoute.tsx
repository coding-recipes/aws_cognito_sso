import React from "react";
import { useAuth } from "../useAuth";
import { SignInPage } from "./SignInPage";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn] = useAuth();

  if (isLoggedIn) {
    return <>{children}</>
  } else {
    return <SignInPage />;
  }
}