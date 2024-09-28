// apiService.ts
import { API_ENDPOINTS } from './endpoints';

export async function generateSign(address: string, publicKey: string) {
  try {
    const res = await fetch(API_ENDPOINTS.auth.generateSign, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, publicKey }),
    });

    if (!res.ok) throw new Error('Failed to generate sign');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error generating sign:', error);
    throw error;
  }
}

export async function getMyInfo() {
  try {
    const res = await fetch(API_ENDPOINTS.users.getMyInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to get my info');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error getting myInfo:', error);
    throw error;
  }
}

export async function addFavoriteCoin(coin: string) {
  try {
    const res = await fetch(API_ENDPOINTS.users.addFavoriteCoin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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

export async function getMyBalance() {
  try {
    const res = await fetch(API_ENDPOINTS.indexerAlephium.getMyBalance, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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

export async function getPopularCoinsInfo() {
  try {
    const res = await fetch(API_ENDPOINTS.indexerAlephium.getPopularCoinsInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to retrieve popular coins info');

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error retrieving popular coins info:', error);
    throw error;
  }
}
