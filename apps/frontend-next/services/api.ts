// apiService.ts
import { API_ENDPOINTS } from './endpoints';

export async function generateNonce(address: string) {
  try {
    const res = await fetch(API_ENDPOINTS.auth.generateNonce, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    if (!res.ok) throw new Error('Failed to generate nonce');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error generating nonce:', error);
    throw error;
  }
}

export async function getCredentials(address: string, signature: string) {
  try {
    const res = await fetch(API_ENDPOINTS.auth.getCredentials, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, signature }),
    });

    if (!res.ok) throw new Error('Failed to validate credentials');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error getting credentials:', error);
    throw error;
  }
}

export async function addFavoriteCoin(coin: string) {
  try {
    const res = await fetch(API_ENDPOINTS.users.addFavoriteCoin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coin }),
    });

    if (!res.ok) throw new Error('Failed to add favorite coin');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error adding favorite coin:', error);
    throw error;
  }
}

export async function deleteFavoriteCoin(coin: string) {
  try {
    const res = await fetch(API_ENDPOINTS.users.deleteFavoriteCoin, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coin }),
    });

    if (!res.ok) throw new Error('Failed to delete favorite coin');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error deleting favorite coin:', error);
    throw error;
  }
}

export async function getFavoriteCoins() {
  try {
    const res = await fetch(API_ENDPOINTS.users.getFavoriteCoins, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to retrieve favorite coins');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error retrieving favorite coins:', error);
    throw error;
  }
}

// Indexer Alephium API functions

export async function getMyBalance(address: string) {
  try {
    const res = await fetch(API_ENDPOINTS.indexerAlephium.getMyBalance(address), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to retrieve balance');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error retrieving balance:', error);
    throw error;
  }
}

export async function getCryptoInfo(coin: string) {
  try {
    const res = await fetch(API_ENDPOINTS.indexerAlephium.getCryptoInfo(coin), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to retrieve crypto info');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error retrieving crypto info:', error);
    throw error;
  }
}

export async function getPopularCoinsInfo() {
  try {
    const res = await fetch(API_ENDPOINTS.indexerAlephium.getPopularCoinsInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to retrieve popular coins info');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error retrieving popular coins info:', error);
    throw error;
  }
}

export async function getFavoriteCoinsInfo() {
  try {
    const res = await fetch(API_ENDPOINTS.indexerAlephium.getFavoriteCoinsInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Assuming authentication via cookies/session
    });

    if (!res.ok) throw new Error('Failed to retrieve favorite coins info');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error retrieving favorite coins info:', error);
    throw error;
  }
}
