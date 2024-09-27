'use client';
import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/userAtom';

const menuBox = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: '12%',
};
const menuItemBox = {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '5%',
};
const textItem = {
  textAlign: 'end',
  width: '70%',
  fontFamily: 'Poppins',
  fontSize: '1.25rem',
  paddingRight: '3%',
  color: 'white',
};
const itemIconBox = {
  width: '30%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: '8%',
};

const menuItems = [
  {
    name: 'Profile',
    iconSrc: '/profile-menu.svg',
    route: '/profile',
  },
];

const lastMenuItem = {
  name: 'log out',
  iconSrc: '/rocket-menu.svg',
  route: './',
};

const BurgerMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user] = useAtom(userAtom);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button id="basic-button" aria-controls={open ? 'menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        <Image alt="menu" width={32} height={32} src="menu.svg" />
      </Button>
      <Modal
        onClose={handleClose}
        open={open}
        aria-labelledby="Menu"
        aria-describedby="Burguer Menu"
        sx={{
          width: '100%',
          maxWidth: '450px',
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'rgba(11, 20, 38, 0.3)',
          backdropFilter: 'blur(2px)',
          borderRadius: '5px',
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '80%',
            maxWidth: '242px',
            background: 'rgba(11, 20, 38, 0.8)',
            backdropFilter: 'blur(2px)',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '400px',
            height: '100%',
            animation: 'slideIn 0.6s ease-in-out',
            paddingBottom: '30px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '69px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginRight: '20%',
            }}
          >
            <Typography fontSize={'1.25rem'} color="white" variant="h4">
              {user?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '70%',
              borderBottom: '2px solid rgba(255, 255, 255)',
              right: '0',
              borderRadius: '2px',
              marginRight: '10%',
              marginLeft: '20%',
            }}
          ></Box>
          {/* Rendering of menu items*/}
          <Box sx={menuBox}>
            {menuItems.map((item, id) => (
              <Link key={id} href={item.route}>
                <Box sx={menuItemBox}>
                  <Typography sx={textItem}>{item.name}</Typography>
                  <Box sx={itemIconBox}>
                    <Image alt={item.name} width={24} height={24} src={item.iconSrc} />
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
          {/* Separator and last menu item */}
          <Box
            sx={{
              width: '70%',
              marginTop: 'auto',
              borderBottom: '2px solid rgba(255, 255, 255)',
              right: '0',
              borderRadius: '2px',
              marginRight: '10%',
              marginLeft: '20%',
            }}
          ></Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Link
              href={{
                pathname: lastMenuItem.route,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingBlock: '2%',
                }}
              >
                <Typography sx={textItem}>{lastMenuItem.name}</Typography>
                <Box sx={itemIconBox}>
                  <Image alt={lastMenuItem.name} width={24} height={24} src={lastMenuItem.iconSrc} />
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BurgerMenu;
