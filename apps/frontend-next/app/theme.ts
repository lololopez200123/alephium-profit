'use client';
import { createTheme } from '@mui/material/styles';

const themeConfig = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#28E7C5',
    },
    secondary: {
      main: '#6942E2',
    },
    text: {
      primary: '#FEFEFC',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#0B1426',
    },
  },
});

export default themeConfig;
