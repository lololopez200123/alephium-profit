'use client';

import { Coin } from '@/app/home/page';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { itemPopularStyles } from './ItemPopular.styles';

type Props = {
  coin: Coin;
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const ItemPopular = ({ coin }: Props) => {
  return (
    <Box variants={variants} component={motion.div} whileTap={{ scale: 0.95 }} key={coin?.price} sx={itemPopularStyles.container}>
      <Box sx={itemPopularStyles.leftSection}>
        <Box sx={itemPopularStyles.logoContainer}>
          <Image width="18" height="18" alt="1" src={coin.logo}></Image>
        </Box>
        <Typography variant="subtitle2" key={coin?.name}>
          {coin?.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            ...itemPopularStyles.priceChange,
            color: coin?.priceChange <= 0 ? 'rgba(226, 66, 66, 1)' : 'rgba(40, 231, 197, 1)',
          }}
        >
          {coin.priceChange}%
        </Typography>
      </Box>
      <Box sx={itemPopularStyles.rightSection}>
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
