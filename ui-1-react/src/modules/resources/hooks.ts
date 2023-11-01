
import { useQuery, useQueryClient } from "react-query";
import { getStats, getCurrentUser, getServerInfo } from "./requests";
import { Stats, CurrentUser, ServerInfo } from "./entities";

enum QUERY_KEYS {
  STATS = "stats",
  CURRENT_USER = "current_user",
  SERVER_INFO = "server_info"
}

export type QueryFunction<T> = () => ReturnType<typeof useQuery<T>>
export type UseHookResponse<T> = [QueryFunction<T>, VoidFunction]
export type UseHook<T> = () => UseHookResponse<T>

const hookFactory = <T>(queryKey: QUERY_KEYS, getFunction: () => Promise<T>) => {
  const useHook: UseHook<T> = () => {
    const queryClient = useQueryClient()
    const query = () => {
      return useQuery(queryKey, getFunction)
    }
    const refresh: VoidFunction = () => {
      queryClient.invalidateQueries(queryKey)
    }
    return [query, refresh]
  }
  return useHook
}

export const useStats = hookFactory<Stats>(QUERY_KEYS.STATS, getStats)
export const useCurrentUser = hookFactory<CurrentUser>(QUERY_KEYS.CURRENT_USER, getCurrentUser)
export const useServerInfo = hookFactory<ServerInfo>(QUERY_KEYS.SERVER_INFO, getServerInfo)
