import axios from "axios";
import { config } from "../config";
import { getTokens, updateTokens, clearTokens } from "../auth";

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
    "x-access-token": accessToken,
  }

  const response = await axios.request<T>({ method, url, headers, params })

  if (response.status === 403) {
    clearTokens()
  } else {
    if (response.status > 299) {
      console.log("ERROR: ", response.statusText)
    }
    const responseHeaders = response.headers
    const newAccessToken = responseHeaders['x-access-token']
    const newRefreshToken = responseHeaders['x-refresh-token']
    updateTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken })
    return response.data
  }

};

export const getRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'get', route, params, headers })
};

export const postRequest = async <T>({ route, params = {}, headers = {} }: RequestProps) => {
  return apiRequest<T>({ method: 'post', route, params, headers })
};

