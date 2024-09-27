// components/Loading.tsx
import { Box } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Box component="span" className="loader" />
    </Box>
  );
};

export default Loading;
