import { useStore } from "./store";

export const userSelector = () => useStore((state) => state.user)
