'use client';
import { Box, Typography } from '@mui/material';

function Notfications() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingX: '1rem',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Typography paddingBottom={'4rem'} color={'rgba(40, 231, 197, 1)'}>
        Coming Soon
      </Typography>
    </Box>
  );
}

export default Notfications;
