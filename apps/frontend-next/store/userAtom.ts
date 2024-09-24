import { atomWithStorage } from 'jotai/utils';

export interface User {
  address: string;
  name: string;
  favoriteTokens: string[];
}

export const userAtom = atomWithStorage<User | null>('user', null);
