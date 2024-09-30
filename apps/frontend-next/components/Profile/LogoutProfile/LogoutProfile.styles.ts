// LogoutProfile.styles.ts
import { SxProps } from '@mui/material';

export const logoutProfileStyles: {
  container: SxProps;
  button: SxProps;
  text: SxProps;
  iconContainer: SxProps;
} = {
  container: {
    height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    maxWidth: '450px',
    paddingBottom: '1.25rem',
  },
  button: {
    paddingBlock: '6%',
    textTransform: 'none',
    textDecorationLine: 'underline',
    fontSize: '1.25rem',
  },
  text: {
    color: 'rgba(40, 231, 197, 1)',
    fontFamily: 'Poppins',
    paddingLeft: '.5rem',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0.5rem',
  },
};
