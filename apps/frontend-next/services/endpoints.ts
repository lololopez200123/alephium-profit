function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    // En el cliente, las solicitudes se hacen relativas
    return '/api';
  } else {
    // En el servidor, construye la URL absoluta
    const host = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`;
    return `${host}/api`;
  }
}

export const API_BASE = getApiBaseUrl();

export const API_ENDPOINTS = {
  auth: {
    generateSign: '/auth/generateSign',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  users: {
    myInfo: '/users/myInfo',
    addFavoriteCoin: '/users/addFavoriteCoin',
    deleteFavoriteCoin: '/users/deleteFavoriteCoin',
    getFavoriteCoins: '/users/getFavoriteCoins',
  },
  indexerAlephium: {
    getMyBalance: '/indexerAlephium/getMyBalance',
    getPopularCoinsInfo: '/indexerAlephium/getPopularCoinsInfo',
  },
};
