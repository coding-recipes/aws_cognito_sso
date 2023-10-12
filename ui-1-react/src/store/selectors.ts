import { useStore, StoreState } from "./store";


export const createSelector = <T>(selector: (state: StoreState) => StoreState[keyof StoreState]) => {
  return () => useStore(selector) as T
}

// ------- user ------
export const userSelector = createSelector<StoreState["user"]>((state) => state.user)