import { getRequest } from "./api";
import { Stat } from "./dto";

export const getStats = async () => {
  return getRequest<Stat[]>({ route: '/stats' })
}