import { getRequest } from "../api";
import { Stat } from "./entities";

export const getStats = async () => {
  return getRequest<Stat[]>({ route: '/stats' })
}