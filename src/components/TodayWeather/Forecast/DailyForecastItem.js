import React from 'react';
import { Box, Typography } from '@mui/material';
import { weatherIcon } from '../../../utilities/IconsUtils';

const DailyForecastItem = ({ item }) => {
  return (
    <Box
      sx={{
        width: '100%',

        minHeight: {
          xs: '105px',
          sm: '115px',
          md: '125px',
        },

        padding: {
          xs: '10px 6px',
          sm: '12px 8px',
        },

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        gap: {
          xs: '7px',
          sm: '9px',
        },

        textAlign: 'center',

        borderRadius: {
          xs: '10px',
          sm: '12px',
        },

        background:
          'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',

        border: '1px solid rgba(255, 255, 255, 0.06)',

        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',

        transition:
          'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',

        '&:hover': {
          transform: {
            xs: 'none',
            md: 'translateY(-3px)',
          },

          background:
            'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',

          borderColor: 'rgba(4, 196, 224, 0.2)',
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 400,

          fontSize: {
            xs: '10px',
            sm: '11px',
            md: '12px',
          },

          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: 1,
        }}
      >
        {item.time}
      </Typography>

      <Box
        component="img"
        src={weatherIcon(`${item.icon}.png`)}
        alt="Weather condition"
        sx={{
          width: {
            xs: '40px',
            sm: '46px',
            md: '52px',
          },

          maxWidth: '100%',
          height: 'auto',

          display: 'block',
          objectFit: 'contain',

          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',

          transition: 'transform 0.2s ease',

          '&:hover': {
            transform: {
              xs: 'none',
              md: 'scale(1.08)',
            },
          },
        }}
      />

      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 600,

          fontSize: {
            xs: '13px',
            sm: '14px',
            md: '15px',
          },

          color: '#fff',
          lineHeight: 1,

          textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        {item.temperature}
      </Typography>
    </Box>
  );
};

export default DailyForecastItem;