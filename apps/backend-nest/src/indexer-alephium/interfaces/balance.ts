export interface BalanceApiResponse {
  tokens: TokenBalance[];
}

export interface BalanceResponse {
  totalAmount: number;
  tokens: TokenDetails[];
  totalHistory: BalanceHistoryEntry[];
  totalFavouriteHistory: BalanceFavouriteHistoryEntry[];
}

export interface TokenBalance {
  userAddress: string;
  balance: string;
  token: Token;
}

export interface BalanceHistoryEntry {
  address: string;
  timestamp: number;
  totalAmount: number;
}

export interface BalanceFavouriteHistoryEntry {
  address: string;
  timestamp: number;
  totalAmount: number;
  tokens: TokenDetails[];
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  listed: boolean;
  description: string;
  logo: string;
}

export interface TokenDetails {
  name: string;
  amount: number;
  amountOnAlph: number;
  logo: string;
  percent: number;
  isFavourite: boolean;
}
