import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function NavBottom() {
  const data = [
    {
      name: 'Home',
      linkImage: '/home.svg',
      alt: 'Home',
    },
    {
      name: 'Graphs',
      linkImage: '/graphs.svg',
      alt: 'Graphs',
    },
    {
      name: 'Wallet',
      linkImage: '/wallet.svg',
      alt: 'Wallet',
    },
    {
      name: 'Notifications',
      linkImage: '/notifications.svg',
      alt: 'Notifications',
    },
    {
      name: 'Profile',
      linkImage: '/profile.svg',
      alt: 'Profile',
    },
  ];
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        paddingY: '7px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        background: 'rgba(11, 20, 38, 0.5)',
        width: '100%',
      }}
    >
      {data.map((data) => {
        return (
          <Box key={data.alt} sx={{ textAlign: 'center' }}>
            <Link href="/">
              <Box
                sx={{
                  marginInline: '20px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  paddingTop: '5px',
                }}
              >
                <Image alt={data.alt} src={data.linkImage} width={22} height={22} />
              </Box>
            </Link>
            <Typography fontSize="0.6rem" variant="caption">
              {data.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default NavBottom;
