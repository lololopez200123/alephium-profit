import Image from 'next/image';
import { TokenDetails } from '../../../backend-nest/src/indexer-alephium/interfaces/balance';
import { Box, Typography } from '@mui/material';

type Props = {
  index: number;
  handleSelectCoin: (coin: TokenDetails) => void;
  item: TokenDetails;
};

const ItemFavourites = ({ index, handleSelectCoin, item }: Props) => {
  return (
    <Box
      key={index}
      onClick={() => handleSelectCoin(item)}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '10px',
        height: '48px',
        marginBlock: '.5rem',
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
          <Image width="16" height="16" alt={item.name} src={item.logo} />
        </Box>
        <Typography
          variant="subtitle2"
          sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '20ch' }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            paddingLeft: '.9rem',
            fontSize: '0.625rem',
            color: item?.percent <= 0 ? 'rgba(226, 66, 66, 1)' : 'rgba(40, 231, 197, 1)',
          }}
        >
          {item.percent} %
        </Typography>
      </Box>
      {/* Data section */}
      <Box
        sx={{
          width: '25%',
          display: 'flex',
          alignItems: 'left',
          flexDirection: 'column',
          marginInline: '3%',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1">{item.amount}</Typography>
        <Typography fontSize="0.625rem" variant="caption">
          {item.amountOnAlph} ALPH
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemFavourites;
