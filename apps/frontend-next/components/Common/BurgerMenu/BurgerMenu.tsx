'use client';
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/userAtom';
import { useState } from 'react';
import ModalDisconnect from '@/components/misc/modalDisconnect/modalDisconnect';
import {
  menuBox,
  menuItemBox,
  textItem,
  itemIconBox,
  modalStyles,
  modalContentStyles,
  headerStyles,
  separatorStyles,
  lastMenuItemStyles,
  lastMenuBoxStyles,
  lastMenuItemContentStyles,
} from './BurguerMenu.styles';

const menuItems = [
  {
    name: 'Profile',
    iconSrc: '/profile-menu.svg',
    route: '/profile',
  },
];

const lastMenuItem = {
  name: 'Log out',
  iconSrc: '/rocket-menu.svg',
};

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [user] = useAtom(userAtom);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={isOpen ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        <Image alt="menu" width={32} height={32} src="menu.svg" />
      </Button>
      <Modal onClose={handleClose} open={isOpen} aria-labelledby="Menu" aria-describedby="Burguer Menu" sx={modalStyles}>
        <Box sx={modalContentStyles}>
          <Box sx={headerStyles}>
            <Typography fontSize={'1.25rem'} color="white" variant="h4">
              {user?.name ?? ''}
            </Typography>
          </Box>
          <Box sx={separatorStyles}></Box>
          {/* Rendering of menu items*/}
          <Box sx={menuBox}>
            {menuItems.map((item, id) => (
              <Link key={id} href={item.route} onClick={() => handleClose()} className="menu-item">
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
          <Box className="menu-item" sx={lastMenuItemStyles}></Box>
          <Box
            onClick={() => {
              handleClose();
              handleModal();
            }}
            sx={lastMenuBoxStyles}
          >
            <Box sx={lastMenuItemContentStyles}>
              <Typography sx={textItem}>{lastMenuItem.name}</Typography>
              <Box sx={itemIconBox}>
                <Image alt={lastMenuItem.name} width={24} height={24} src={lastMenuItem.iconSrc} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <ModalDisconnect name={user?.name} setOpenModal={setOpenModal} open={openModal} />
    </Box>
  );
};

export default BurgerMenu;
