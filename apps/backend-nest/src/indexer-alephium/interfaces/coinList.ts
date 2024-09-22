export interface CoinListItem {
  logo: string;
  name: string;
  priceChange: number;
  price: number;
  amount: number;
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
  name: string;
  logo: string;
}

export interface MobulaResponse {
  data: MobulaData[];
}
