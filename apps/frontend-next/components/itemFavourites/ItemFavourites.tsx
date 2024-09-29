import Image from 'next/image';
import { TokenDetails } from '../../../backend-nest/src/indexer-alephium/interfaces/balance';
import { Box, Typography } from '@mui/material';
import formatPNLvalue from '@/utils/formatPnl';
import { motion } from 'framer-motion';

type TokenDetailsWithPNL = TokenDetails & {
  pnl: number;
};

type Props = {
  index: number;
  handleSelectCoin: (coin: TokenDetailsWithPNL) => void;
  item: TokenDetailsWithPNL;
  isSelected: boolean;
};

const ItemFavourites = ({ index, handleSelectCoin, item, isSelected }: Props) => {
  const formattedPNL = formatPNLvalue(item.pnl);

  return (
    <Box
      component={motion.div}
      whileTap={{ scale: 0.98 }}
      key={index}
      onClick={() => handleSelectCoin(item)}
      sx={{
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'space-between',
        borderRadius: '10px',
        height: '48px',
        marginBlock: '.5rem',
        background: isSelected ? 'rgba(40, 231, 197, 0.15)' : 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)',
        border: isSelected ? '0.5px solid rgba(40, 231, 197, 1)' : 'none',
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
            overflow: 'hidden',
          }}
        >
          <Image width="25" height="25" alt="1" src={item.logo} />
        </Box>
        <Typography
          variant="subtitle2"
          sx={{ textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '15ch' }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            paddingLeft: '.9rem',
            fontSize: '0.625rem',
            color: item?.pnl <= 0 ? 'rgba(226, 66, 66, 1)' : 'rgba(40, 231, 197, 1)',
          }}
        >
          {formattedPNL}
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
        <Typography fontSize="0.625rem" variant="caption" color={'rgba(40, 231, 197, 1)'}>
          {item.amountOnAlph} ALPH
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemFavourites;
