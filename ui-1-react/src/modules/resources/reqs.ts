import { getRequest } from "../api";
import { Stats, CurrentUser } from "./entities";

export const getStats = async () => {
  return getRequest<Stats>({ route: '/stats' })
}

export const getCurrentUser = async () => {
  return getRequest<CurrentUser>({ route: '/user' })
}