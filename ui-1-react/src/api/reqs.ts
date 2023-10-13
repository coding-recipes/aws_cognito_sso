import { getRequest } from "./api";
import { Stat } from "./entity";

export const getStats = async () => {
  return getRequest<Stat[]>({ route: '/stats' })
}