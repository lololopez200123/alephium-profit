const BASE_URL = 'https://backend-3grl.onrender.com';

export const API_ENDPOINTS = {
  auth: {
    generateSign: `${BASE_URL}/auth/sign`,
    getCredentials: `${BASE_URL}/auth/credentials`,
  },
  users: {
    getMyInfo: `${BASE_URL}/users/my-info`,
    addFavoriteCoin: `${BASE_URL}/users/favorite-coin`,
    deleteFavoriteCoin: `${BASE_URL}/users/favorite-coin`,
    getFavoriteCoins: `${BASE_URL}/users/favorite-coins`,
  },
  indexerAlephium: {
    getMyBalance: `${BASE_URL}/indexer-alephium/my-balance`,
    getPopularCoinsInfo: `${BASE_URL}/indexer-alephium/get-popular-coins-info`,
    getFavoriteCoinsInfo: `${BASE_URL}/indexer-alephium/favorite-coins-info`,
    getMarketInfoBatch: `${BASE_URL}/indexer-alephium/get-crypto-info-batch`,
  },
};
