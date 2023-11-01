import { getRequest } from "../api";
import { Stats, CurrentUser, ServerInfo } from "./entities";

export const getStats = async () => {
  return getRequest<Stats>({ route: '/stats' })
}

export const getCurrentUser = async () => {
  return getRequest<CurrentUser>({ route: '/user' })
}

export const getServerInfo = async () => {
  return getRequest<ServerInfo>({ route: '/info/server' })
}