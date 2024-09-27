import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { getPopularCoinsInfo } from '@/services/api';
import ItemPopular from '@/components/itemPopular/ItemPopular';
import Loading from '@/components/loading/Loading';

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
      <Box
        sx={{
          height: '45%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            left: '0',
            marginBottom: '5%',
            marginInline: '2px',
          }}
        >
          <Image width="140" height="44" src="/main-logo.svg" alt="logo"></Image>
        </Box>
        <Box
          sx={{
            marginBottom: '32%',
            position: 'relative',
            left: 'clamp(.5rem,4.26%,1%)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: '2rem',
              fontWeight: '500',
            }}
          >
            <p>Monitor your</p>
            <p>
              <span
                style={{
                  backgroundImage: 'linear-gradient(147.7deg, #6942E2 19.37%, #28E7C5 77.65%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextStrokeWidth: 'thin',
                }}
              >
                performance
              </span>{' '}
              like
            </p>
            <p>never before</p>
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ marginBottom: '0.3125rem', paddingInline: '1.25rem ' }} fontSize="0.625rem" variant="caption">
        COINS
      </Typography>
      <Box
        sx={{
          height: '65%',
          minHeight: '15.625rem',
          overflow: 'auto',
          paddingBottom: '4rem',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {coinData.map((coin, index) => {
            return <ItemPopular coin={coin} key={index} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
