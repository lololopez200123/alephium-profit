import { Avatar, Box, Typography } from '@mui/material';
import { userInfoStyles } from './UserInfo.styles'; // Asegúrate de importar los estilos

interface UserInfoProps {
  user: { name: string | undefined } | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const initials =
    user?.name
      ?.split(' ')
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('') ?? 'W';

  return (
    <Box sx={userInfoStyles.container}>
      <Avatar sx={userInfoStyles.avatar}>
        <Typography sx={userInfoStyles.initials}>{initials}</Typography>
      </Avatar>
      <Box sx={userInfoStyles.infoContainer}>
        <Typography sx={userInfoStyles.name}>{user?.name ?? 'WELCOME'}</Typography>
        <Typography sx={userInfoStyles.memberSince}>Member since | 2024</Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;
