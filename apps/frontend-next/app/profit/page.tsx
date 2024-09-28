'use client';
import Chart from '@/components/Chart';
import { Box, Button, Typography } from '@mui/material';
import { userBalanceAtom } from '@/store/userBalanceAtom';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TokenDetails } from '../../../backend-nest/src/indexer-alephium/interfaces/balance';
import ItemFavourites from '@/components/itemFavourites/ItemFavourites';
import ModalFavouritesCoin from '@/components/modalFavouritesCoin/modalFavouritesCoin';
import formatPNLvalue from '@/utils/formatPnl';
import Fuse from 'fuse.js';
import { searchTermAtom } from '@/store/searchAtom';

const selectedTime = ['1D', '1W', '1M', '1Y'];

type TokenDetailsWithPNL = TokenDetails & {
  pnl: number;
};

function ProfitCharts() {
  const [balance] = useAtom(userBalanceAtom);
  const coin = useMemo(() => balance?.tokens?.filter((token) => token.isFavourite === true) || [], [balance]);
  const [time, setTime] = useState<string | null>(null);
  const [searchTerm] = useAtom(searchTermAtom);

  const calculatePNL = useCallback(
    (token: TokenDetails): number => {
      if (!balance?.totalFavouriteHistory || balance.totalFavouriteHistory.length === 0) {
        return 0;
      }

      // Ordenar el historial por timestamp ascendente
      const sortedHistory = [...balance.totalFavouriteHistory].sort((a, b) => a.timestamp - b.timestamp);

      // Obtener el historial inicial y actual
      const initialHistory = sortedHistory[0];
      const currentHistory = sortedHistory[sortedHistory.length - 1];

      // Encontrar los datos del token en los históricos
      const initialToken = initialHistory.tokens.find((t) => t.name === token.name);
      const currentToken = currentHistory.tokens.find((t) => t.name === token.name);

      const initialAmount = initialToken ? initialToken.amountOnAlph : 0;
      const currentAmount = currentToken ? currentToken.amountOnAlph : 0;

      // Calcular el PNL
      const pnl = currentAmount - initialAmount;

      return pnl;
    },
    [balance?.totalFavouriteHistory]
  );

  // Agregar PNL a cada token favorito
  const coinWithPNL: TokenDetailsWithPNL[] = useMemo(() => {
    return coin.map((token) => ({
      ...token,
      pnl: calculatePNL(token),
    }));
  }, [coin, calculatePNL]);

  const [selectCoin, setSelectCoin] = useState<TokenDetailsWithPNL | null>(coinWithPNL[0] ?? null);

  // Graph
  const dataGraph = useMemo(() => {
    if (!selectCoin || !balance?.totalFavouriteHistory) {
      return [0];
    }

    const filteredHistory = balance.totalFavouriteHistory
      .map((history) => {
        const tokenData = history.tokens.find((token) => token.name === selectCoin.name);
        return {
          timestamp: history.timestamp,
          amountOnAlph: tokenData ? tokenData.amountOnAlph : 0,
        };
      })
      .filter((data) => data.amountOnAlph > 0);

    const sortedHistory = filteredHistory.sort((a, b) => a.timestamp - b.timestamp);

    const amounts = sortedHistory.map((data) => data.amountOnAlph);

    return amounts.length > 0 ? amounts : [0];
  }, [balance, selectCoin]);

  useEffect(() => {
    if (coin.length > 0) {
      // If the selected currency is no longer in favorites, select the first available
      if (!coin.find((c) => c.name === selectCoin?.name)) {
        setSelectCoin(coinWithPNL[0]);
      }
    } else {
      setSelectCoin(null);
    }
  }, [coin, coinWithPNL, selectCoin]);

  //Select time
  const handleSelectionTime = (time: string) => {
    setTime(time);
  };

  //Select coin
  const handleSelectCoin = (item: TokenDetailsWithPNL) => {
    setSelectCoin(item);
  };

  const fuse = useMemo(() => {
    if (!coinWithPNL) return null;
    return new Fuse(coinWithPNL, {
      keys: ['name'],
      threshold: 0.3,
    });
  }, [coinWithPNL]);

  const filteredTokens = useMemo(() => {
    if (!fuse || !searchTerm) return coinWithPNL || [];
    const results = fuse.search(searchTerm);
    return results.map((result) => result.item);
  }, [fuse, searchTerm, coinWithPNL]);

  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '1.25rem',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100vh - 100px)',
        paddingX: 'clamp(.5rem,4.26%,1rem)',
        overflowX: 'hidden',
      }}
    >
      {balance?.tokens && coin.length === 0 && <ModalFavouritesCoin />}
      <Box
        sx={{
          height: '45%',
          position: 'relative',
        }}
      >
        {/*Graph*/}
        <Box
          sx={{
            height: '100%',
            position: 'absolute',
            width: '100%',
            zIndex: 2,
          }}
        >
          <Typography sx={{ fontSize: '0.9375rem', textTransform: 'uppercase' }}>{selectCoin?.name}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'baseline',
            }}
          >
            <Typography sx={{ fontSize: '2.5rem' }}>{selectCoin?.amount}</Typography>
            <Typography
              sx={{
                fontSize: '0.9375rem',
                paddingLeft: '1%',
                color: selectCoin?.pnl !== undefined && selectCoin?.pnl <= 0 ? 'rgba(226, 66, 66, 1)' : 'rgba(40, 231, 197, 1)',
              }}
            >
              {selectCoin?.pnl && formatPNLvalue(selectCoin?.pnl)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.625rem',
              paddingLeft: '1%',
            }}
          >
            Total PNL
          </Typography>
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

      <Box
        sx={{
          height: '45%',
          minHeight: '15.625rem',
        }}
      >
        <Typography
          sx={{
            marginBlock: '0.3125rem',
            marginLeft: '1.25rem',
          }}
          fontSize="0.625rem"
          variant="caption"
        >
          MY GRAPHS
        </Typography>
        {/*Favorite Coins */}
        <Box sx={{ overflowY: 'auto', paddingBottom: '4rem' }}>
          <Box sx={{ height: '100%' }}>
            {filteredTokens?.map((item, index) => (
              <ItemFavourites key={index} item={item} handleSelectCoin={handleSelectCoin} index={index} isSelected={selectCoin?.name === item.name} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfitCharts;
