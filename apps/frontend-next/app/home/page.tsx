import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

function Home() {
  const test = [
    { name: 'ALEPHIUM', amount: '10 ALPH', price: '3.10' },
    { name: 'USDT', amount: '10 ALPH ', price: '1' },
    { name: 'WBTC', amount: '2100 ALPH', price: '60000' },
    { name: 'WETH', amount: '12 ALPH', price: '2122' },
    { name: 'ALEPHIUM', amount: '10 ALPH', price: '2.5' },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '80%', paddingX: '1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '7%' }}>
        <Typography variant="caption">OVERVIEW</Typography>
      </Box>
      <Box sx={{ display: 'flex', position: 'relative', left: '-1rem', marginBottom: '3%' }}>
        <Image width="140" height="44" src="/main-logo.svg" alt="logo"></Image>
      </Box>
      <Box sx={{ marginBottom: '34%' }}>
        <Typography variant="h4">
          <p>Lorem ipsum dolor</p>
          <p>sit amet,</p>
          <p>consectetur</p>
        </Typography>
      </Box>
      <Typography fontSize="0.625rem" variant="caption">
        COINS
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'auto', flex: '1 1 auto' }}>
        {test.map((coin) => {
          return (
            <Box
              key={coin.price}
              sx={{
                display: 'flex',
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
                <Typography variant="subtitle2" key={coin.name}>
                  {coin.name}
                </Typography>
              </Box>
              <Box sx={{ width: '16%', display: 'flex', alignItems: 'left', flexDirection: 'column', marginInline: '3%', justifyContent: 'center' }}>
                <Typography variant="subtitle1" key={coin.price}>
                  {coin.price}
                </Typography>
                <Typography fontSize="0.625rem" variant="caption" key={coin.amount}>
                  {coin.amount}
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
