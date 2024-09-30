import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { logoutProfileStyles } from './LogoutProfile.styles';

interface LogoutProfileProps {
  onClick: () => void;
}

const LogoutProfile = ({ onClick }: LogoutProfileProps) => {
  return (
    <Box sx={logoutProfileStyles.container}>
      <Button sx={logoutProfileStyles.button} onClick={onClick}>
        <Typography sx={logoutProfileStyles.text}>Log out</Typography>
        <Box sx={logoutProfileStyles.iconContainer}>
          <Image alt="log out" width={24} height={24} src="/rocket-color.svg" />
        </Box>
      </Button>
    </Box>
  );
};

export default LogoutProfile;
