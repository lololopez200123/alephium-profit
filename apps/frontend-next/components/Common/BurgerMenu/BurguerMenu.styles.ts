// BurgerMenu.styles.ts
import { SxProps } from '@mui/material';

export const menuBox: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: '9%',
};

export const menuItemBox: SxProps = {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '5%',
};

export const textItem: SxProps = {
  textAlign: 'end',
  width: '70%',
  fontFamily: 'Poppins',
  fontSize: '1.125rem',
  color: 'white',
};

export const itemIconBox: SxProps = {
  width: '30%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: '8%',
};

export const modalStyles: SxProps = {
  width: '100%',
  maxWidth: '450px',
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: 'rgba(11, 20, 38, 0.3)',
  backdropFilter: 'blur(2px)',
  borderRadius: '5px',
  zIndex: 999,
};

export const modalContentStyles: SxProps = {
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
};

export const headerStyles: SxProps = {
  width: '100%',
  height: '69px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginRight: '20%',
};

export const separatorStyles: SxProps = {
  width: '70%',
  borderBottom: '1px solid rgba(255, 255, 255)',
  right: '0',
  borderRadius: '2px',
  marginRight: '10%',
  marginLeft: '20%',
};

export const lastMenuItemStyles: SxProps = {
  width: '70%',
  marginTop: 'auto',
  borderBottom: '1px solid rgba(255, 255, 255)',
  right: '0',
  borderRadius: '2px',
  marginRight: '10%',
  marginLeft: '20%',
};

export const lastMenuBoxStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

export const lastMenuItemContentStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  paddingBlock: '2%',
};
