import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { getPopularCoinsInfo } from '@/services/api';

interface coin {
  logo: string;
  name: string;
  priceChange: number;
  price: number;
  amount: number;
}

async function Home() {
  const coinResponse: coin[] = await getPopularCoinsInfo();
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
        paddingTop: '60px',
        paddingBottom: '40px',
        flexDirection: 'column',
        width: '100%',
        height: '90%',
        paddingX: '1rem',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          left: '-1rem',
          marginBottom: '5%',
        }}
      >
        <Image width="140" height="44" src="/main-logo.svg" alt="logo"></Image>
      </Box>
      <Box sx={{ marginBottom: '32%', position: 'relative' }}>
        <Typography variant="h4">
          <p>Monitor your</p>
          <p>
            <span
              style={{
                backgroundImage: 'linear-gradient(147.7deg, #6942E2 19.37%, #28E7C5 77.65%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              performance
            </span>{' '}
            like
          </p>
          <p>never before</p>
        </Typography>
      </Box>
      <Typography sx={{ marginBottom: '5px' }} fontSize="0.625rem" variant="caption">
        COINS
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {coinData.map((coin) => {
          return (
            <Box
              key={coin?.price}
              sx={{
                display: 'flex',
                height: '48px',
                justifyContent: 'space-between',
                borderRadius: '10px',
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    background: 'white',
                    borderRadius: '30px',
                    margin: '0.8rem',
                    marginInline: '1.25rem',
                  }}
                >
                  <Image width="16" height="16" alt="1" src="/ALPHAGA.png"></Image>
                </Box>
                <Typography variant="subtitle2" key={coin?.name}>
                  {coin?.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    paddingLeft: '.9rem',
                    fontSize: '0.625rem',
                    color: coin?.priceChange <= 0 ? 'rgba(226, 66, 66, 1)' : 'rgba(40, 231, 197, 1)',
                  }}
                >
                  {coin.priceChange}%
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '21%',
                  display: 'flex',
                  alignItems: 'left',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="subtitle1" key={coin?.price}>
                  {coin?.price}
                </Typography>
                <Typography fontSize="0.625rem" variant="caption" key={coin?.amount}>
                  {coin?.amount} ALPH
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Home;
