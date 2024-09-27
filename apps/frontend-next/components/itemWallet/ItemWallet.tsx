import { TokenDetails } from '../../../backend-nest/src/indexer-alephium/interfaces/balance';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';

type Props = {
  coin: TokenDetails;
  handleClick: (index: number) => void;
  index: number;
};

const ItemWallet = ({ coin, index, handleClick }: Props) => {
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
          <Image width="18" height="18" alt={coin.logo} src={coin.isFavourite ? '/star-selected.svg' : '/star.svg'}></Image>
        </Button>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginInline: '25%',
          }}
        >
          <Typography
            variant="subtitle2"
            fontSize="0.725rem"
            key={coin.name}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '20ch',
            }}
          >
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
          position: 'relative',
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
};

export default ItemWallet;
