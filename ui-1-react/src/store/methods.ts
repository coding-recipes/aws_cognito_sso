import { useStore, StoreState } from "./store"

type StoreKeys = keyof StoreState
type StoreKeyDict = { [key in StoreKeys]: key }

export const getStoreKeys = () => {
  const keyArray = Object.keys(useStore.getState()) as StoreKeys[]
  const keyDict: StoreKeyDict = keyArray.reduce((acc, key) => ({ ...acc, [key]: key }), {}) as StoreKeyDict
  return keyDict
}
export const getStoreState = () => {
  return useStore.getState()
}
export const getStoreItem = (key: keyof StoreState) => {
  return useStore.getState()[key]
}


export const setStoreState = (partialState: Partial<StoreState>) => {
  useStore.setState(partialState);
}
export const setUser = (user?: StoreState["user"]) => {
  useStore.setState({ user })
}
export const setAuthCode = (authCode?: StoreState["authCode"]) => {
  useStore.setState({ authCode })
}