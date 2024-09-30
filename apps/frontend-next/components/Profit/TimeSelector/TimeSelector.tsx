import { Box, Button, Typography } from '@mui/material';

type TimeSelectorProps = {
  optionsFiltered: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
};

const optionsTimeList = ['1D', '3D', '1W', '1M'];

const TimeSelector: React.FC<TimeSelectorProps> = ({ optionsFiltered, selectedTime, onSelectTime }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginInline: 'auto',
        paddingInline: '3rem',
        height: '2rem',
        display: 'flex',
        justifyContent: 'space-around',
        zIndex: 99,
      }}
    >
      {optionsTimeList.map((id) => (
        <Button
          key={id}
          onClick={optionsFiltered.includes(id) ? () => onSelectTime(id) : () => {}}
          sx={{
            width: '42px',
            minWidth: 'unset',
            height: '29px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            backdropFilter: 'blur(3px)',
            cursor: optionsFiltered.includes(id) ? 'pointer' : 'not-allowed',
            opacity: optionsFiltered.includes(id) ? 1 : 0.5,
            background:
              id === selectedTime
                ? 'linear-gradient(180deg, #28E7C5 -100%, #0B1426 170.69%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)',
          }}
        >
          <Typography
            sx={{
              fontSize: '.9rem',
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Poppins',
            }}
          >
            {id}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default TimeSelector;
