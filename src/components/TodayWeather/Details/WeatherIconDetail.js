import React from 'react';
import { Box } from '@mui/material';

const WeatherIconDetail = ({ src }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: {
          xs: '70px',
          sm: '80px',
          md: '90px',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src={src}
        alt="Current weather condition"
        sx={{
          width: {
            xs: '52px',
            sm: '68px',
            md: '82px',
          },
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25))',
          transition: 'transform 0.25s ease',

          '&:hover': {
            transform: {
              xs: 'none',
              md: 'scale(1.08)',
            },
          },
        }}
      />
    </Box>
  );
};

export default WeatherIconDetail;