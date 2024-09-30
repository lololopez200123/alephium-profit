'use client';
import { loadingScreenAtom } from '@/store/loadingScreenAtom';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';
import { heroHomeStyles } from './Herohome.styles';

const HeroHome = () => {
  const [show] = useAtom(loadingScreenAtom);

  return (
    <Box sx={heroHomeStyles.container}>
      <Box
        sx={heroHomeStyles.logoContainer}
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
        sx={heroHomeStyles.textContainer}
      >
        <Typography variant="h4" sx={heroHomeStyles.headingText}>
          <p>Monitor your</p>
          <p>
            <span style={heroHomeStyles.gradientText}>performance</span> like
          </p>
          <p>never before</p>
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroHome;
