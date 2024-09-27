import { Box } from '@mui/material';

const styleContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginInline: 'auto',
  height: '100vh',
  width: '100%',
  backgroundColor: '#0b1426',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
};

const Loading: React.FC = () => {
  return <Box sx={styleContainer} />;
};

export default Loading;
