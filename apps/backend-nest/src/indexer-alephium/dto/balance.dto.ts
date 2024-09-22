export interface BalanceApiResponse {
  tokens: TokenBalance[];
}

export interface BalanceResponse {
  currentBalance: BalanceApiResponse;
  history: BalanceHistoryEntry[];
}

export interface TokenBalance {
  userAddress: string;
  balance: string;
  token: Token;
}

export interface BalanceHistoryEntry {
  address: string;
  timestamp: number;
  tokens: TokenBalance[];
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
  social?: any; // Si utilizas este campo
}
