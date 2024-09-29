import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useConnect } from '@alephium/web3-react';
import nookies from 'nookies';
import React from 'react';
import Image from 'next/image';

type ModalDisconnectProps = {
  name: string | undefined;
  setOpenModal: (value: boolean) => void;
  open: boolean;
};

const ModalDisconnect = ({ name, setOpenModal, open }: ModalDisconnectProps) => {
  const router = useRouter();
  const { disconnect } = useConnect();

  const handleNavigate = () => {
    router.push('/home');
  };

  const handleDisconnect = () => {
    localStorage.clear();
    nookies.destroy(null, 'jwt', { path: '/' });
    disconnect();
    setOpenModal(false);
    handleNavigate();
  };

  return (
    <Modal
      open={open}
      sx={{
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
          position: 'relative',
        }}
      >
        <IconButton sx={{ position: 'absolute', right: 0, top: 0, padding: '10px' }} onClick={() => setOpenModal(false)}>
          <Image alt="close" src="/close-modal.svg" width="8" height="8" />
        </IconButton>
        <Box
          sx={{
            height: '12%',
            width: '9.375rem',
            textAlign: 'center',
            marginInline: 'auto',
            borderBottom: '1px solid rgba(255, 255, 255, 1) ',
            paddingBottom: '2.5rem',
            position: 'relative',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.25rem' }}>{name}</Typography>:
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
            Are you sure you want to disconnect your wallet?
          </Typography>
        </Box>
        <Box sx={{ height: '31%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onClick={() => {
              handleDisconnect();
            }}
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
            Disconnect
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDisconnect;
