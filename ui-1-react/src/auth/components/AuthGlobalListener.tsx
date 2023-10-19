import { useEffect } from "react";
import { initTokens } from "../store";

export const AuthGlobalListener = () => {
  useEffect(() => {
    initTokens();
  }, []);

  return <></>;
}