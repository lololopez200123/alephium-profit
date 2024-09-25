'use client';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Chart from '@/components/Chart';
import { userBalanceAtom } from '@/store/userBalanceAtom';
import { useAtom } from 'jotai';
import { addFavoriteCoin, deleteFavoriteCoin } from '@/services/api';

function Wallet() {
  const [balance, setBalance] = useAtom(userBalanceAtom);
  const [tokensIndex, setTokensIndex] = useState<number[]>([]);
  const handleClick = async (index: number) => {
    if (!balance) return;

    const newTokens = [...balance.tokens];
    newTokens[index] = {
      ...newTokens[index],
      isFavourite: !newTokens[index].isFavourite,
    };
    setBalance({ ...balance, tokens: newTokens });

    if (!tokensIndex.includes(index)) {
      setTokensIndex((prev) => [...prev, index]);
    }
  };
  const selectedTime = ['1D', '1W', '1M', '1Y'];
  const [time, setTime] = useState<string | null>(null);
  const handleSelectionTime = (time: string) => {
    setTime(time);
  };

  useEffect(() => {
    tokensIndex.forEach((item) => {
      if (balance?.tokens[item]?.isFavourite) {
        addFavoriteCoin(balance.tokens[item].name);
        setTokensIndex([]);
      } else {
        if (balance) {
          deleteFavoriteCoin(balance.tokens[item].name);
          setTokensIndex([]);
        }
      }
    });
  }, [tokensIndex, balance]);

  const dataGraph = [...(balance?.totalHistory.map((item) => item.totalAmount) || [0, 0]), balance?.totalAmount ?? 0];

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
          <Typography sx={{ fontSize: '2.5rem' }}>{balance?.totalAmount.toFixed(2) ?? 0}</Typography>
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
          marginBlock: '2rem',
          zIndex: 2,
        }}
      >
        {selectedTime?.map((id) => (
          <Box
            key={id}
            onClick={() => handleSelectionTime(id)}
            sx={{
              width: '42px',
              height: '29px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                id === time
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
      <Box
        sx={{
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {balance?.tokens?.map((coin, index) => {
          return (
            <Box
              key={coin.name}
              sx={{
                display: 'flex',
                width: '100%',
                marginInline: 'auto',
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '8px',
              }}
            >
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
                    borderRadius: '30px',
                    overflow: 'hidden',
                  }}
                >
                  <Image width="32" height="32" alt="1" src={coin.logo}></Image>
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
                  <Image
                    width="18"
                    height="18"
                    alt={balance?.tokens[index].logo}
                    src={balance?.tokens[index].isFavourite ? '/star-selected.svg' : '/star.svg'}
                  ></Image>
                </Button>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginInline: '25%',
                  }}
                >
                  <Typography variant="subtitle2" fontSize="0.725rem" key={coin.name}>
                    {coin.name.toLocaleUpperCase()}
                  </Typography>
                  <Typography variant="h6" key={coin.amount}>
                    {coin.amount}
                  </Typography>
                  <Typography variant="subtitle2" key={coin.amountOnAlph}>
                    {`${coin.amountOnAlph} ALPH`}
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
                <Typography variant="subtitle2">{coin.percent}%</Typography>
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
                  value={coin.percent}
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
