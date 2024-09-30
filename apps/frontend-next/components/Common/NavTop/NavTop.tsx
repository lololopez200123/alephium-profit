'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ButtonConnectWallet from '../ButtonConnectWallet/ButtonConnectWallet';
import { useWallet } from '@alephium/web3-react';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/userAtom';
import { generateSign, getMyBalance, getMyInfo } from '@/services/api';
import { userBalanceAtom } from '@/store/userBalanceAtom';
import SearchItemsInput from '../../misc/SearchItemsInput';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

interface Token {
  name: string;
  amount: number;
  amountOnAlph: number;
  logo: string;
  percent: number;
  isFavourite: boolean;
}

function NavTop() {
  const pathname = usePathname();
  const { connectionStatus, account } = useWallet();
  const [, setUser] = useAtom(userAtom);
  const [, setBalance] = useAtom(userBalanceAtom);

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (connectionStatus !== 'connected') return;
    generateSign(account.address, 'public-key').then((res) => {
      localStorage.setItem('jwt', res.jwt);
      getMyInfo().then((data) => {
        setUser(data);
      });

      getMyBalance().then((data) => {
        const tokens = data.tokens
          .map((coin: Token) => {
            return {
              ...coin,
              percent: parseFloat(coin.percent.toFixed(0)),
              amount: parseFloat(coin.amount.toFixed(2)),
              amountOnAlph: parseFloat(coin.amountOnAlph.toFixed(4)),
            };
          })
          .sort((a: Token, b: Token) => b.percent - a.percent);

        setBalance({ ...data, tokens });
      });
    });
  }, [connectionStatus, account, setUser, setBalance]);

  const isHome = currentPath === '/home';
  const getHeaderTitle = () => {
    switch (currentPath) {
      case '/home':
        return 'Overview';
      case '/profit':
        return 'Profit Charts';
      case '/wallet':
        return 'Wallet';
      case '/notifications':
        return 'Notifications';
      case '/profile':
        return 'Profile';
      default:
        return '';
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        heigth: '90px',
        zIndex: 2,
        height: 'auto',
        top: 0,
        paddingY: '7px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(11, 20, 38, 0.8)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxHeight: '70px',
          paddingY: '7px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src="/profit-logo.svg" alt="Profit Icon" width={32} height={32}></Image>
        </Box>
        <Box
          sx={{
            width: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!isHome ? <SearchItemsInput /> : <ButtonConnectWallet />}
        </Box>
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BurgerMenu />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          height: '20px',
        }}
      >
        <Typography sx={{ textTransform: 'uppercase', fontSize: '0.8125rem' }}>{getHeaderTitle()}</Typography>
      </Box>
    </Box>
  );
}

export default NavTop;
