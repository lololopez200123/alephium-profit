import { atom } from 'jotai';
import { BalanceResponse } from '../../backend-nest/src/indexer-alephium/interfaces/balance';

export const userBalanceAtom = atom<BalanceResponse | null>(null);
