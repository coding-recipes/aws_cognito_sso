import { LocalStore } from "../store";
import { config } from "../config";

export const setCBPage = (callbackPage: string) => {
  const { store_callbackPage } = config();
  if (!callbackPage || ['/signin', '/signout'].includes(callbackPage)) {
    callbackPage = "/"
  }
  LocalStore.set(store_callbackPage, callbackPage);
}

export const getCBPage = () => {
  const { store_callbackPage } = config();
  return LocalStore.get(store_callbackPage) || "";
}
