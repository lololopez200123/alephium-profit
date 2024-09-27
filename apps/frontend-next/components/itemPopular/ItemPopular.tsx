import { Coin } from '@/app/home/page';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

type Props = {
  coin: Coin;
};

const ItemPopular = ({ coin }: Props) => {
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
};

export default ItemPopular;
