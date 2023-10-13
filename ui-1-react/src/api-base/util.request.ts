import { AxiosResponse } from "axios";
import { config } from "../config";
import { addRequestTokens } from "./util.tokens";
import axios from "axios";
import { GeneralRequestProps } from "./types";

export const getUrl = (route: string) => {
  return config().api_url + route;
}

export const handleRequest = async <T>({ method, route, params = {}, headers = {} }: GeneralRequestProps): Promise<AxiosResponse<T>> => {
  const url = getUrl(route)
  headers = addRequestTokens(headers)
  return axios.request<T>({ method, url, headers, params, validateStatus: _ => true })
};
