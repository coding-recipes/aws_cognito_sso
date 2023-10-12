import { create } from 'zustand';
import { User } from "./user.model";

export interface StoreState {
  user: User | undefined;
  authCode?: string;
}

export const useStore = create<StoreState>(() => ({
  user: undefined,
}));
