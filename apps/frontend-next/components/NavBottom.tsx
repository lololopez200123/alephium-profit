'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function NavBottom() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');
  const data = [
    {
      name: 'Home',
      linkImage: '/home.svg',
      linkImageSelected: '/home-selected.svg',
      alt: 'Home',
      href: '/home',
    },
    {
      name: 'Graphs',
      linkImage: '/graphs.svg',
      linkImageSelected: '/graphs-selected.svg',
      alt: 'Graphs',
      href: '/profit',
    },
    {
      name: 'Wallet',
      linkImage: '/wallet.svg',
      linkImageSelected: '/wallet-selected.svg',
      alt: 'Wallet',
      href: '/wallet',
    },
    {
      name: 'Notifications',
      linkImage: '/notifications.svg',
      linkImageSelected: '/notifications.svg',
      alt: 'Notifications',
      href: '/empty',
    },
    {
      name: 'Profile',
      linkImage: '/profile.svg',
      linkImageSelected: '/profile.svg',
      alt: 'Profile',
      href: '/empty',
    },
  ];

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <Box
      sx={{
        position: 'absolute',
        height: '10%',
        maxHeight: '70px',
        bottom: '0',
        left: '0',
        paddingY: '7px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backdropFilter: 'blur(10px)',
        background: 'rgba(11, 20, 38, 0.5)',
        width: '100%',
      }}
    >
      {data.map((item) => (
        <Box key={item.alt} sx={{ textAlign: 'center' }}>
          {item.href === '/empty' ? (
            <Box
              sx={{
                marginInline: '20px',
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                paddingTop: '5px',
              }}
            >
              <Image alt={item.alt} src={item.linkImage} width={22} height={22} />
            </Box>
          ) : (
            <Link href={item.href}>
              <Box
                sx={{
                  marginInline: '20px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  paddingTop: '5px',
                  background: currentPath === item.href ? '#28E7C5' : 'transparent',
                }}
              >
                <Image alt={item.alt} src={currentPath === item.href ? item.linkImageSelected : item.linkImage} width={22} height={22} />
              </Box>
            </Link>
          )}
          <Typography fontSize="0.6rem" variant="caption">
            {item.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default NavBottom;
