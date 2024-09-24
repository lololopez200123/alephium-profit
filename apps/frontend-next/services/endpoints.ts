// endpoints.ts
const BASE_URL = 'https://backend-3grl.onrender.com';

export const API_ENDPOINTS = {
  auth: {
    generateNonce: `${BASE_URL}/auth/nonce`,
    getCredentials: `${BASE_URL}/auth/credentials`,
  },
  users: {
    addFavoriteCoin: `${BASE_URL}/users/favorite-coin`,
    deleteFavoriteCoin: `${BASE_URL}/users/favorite-coin`,
    getFavoriteCoins: `${BASE_URL}/users/favorite-coins`,
  },
  indexerAlephium: {
    getMyBalance: (address: string) => `${BASE_URL}/indexer-alephium/my-balance?address=${address}`,
    getCryptoInfo: (coin: string) => `${BASE_URL}/indexer-alephium/get-crypto-info?coin=${coin}`,
    getPopularCoinsInfo: `${BASE_URL}/indexer-alephium/get-popular-coins-info`,
    getFavoriteCoinsInfo: `${BASE_URL}/indexer-alephium/favorite-coins-info`,
    getMarketInfoBatch: `${BASE_URL}/indexer-alephium/get-crypto-info-batch`,
  },
};
