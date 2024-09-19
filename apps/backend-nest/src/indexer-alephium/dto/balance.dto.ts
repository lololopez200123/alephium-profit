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

// Mobula

export interface MobulaData {
  market_cap: number;
  market_cap_diluted: number;
  liquidity: number;
  liquidity_change_24h: number;
  price: number;
  off_chain_volume: number;
  volume: number;
  volume_change_24h: number;
  volume_7d: number;
  is_listed: boolean;
  price_change_24h: number;
  price_change_1h: number;
  price_change_7d: number;
  price_change_1m: number;
  price_change_1y: number;
  ath: number;
  atl: number;
}

export interface MobulaResponse {
  data: MobulaData;
}
