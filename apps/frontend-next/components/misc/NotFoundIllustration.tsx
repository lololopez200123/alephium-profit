import React from 'react';
import { Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundIllustration = () => {
  return (
    <Box
      sx={{
        fontSize: 120,
        color: 'primary.main',
        mb: 2,
        animation: 'bounce 2s infinite',
        '@keyframes bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-30px)',
          },
          '60%': {
            transform: 'translateY(-15px)',
          },
        },
      }}
    >
      <ErrorOutlineIcon fontSize="inherit" />
    </Box>
  );
};

export default NotFoundIllustration;