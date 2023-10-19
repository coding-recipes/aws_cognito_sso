import { useEffect } from "react";
import { initTokens } from "../auth.store";

export const AuthGlobalListener = () => {
  useEffect(() => {
    initTokens();
  }, []);

  return <></>;
}