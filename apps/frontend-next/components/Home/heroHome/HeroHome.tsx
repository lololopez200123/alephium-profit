'use client';
import { loadingScreenAtom } from '@/store/loadingScreenAtom';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';

const HeroHome = () => {
  const [show] = useAtom(loadingScreenAtom);

  return (
    <Box
      sx={{
        height: '45%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          left: '0',
          marginBottom: '5%',
          marginInline: '2px',
        }}
        component={motion.div}
        animate={{
          opacity: [0, 1],
          y: [40, 0],
          transition: {
            delay: show ? 7 : 0,
            duration: 1,
            ease: 'easeInOut',
          },
        }}
      >
        <Image width="140" height="44" src="/main-logo.svg" alt="logo"></Image>
      </Box>
      <Box
        component={motion.div}
        animate={{
          opacity: [0, 1],
          y: [40, 0],
          transition: {
            delay: show ? 7.5 : 0,
            duration: 1,
            ease: 'easeInOut',
          },
        }}
        sx={{
          marginBottom: '32%',
          position: 'relative',
          left: 'clamp(.5rem,4.26%,1%)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: '2rem',
            fontWeight: '500',
          }}
        >
          <p>Monitor your</p>
          <p>
            <span
              style={{
                backgroundImage: 'linear-gradient(147.7deg, #6942E2 19.37%, #28E7C5 77.65%)',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextStrokeWidth: 'thin',
              }}
            >
              performance
            </span>{' '}
            like
          </p>
          <p>never before</p>
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroHome;
