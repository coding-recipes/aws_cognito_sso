import axios from "axios";
import { config } from "../config";
import { getTokens } from "../auth";

const getUrl = (route: string) => {
  return config().api_url + route;
}

interface RequestProps {
  route: string,
  params?: Record<string, string | number>,
  headers?: Record<string, string | undefined>,
}
interface GeneralRequestProps extends RequestProps {
  method?: 'get' | 'post'
}

export const apiRequest = async <T>({ method, route, params = {}, headers = {} }: GeneralRequestProps) => {
  const url = getUrl(route)
  const { accessToken, refreshToken } = getTokens()
  headers = {
    ...headers,
    Authorization: `Bearer ${accessToken}`,
    "x-refresh-token": refreshToken,
    // "x-access-token": accessToken,
  }

  const response = await axios.request<T>({ method, url, headers, params })
  const responseHeaders = response.headers
  console.log('responseHeaders', responseHeaders)
  console.log('NOT IMPLEMENTED: change tokens in store based on responseHeaders')

  return response.data
};

export const getRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'get', route, params, headers })
};

export const postRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'post', route, params, headers })
};

