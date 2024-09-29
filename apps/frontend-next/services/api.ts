import { API_BASE, API_ENDPOINTS } from './endpoints';

interface FetchOptions {
  method: string;
  headers: { [key: string]: string };
  body?: string;
  credentials?: RequestCredentials;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Application error');
  }
  return response.json();
}

async function apiRequest(endpoint: string, options: FetchOptions) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    return await handleResponse(res);
  } catch (error) {
    console.error(`Application error to ${endpoint}:`, error);
    throw error;
  }
}

export async function generateSign(address: string, publicKey: string) {
  return apiRequest(API_ENDPOINTS.auth.generateSign, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address, publicKey }),
  });
}

export async function getMyInfo() {
  return apiRequest(API_ENDPOINTS.users.myInfo, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}

export async function addFavoriteCoin(coin: string) {
  return apiRequest(API_ENDPOINTS.users.addFavoriteCoin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coin }),
    credentials: 'include',
  });
}

export async function deleteFavoriteCoin(coin: string) {
  return apiRequest(API_ENDPOINTS.users.deleteFavoriteCoin, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coin }),
    credentials: 'include',
  });
}

export async function getFavoriteCoins() {
  return apiRequest(API_ENDPOINTS.users.getFavoriteCoins, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}

export async function getMyBalance() {
  return apiRequest(API_ENDPOINTS.indexerAlephium.getMyBalance, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}

export async function getPopularCoinsInfo() {
  return apiRequest(API_ENDPOINTS.indexerAlephium.getPopularCoinsInfo, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // It is not necessary to include credentials if authentication is not required
  });
}

export async function logout() {
  return apiRequest(API_ENDPOINTS.auth.logout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}
