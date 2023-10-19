import { LocalStore } from '../store';
import { create } from 'zustand';

// ---------------------------- types ----------------------------
export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
}

// ---------------------------- store ----------------------------
export interface AuthStoreState {
  tokens: Tokens;
  clearTokens: () => void;
  setTokens: (tokens: Tokens) => void;
  patchTokens: (newTokens: Partial<Tokens>) => void;
  initTokens: () => void;
}

const lsWriteTokens = (tokens: Tokens) => {
  LocalStore.set('authTokens', JSON.stringify(tokens))
}
const lsReadTokens = (): Tokens => {
  const tokens = LocalStore.get('authTokens')
  try {
    return JSON.parse(tokens || '{}') as Tokens
  } catch {
    return {}
  }
}
const lsClearTokens = () => {
  LocalStore.remove('authTokens')
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  tokens: {},
  clearTokens: () => {
    lsClearTokens();
    set({ tokens: {} })
  },
  setTokens: (tokens: Tokens) => {
    lsWriteTokens(tokens)
    set({ tokens })
  },
  patchTokens: (newTokens: Partial<Tokens>) => {
    const oldTokens = get().tokens
    const tokens: Tokens = {
      accessToken: newTokens.accessToken ?? oldTokens?.accessToken,
      refreshToken: newTokens.refreshToken ?? oldTokens?.refreshToken,
      idToken: newTokens.idToken ?? oldTokens?.idToken,
    }
    lsWriteTokens(tokens)
    set({ tokens })
  },
  initTokens: () => {
    const tokens = lsReadTokens()
    if (tokens) set({ tokens })
  }
}));

// ---------------------------- shortcut methods ----------------------------
export const clearTokens = () => useAuthStore.getState().clearTokens()
export const setTokens = (tokens: Tokens = {}) => useAuthStore.getState().setTokens(tokens)
export const patchTokens = (newTokens: Partial<Tokens>) => useAuthStore.getState().patchTokens(newTokens)
export const getTokens = () => useAuthStore.getState().tokens
export const initTokens = () => useAuthStore.getState().initTokens()

// ---------------------------- selectors ----------------------------
export const createAuthSelector = <T>(selector: (state: AuthStoreState) => AuthStoreState[keyof AuthStoreState]) => {
  return () => useAuthStore(selector) as T
}

export const tokensSelector = createAuthSelector<Tokens>((state) => state.tokens)