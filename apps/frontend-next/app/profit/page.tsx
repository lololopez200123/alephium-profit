'use client';
import Chart from '@/components/Common/Chart/Chart';
import { Box, Typography } from '@mui/material';
import { userBalanceAtom } from '@/store/userBalanceAtom';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TokenDetails } from '../../../backend-nest/src/indexer-alephium/interfaces/balance';
import Fuse from 'fuse.js';
import { searchTermAtom } from '@/store/searchAtom';
import ModalFavouritesCoin from '@/components/misc/modalFavouritesCoin/modalFavouritesCoin';
import FavoriteCoinsList from '@/components/Profit/FavoriteCoinsList/FavoriteCoinList';
import TimeSelector from '@/components/Profit/TimeSelector/TimeSelector';
import CoinInfo from '@/components/Profit/CoinInfo/CoinInfo';

export type TokenDetailsWithPNL = TokenDetails & {
  pnl: number;
};

function ProfitCharts() {
  const [balance] = useAtom(userBalanceAtom);
  const favouriteTokens = useMemo(() => balance?.tokens?.filter((token) => token.isFavourite === true) || [], [balance]);
  const [time, setTime] = useState<string | null>(null);
  const [searchTerm] = useAtom(searchTermAtom);

  const getTimeRange = (time: string | null): number => {
    const now = Date.now();
    switch (time) {
      case '1D':
        return now - 24 * 60 * 60 * 1000;
      case '3D':
        return now - 3 * 24 * 60 * 60 * 1000;
      case '1W':
        return now - 7 * 24 * 60 * 60 * 1000;
      case '1M':
        return now - 30 * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  };

  const getAvailableTimeOptions = useCallback((): string[] => {
    if (!balance?.totalFavouriteHistory || balance.totalFavouriteHistory.length === 0) {
      return [];
    }
    const earliestTimestamp = Math.min(...balance.totalFavouriteHistory.map((entry) => entry.timestamp));
    const now = Date.now();

    const options: string[] = [];

    if (earliestTimestamp <= now - 24 * 60 * 60 * 1000) {
      options.push('1D');
    }
    if (earliestTimestamp <= now - 3 * 24 * 60 * 60 * 1000) {
      options.push('3D');
    }
    if (earliestTimestamp <= now - 7 * 24 * 60 * 60 * 1000) {
      options.push('1W');
    }
    if (earliestTimestamp <= now - 30 * 24 * 60 * 60 * 1000) {
      options.push('1M');
    }
    return options;
  }, [balance]);

  const availableTimeOptions = useMemo(() => getAvailableTimeOptions(), [getAvailableTimeOptions]);

  const timeRange = useMemo(() => getTimeRange(time), [time]);

  const calculatePNL = useCallback(
    (token: TokenDetails): number => {
      if (!balance?.totalFavouriteHistory || balance.totalFavouriteHistory.length === 0) {
        return 0;
      }

      const filteredHistory = balance.totalFavouriteHistory.filter((entry) => entry.timestamp >= timeRange).sort((a, b) => a.timestamp - b.timestamp);

      const initialHistory = filteredHistory.find((history) => history.tokens.some((t) => t.name === token.name));
      const reversedHistory = [...filteredHistory].reverse();
      const currentHistory = reversedHistory.find((history) => history.tokens.some((t) => t.name === token.name));

      if (!initialHistory || !currentHistory) {
        return 0;
      }

      const initialToken = initialHistory.tokens.find((t) => t.name === token.name);
      const currentToken = currentHistory.tokens.find((t) => t.name === token.name);

      if (!initialToken || !currentToken) {
        return 0;
      }

      const initialAmount = initialToken.amountOnAlph || 0;
      const currentAmount = currentToken.amountOnAlph || 0;

      const initialValue = initialAmount;
      const currentValue = currentAmount;

      if (initialValue === 0) {
        return 0;
      }

      const pnlPercentage = ((currentValue - initialValue) / initialValue) * 100;
      return pnlPercentage;
    },
    [balance?.totalFavouriteHistory, timeRange]
  );

  const coinWithPNL: TokenDetailsWithPNL[] = useMemo(() => {
    return favouriteTokens.map((token) => ({
      ...token,
      pnl: calculatePNL(token),
    }));
  }, [favouriteTokens, calculatePNL]);

  const [selectCoin, setSelectCoin] = useState<TokenDetailsWithPNL | null>(coinWithPNL[0] ?? null);

  // Graph
  const dataGraph = useMemo(() => {
    if (!selectCoin || !balance?.totalFavouriteHistory) {
      return [0];
    }

    const filteredHistory = balance.totalFavouriteHistory
      .filter((history) => history.timestamp >= timeRange)
      .map((history) => {
        const tokenData = history.tokens.find((token) => token.name === selectCoin.name);
        return {
          timestamp: history.timestamp,
          amountOnAlph: tokenData ? tokenData.amountOnAlph : 0,
        };
      })
      .filter((data) => data.amountOnAlph > 0)
      .sort((a, b) => a.timestamp - b.timestamp); // Asegurar orden ascendente

    const amounts = filteredHistory.map((data) => data.amountOnAlph);

    return amounts.length > 0 ? amounts : [0];
  }, [balance, selectCoin, timeRange]);

  useEffect(() => {
    if (favouriteTokens.length > 0) {
      // If the selected currency is no longer in favorites, select the first available
      if (!favouriteTokens.find((c) => c.name === selectCoin?.name)) {
        setSelectCoin(coinWithPNL[0]);
      }
      const actualCoin = coinWithPNL.find((c) => c.name === selectCoin?.name);
      if (!actualCoin) return;
      setSelectCoin(actualCoin);
    } else {
      setSelectCoin(null);
    }
  }, [favouriteTokens, coinWithPNL, selectCoin]);

  //Select time
  const handleSelectionTime = (selectedTime: string) => {
    setTime((prevTime) => (prevTime === selectedTime ? null : selectedTime));
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
      {balance?.tokens && favouriteTokens.length === 0 && <ModalFavouritesCoin open={true} />}
      <Box
        sx={{
          height: '45%',
          position: 'relative',
        }}
      >
        {/*Graph*/}
        <CoinInfo selectCoin={selectCoin} time={time} />
        <Box sx={{ height: '100%', marginTop: '3rem' }}>
          <Chart data={dataGraph} />
        </Box>
        {/*Selector*/}
        <TimeSelector optionsFiltered={availableTimeOptions} onSelectTime={handleSelectionTime} selectedTime={time} />
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
        <FavoriteCoinsList selectedCoinName={selectCoin?.name} tokens={filteredTokens} handleSelectCoin={handleSelectCoin} />
      </Box>
    </Box>
  );
}

export default ProfitCharts;
