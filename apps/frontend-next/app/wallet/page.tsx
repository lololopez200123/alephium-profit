'use client';
import { Box, Typography, Button } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Chart from '@/components/Chart';
import { userBalanceAtom } from '@/store/userBalanceAtom';
import { useAtom } from 'jotai';
import { addFavoriteCoin, deleteFavoriteCoin } from '@/services/api';
import ItemWallet from '@/components/itemWallet/ItemWallet';
import { BalanceResponse } from '../../../backend-nest/src/indexer-alephium/interfaces/balance';
import { searchTermAtom } from '@/store/searchAtom';
import Fuse from 'fuse.js';

const selectedTime = ['1D', '1W', '1M', '1Y'];

function Wallet() {
  const [balance, setBalance] = useAtom<BalanceResponse | null>(userBalanceAtom);
  const [time, setTime] = useState<string | null>(null);
  const [searchTerm] = useAtom(searchTermAtom);

  const handleClick = async (index: number) => {
    if (!balance) return;

    const updatedTokens = balance.tokens.map((token, i) => (i === index ? { ...token, isFavourite: !token.isFavourite } : token));
    setBalance({ ...balance, tokens: updatedTokens });

    try {
      const selectedToken = updatedTokens[index];
      if (selectedToken.isFavourite) {
        await addFavoriteCoin(selectedToken.name);
      } else {
        await deleteFavoriteCoin(selectedToken.name);
      }
    } catch (error) {
      console.error('Error updating favorite coin:', error);
      // Opcional: revertir el cambio de estado en caso de error
      const revertedTokens = balance.tokens.map((token, i) => (i === index ? { ...token, isFavourite: balance.tokens[i].isFavourite } : token));
      setBalance({ ...balance, tokens: revertedTokens });
    }
  };

  const handleSelectionTime = (time: string) => {
    setTime(time);
  };

  const dataGraph = useMemo(() => {
    return [...(balance?.totalHistory.sort((a, b) => a.timestamp - b.timestamp).map((item) => item.totalAmount) || [0, 0]), balance?.totalAmount ?? 0];
  }, [balance]);

  const fuse = useMemo(() => {
    if (!balance?.tokens) return null;
    return new Fuse(balance.tokens, {
      keys: ['name'], // Campos por los que se buscará
      threshold: 0.3, // Ajusta la sensibilidad de la búsqueda
    });
  }, [balance]);

  // Filtrado de tokens basado en el término de búsqueda
  const filteredTokens = useMemo(() => {
    if (!fuse || !searchTerm) return balance?.tokens || [];
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [fuse, searchTerm, balance]);

  const totalAmount = balance?.totalAmount ?? 0;

  return (
    <Box
      sx={{
        display: 'flex',
        paddingBlock: '1.25rem',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100vh - 100px)',
        paddingX: '1rem',
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ height: '45%', position: 'relative' }}>
        <Box
          sx={{
            height: '100%',
            position: 'absolute',
            width: '100%',
            zIndex: 2,
          }}
        >
          <Typography sx={{ fontSize: '0.9375rem' }}>TOTAL BALANCE</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'baseline',
            }}
          >
            <Typography sx={{ fontSize: '2.5rem' }}>{totalAmount}</Typography>
            <Typography
              sx={{
                fontSize: '0.725rem',
                paddingLeft: '1%',
              }}
            >
              ALPH
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: '100%', marginTop: '3rem' }}>
          <Chart data={dataGraph} />
        </Box>
        {/*Selector*/}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            marginInline: 'auto',
            paddingInline: '3rem',
            height: '2rem',
            display: 'flex',
            justifyContent: 'space-around',
            zIndex: 99,
          }}
        >
          {selectedTime?.map((id) => (
            <Button
              key={id}
              onClick={() => handleSelectionTime(id)}
              sx={{
                width: '42px',
                minWidth: 'unset',
                height: '29px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
                backdropFilter: 'blur(3px)',
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
                  color: 'white',
                  fontFamily: 'Poppins',
                }}
              >
                {id}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ height: '50%' }}>
        <Typography
          sx={{
            marginBlock: '0.3125rem',
            marginLeft: '1.25rem',
          }}
          fontSize="0.625rem"
          variant="caption"
        >
          COINS
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            paddingBottom: '4rem',
          }}
        >
          {filteredTokens?.map((coin, index) => {
            return <ItemWallet coin={coin} handleClick={handleClick} key={coin.name + `-${index}`} index={index} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Wallet;
