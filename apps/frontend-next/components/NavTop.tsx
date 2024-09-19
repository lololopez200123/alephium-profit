'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import BurgerMenu from './BurgerMenu';
import { usePathname } from 'next/navigation';
import ButtonConnectWallet from './ButtonConnectWallet';

function NavTop() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);
  const isHome = currentPath === '/home';
  return isHome ? (
    <Box
      sx={{
        width: '100%',
        height: '10%',
        maxHeight: '70px',
        position: 'absolute',
        top: 0,
        paddingY: '7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src="/profit-logo.svg" alt="Profit Icon" width={32} height={32}></Image>
      </Box>
      <ButtonConnectWallet />
      <BurgerMenu />
    </Box>
  ) : (
    <Box
      sx={{
        width: '100%',
        height: '10%',
        maxHeight: '70px',
        position: 'absolute',
        top: 0,
        paddingY: '7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src="/profit-logo.svg" alt="Profit Icon" width={32} height={32}></Image>
      </Box>
      <Box
        sx={{
          width: ' 226px',
          height: '32px',
          background: 'linear-gradient(180deg, rgba(40, 231, 197, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)',
          borderRadius: '19px',
        }}
      ></Box>
      <BurgerMenu />
    </Box>
  );
}

export default NavTop;
