import React from 'react';
import { Box, Typography } from '@mui/material';
import formatPNLvalue from '@/utils/formatPnl';
import { TokenDetailsWithPNL } from '@/app/profit/page';

type CoinInfoProps = {
  selectCoin: TokenDetailsWithPNL | null;
  time: string | null;
};

const CoinInfo: React.FC<CoinInfoProps> = ({ selectCoin, time }) => {
  const getDescriptionPNLTime = (timeRange: string | null) => {
    switch (timeRange) {
      case '1D':
        return 'Day PNL';
      case '3D':
        return '3 Days PNL';
      case '1W':
        return 'Week PNL';
      case '1M':
        return 'Month PNL';
      default:
        return 'Total PNL';
    }
  };

  return (
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
          key={`value-pnl-for-${time ?? 'total'}`}
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
        {getDescriptionPNLTime(time)}
      </Typography>
    </Box>
  );
};

export default CoinInfo;
