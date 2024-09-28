'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';
import ItemPopular from '../itemPopular/ItemPopular';
import { Coin } from '@/app/home/page';
import { useAtom } from 'jotai';
import { loadingScreenAtom } from '@/store/loadingScreenAtom';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  coinData: Coin[];
};

const PopularCoinsList = ({ coinData }: Props) => {
  const [show] = useAtom(loadingScreenAtom);

  const variantsItems = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: show ? 7 + 0.1 : 0.1 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <>
      <Typography sx={{ marginBottom: '0.3125rem', paddingInline: '1.25rem ' }} fontSize="0.625rem" variant="caption">
        COINS
      </Typography>
      <AnimatePresence>
        <Box
          sx={{
            height: '65%',
            minHeight: '15.625rem',
            overflow: 'auto',
            paddingBottom: '4rem',
          }}
          component={motion.div}
          initial={'closed'}
          animate={'open'}
          exit={'closed'}
          variants={variantsItems}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {coinData.map((coin, index) => {
              return <ItemPopular coin={coin} key={index} />;
            })}
          </Box>
        </Box>
      </AnimatePresence>
    </>
  );
};

export default PopularCoinsList;
