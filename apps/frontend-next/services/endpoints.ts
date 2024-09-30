const ENDPOINTS_API_NEXT = {
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

const ENDPOINTS_API_NODE = {
  auth: {
    generateSign: '/auth/sign',
    logout: '/auth/logout',
  },
  users: {
    myInfo: '/users/my-info',
    addFavoriteCoin: '/users/favorite-coin',
    deleteFavoriteCoin: '/users/favorite-coin',
    getFavoriteCoins: '/users/favorite-coins',
  },
  indexerAlephium: {
    getMyBalance: '/indexer-alephium/my-balance',
    getPopularCoinsInfo: '/indexer-alephium/get-popular-coins-info',
  },
};

function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    // En el cliente, las solicitudes se hacen relativas
    return '/api';
  } else {
    // En el servidor, construye la URL absoluta
    const host = process.env.NEXT_PUBLIC_VERCEL_URL ? `${process.env.NEXT_PUBLIC_VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`;
    return `${host}`;
  }
}

function getEndpoints() {
  if (typeof window !== 'undefined') {
    // En el cliente, usa las rutas de la API de Next.js
    return ENDPOINTS_API_NEXT;
  } else {
    // En el servidor, usa las rutas de la API de Node.js
    return ENDPOINTS_API_NODE;
  }
}

export const API_BASE = getApiBaseUrl();
export const API_ENDPOINTS = getEndpoints();
