import { create } from 'zustand';
import { User } from "./user.model";
import { Tokens } from '../auth';

export interface StoreState {
  user: User | undefined;
  tokens: Tokens | undefined;
}

export const useStore = create<StoreState>(() => ({
  user: undefined,
  tokens: undefined,
}));
