'use client';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import Chart from '@/components/Chart';

const test = [
  { name: 'ALEPHIUM', amount: '10 ALPH', price: '3.112', progress: 30 },
  { name: 'AYIN', amount: '10 ALPH', price: '4', progress: 20 },
  { name: 'ALEPHIUM', amount: '10 ALPH', price: '2', progress: 50 },
];

const dataGraph: number[] = [0, 0];

function Wallet() {
  const [activeStates, setActiveStates] = useState<boolean[]>(test.map(() => false));

  const handleClick = (index: number) => {
    setActiveStates((prevActiveStates) => prevActiveStates.map((isActive, i) => (i === index ? !isActive : isActive)));
  };

  const selectedTime = ['1D', '1W', '1M', '1Y'];

  //const [selectCoin, setSelectCoin] = useState<Coin | null>(null);

  //const handleSelectCoin = (item: Coin) => {
  // setSelectCoin(item);
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '30px',
        paddingBottom: '40px',
        width: '100%',
        height: '90%',
        paddingX: '1rem',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ paddingTop: '2rem', height: '350px' }}>
        <Typography sx={{ fontSize: '0.9375rem' }}>TOTAL BALANCE</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'baseline',
          }}
        >
          <Typography sx={{ fontSize: '2.5rem' }}>5000</Typography>
          <Typography
            sx={{
              fontSize: '0.725rem',
              paddingLeft: '1%',
            }}
          >
            ALPH
          </Typography>
        </Box>
        <Chart data={dataGraph} />
      </Box>
      <Box
        sx={{
          width: '80%',
          marginInline: 'auto',
          height: '2rem',
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '1rem',
        }}
      >
        {selectedTime?.map((id) => (
          <Box
            key={id} // key debe estar como prop del Box
            sx={{
              width: '42px',
              height: '29px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: false
                ? 'linear-gradient(180deg, #28E7C5 -100%, #0B1426 170.69%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)',
            }}
          >
            <Typography
              sx={{
                fontSize: '.9rem',
                textAlign: 'center',
              }}
            >
              {id}
            </Typography>
          </Box>
        ))}
      </Box>
      <Typography sx={{ marginBottom: '5px' }} fontSize="0.625rem" variant="caption">
        COINS
      </Typography>
      <Box sx={{ width: '100%' }}>
        {test.map((coin, index) => {
          return (
            <Box key={coin.price} sx={{ display: 'flex', width: '100%', marginInline: 'auto', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
              <Box
                sx={{
                  alignItems: 'center',
                  position: 'relative',
                  height: '90px',
                  width: '67.5%',
                  display: 'flex',
                  borderRadius: '10px',
                  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)`,
                }}
              >
                <Box
                  sx={{
                    left: '13px',
                    top: '12px',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    background: 'white',
                    borderRadius: '30px',
                  }}
                >
                  <Image width="18" height="18" alt="1" src="/ALPHAGA.png"></Image>
                </Box>
                <Button
                  onClick={() => handleClick(index)}
                  sx={{
                    p: '0',
                    right: '6px',
                    top: '6px',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '30px',
                    minWidth: '20px',
                  }}
                >
                  <Image width="18" height="18" alt="1" src={activeStates[index] ? '/star-selected.svg' : '/star.svg'}></Image>
                </Button>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', marginInline: '25%' }}>
                  <Typography variant="subtitle2" fontSize="0.725rem" key={coin.name}>
                    {coin.name}
                  </Typography>
                  <Typography variant="h6" key={coin.price}>
                    {coin.price}
                  </Typography>
                  <Typography variant="subtitle2" key={coin.amount}>
                    {coin.amount}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '32.5%',
                  height: '90px',
                  borderRadius: '10px',
                  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative', // Añadido para posicionar los CircularProgress
                }}
              >
                <Typography variant="subtitle2">{coin.progress}%</Typography>
                <svg width={0} height={0}>
                  <defs>
                    <linearGradient id="my_gradient" x1="100%" y1="0%" x2="0%" y2="40%">
                      <stop offset="0%" stopColor="#6942E2" />
                      <stop offset="100%" stopColor="#28E7C5" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Círculo de fondo gris */}
                <CircularProgress
                  sx={{
                    color: '#0B142680', // Color gris claro
                    position: 'absolute',
                  }}
                  size={64}
                  thickness={7}
                  variant="determinate"
                  value={100}
                />
                {/* Círculo de progreso con gradiente */}
                <CircularProgress
                  sx={{
                    position: 'absolute',
                    'svg circle': { stroke: 'url(#my_gradient)' },
                    [`& .MuiCircularProgress-circle`]: {
                      strokeLinecap: 'round',
                    },
                  }}
                  size={64}
                  thickness={7}
                  variant="determinate"
                  value={coin.progress}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Wallet;
