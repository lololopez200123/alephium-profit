import { SxProps } from '@mui/material';

export const userInfoStyles: {
  container: SxProps;
  avatar: SxProps;
  initials: SxProps;
  infoContainer: SxProps;
  name: SxProps;
  memberSince: SxProps;
} = {
  container: {
    height: '45%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '12%',
  },
  avatar: {
    width: 80,
    height: 80,
    background: 'rgba(40, 231, 197, 1)',
  },
  initials: {
    fontSize: '40px',
    color: 'rgba(255, 255, 255, 1)',
  },
  infoContainer: {
    paddingBlock: '0.625rem',
    textAlign: 'center',
  },
  name: {
    fontSize: { xs: '.937rem' },
    fontWeight: 500,
    color: 'white',
  },
  memberSince: {
    fontSize: '.5rem',
    fontWeight: 400,
    color: 'rgba(40, 231, 197, 1)',
    paddingTop: '0.3125rem',
  },
};
