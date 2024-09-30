'use client';
import { Box } from '@mui/material';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/userAtom';
import { useState } from 'react';
import ModalDisconnect from '@/components/misc/modalDisconnect/modalDisconnect';
import UserInfo from '@/components/Profile/UserInfo/UserInfo';
import LogoutProfile from '@/components/Profile/LogoutProfile/LogoutProfile';

function Profile() {
  const [user] = useAtom(userAtom);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModal = () => setOpenModal(true);

  return (
    <Box
      sx={{
        display: 'flex',
        paddingBlock: '1.25rem',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        paddingX: '1rem',
        overflowX: 'hidden',
      }}
    >
      <UserInfo user={user} />
      <LogoutProfile onClick={handleModal} />
      <ModalDisconnect name={user?.name} setOpenModal={setOpenModal} open={openModal} />
    </Box>
  );
}

export default Profile;
