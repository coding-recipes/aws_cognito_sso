import { handleResponse } from "./util.response";
import { handleRequest, handleRequestUnAuth } from "./util.request";
import { RequestProps, GeneralRequestProps } from "./types";



const apiRequest = async <T>({ method, route, params = {}, headers = {} }: GeneralRequestProps) => {
  const response = await handleRequest<T>({ method, route, headers, params })
  return handleResponse(response)
};

export const getRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'get', route, params, headers })
};

export const postRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'post', route, params, headers })
};



const apiRequestUnAuth = async <T>({ method, route, params = {}, headers = {} }: GeneralRequestProps) => {
  const response = await handleRequestUnAuth<T>({ method, route, headers, params })
  return response.data
};

export const getRequestUnAuth = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequestUnAuth<T>({ method: 'get', route, params, headers })
};

export const postRequestUnAuth = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequestUnAuth<T>({ method: 'post', route, params, headers })
};