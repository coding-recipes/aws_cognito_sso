import { useStore, StoreState } from "./store";

export const createSelector = <T>(selector: (state: StoreState) => StoreState[keyof StoreState]) => {
  return () => useStore(selector) as T
}