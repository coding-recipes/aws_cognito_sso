import { handleResponse } from "./util.response";
import { handleRequest } from "./util.request";
import { RequestProps, GeneralRequestProps } from "./types";

export const apiRequest = async <T>({ method, route, params = {}, headers = {} }: GeneralRequestProps) => {
  const response = await handleRequest<T>({ method, route, headers, params })
  return handleResponse(response)
};

export const getRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'get', route, params, headers })
};

export const postRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'post', route, params, headers })
};

