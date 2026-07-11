import { Box, Typography } from '@mui/material';
import React from 'react';

const TemperatureWeatherDetail = ({ temperature, description }) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: '8px',
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: {
            xs: '24px',
            sm: '30px',
            md: '34px',
          },
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-1px',
          textShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {Math.round(temperature)}°C
      </Typography>

      <Typography
        component="p"
        sx={{
          fontFamily: 'Roboto Condensed',
          fontSize: {
            xs: '11px',
            sm: '12px',
            md: '13px',
          },
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: 1.3,
          letterSpacing: '0.5px',
          textTransform: 'capitalize',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default TemperatureWeatherDetail;