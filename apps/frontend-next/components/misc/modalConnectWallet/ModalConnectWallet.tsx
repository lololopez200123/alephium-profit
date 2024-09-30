'use client';
import ButtonConnectWallet from '@/components/Common/ButtonConnectWallet/ButtonConnectWallet';
import { useWallet } from '@alephium/web3-react';
import { Box, Modal, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PRIVATE_ROUTES = ['/wallet', '/profit', '/profile', 'notifications'];

const ModalConnectWallet = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { connectionStatus } = useWallet();
  const path = usePathname();

  const handleClose = () => {
    setOpen(false);
    router.push('/');
  };

  useEffect(() => {
    if (connectionStatus !== 'connected' && PRIVATE_ROUTES.includes(path)) {
      setOpen(true);
    }
    return () => {
      setOpen(false);
    };
  }, [connectionStatus, path]);

  return (
    <Modal
      keepMounted
      onClose={handleClose}
      open={open}
      sx={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(11, 20, 38, 0.8)',
          padding: '1rem',
          borderRadius: '8px',
          width: '226px',
          height: '100%',
          maxHeight: '280px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            height: '12%',
            width: '9.375rem',
            textAlign: 'center',
            marginInline: 'auto',
            borderBottom: '1px solid white ',
            paddingBottom: '2.5rem',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.25rem' }}>Important</Typography>
        </Box>
        <Box sx={{ heigth: '57%', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{
              width: '9.875rem',
              fontSize: '0.9375rem',
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            Remember to connect your wallet to continue.
          </Typography>
        </Box>
        <Box sx={{ height: '31%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonConnectWallet />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConnectWallet;
