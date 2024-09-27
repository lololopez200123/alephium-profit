'use client';
import Chart from '@/components/Chart';
import { Box, Button, Typography } from '@mui/material';
import { userBalanceAtom } from '@/store/userBalanceAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { TokenDetails } from '../../../backend-nest/src/indexer-alephium/interfaces/balance';
import ItemFavourites from '@/components/itemFavourites/ItemFavourites';

const FIRST_COIN: TokenDetails = {
  name: 'Coin',
  amount: 0,
  amountOnAlph: 0,
  logo: '',
  percent: 0,
  isFavourite: false,
};

const selectedTime = ['1D', '1W', '1M', '1Y'];

function ProfitCharts() {
  const [balance] = useAtom(userBalanceAtom);
  const [time, setTime] = useState<string | null>(null);
  const [selectCoin, setSelectCoin] = useState<TokenDetails | null>(FIRST_COIN);

  const coin = balance?.tokens?.filter((token) => token.isFavourite === true) || [];
  const dataGraph = [...(balance?.totalHistory.map((item) => item.totalAmount) || [0, 0]), balance?.totalAmount ?? 0];

  const handleSelectionTime = (time: string) => {
    setTime(time);
  };

  const handleSelectCoin = (item: TokenDetails) => {
    setSelectCoin(item);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        paddingBlock: '1.25rem',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        paddingX: '1rem',
        overflowX: 'hidden',
      }}
    >
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
                color: selectCoin?.percent !== undefined && selectCoin?.percent <= 0 ? 'rgba(226, 66, 66, 1)' : 'rgba(40, 231, 197, 1)',
              }}
            >
              {selectCoin?.percent}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.625rem',
              paddingLeft: '1%',
            }}
          >
            Yesterday pnl
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
      <Box
        sx={{
          height: '45%',
          minHeight: '15.625rem',
          overflowY: 'auto',
          paddingBottom: '4rem',
        }}
      >
        {/*Favorite Coins */}
        <Box sx={{}}>
          <Box sx={{ height: '100%' }}>
            {coin?.map((item, index) => (
              <ItemFavourites key={index} item={item} handleSelectCoin={handleSelectCoin} index={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfitCharts;
