import { useEffect } from "react";
import { initTokens } from "..";

export const AuthGlobalListener = () => {
  useEffect(() => {
    initTokens();
  }, []);

  return <></>;
}