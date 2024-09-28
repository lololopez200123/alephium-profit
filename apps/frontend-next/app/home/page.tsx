import { Box } from '@mui/material';
import React from 'react';
import { getPopularCoinsInfo } from '@/services/api';
import Loading from '@/components/loading/Loading';
import HeroHome from '@/components/Home/heroHome/HeroHome';
import PopularCoinsList from '@/components/Home/popularCoinsList/PopularCoinsList';

export interface Coin {
  logo: string;
  name: string;
  priceChange: number;
  price: number;
  amount: number;
}

async function Home() {
  const coinResponse: Coin[] = await getPopularCoinsInfo();
  const coinData = coinResponse.map((coin) => {
    return {
      ...coin,
      name: coin.name.toUpperCase(),
      priceChange: parseFloat(coin.priceChange.toFixed(2)),
      price: coin.price >= 1000 ? parseFloat(coin.price.toFixed(0)) : parseFloat(coin.price.toFixed(2)),
      amount: coin.amount >= 1000 ? parseFloat(coin.amount.toFixed(0)) : parseFloat(coin.amount.toFixed(3)),
    };
  });

  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '1.25rem',
        paddingBottom: '2.5rem',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100vh - 100px)',
        paddingX: 'clamp(.5rem,4.26%,1rem)',
      }}
    >
      <Loading />
      <HeroHome />
      <PopularCoinsList coinData={coinData} />
    </Box>
  );
}

export default Home;
