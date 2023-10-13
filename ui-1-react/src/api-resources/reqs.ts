import { getRequest } from "../api-base";
import { Stat } from "./entities";

export const getStats = async () => {
  return getRequest<Stat[]>({ route: '/stats' })
}