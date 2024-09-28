import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const ModalFavouritesCoin = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/wallet');
  };
  return (
    <Box
      sx={{
        position: 'fixed',
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
            borderBottom: '1px solid #28E7C5 ',
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
            Select a favorite coin from your wallet to create your new performance chart
          </Typography>
        </Box>
        <Box sx={{ height: '31%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onClick={handleNavigate}
            sx={{
              width: '150px',
              color: 'white',
              textTransform: 'none',
              paddingInline: '1rem',
              height: '30px',
              background: 'linear-gradient(90deg, #28E7C5 0%, #6942E2 100%)',
              borderRadius: '41px',
              fontSize: { xs: '12px', sm: '14px' },
            }}
          >
            Enter Wallet
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalFavouritesCoin;
