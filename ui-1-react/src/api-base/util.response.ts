import { AxiosResponse } from "axios";
import { signOut } from "../auth";
import { extractResponseTokens } from "./util.tokens";
import { Headers } from "./types";

export const handleResponse = <T>(response: AxiosResponse) => {
  const { status, statusText, data, headers } = response

  if (status > 299) {
    console.log(status, statusText)
  }

  if (status === 401) {
    signOut();
    throw new Error("Unauthorized")
  }

  extractResponseTokens(headers as Headers)
  return data as T
}
