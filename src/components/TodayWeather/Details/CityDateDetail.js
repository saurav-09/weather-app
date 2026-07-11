import React from 'react';
import { Box, Typography } from '@mui/material';

const CityDateDetail = ({ city, date }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minWidth: 0,
        padding: {
          xs: '0 4px',
          sm: '0 8px',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: {
          xs: '5px',
          sm: '7px',
        },
      }}
    >
      <Typography
        component="h2"
        title={city}
        sx={{
          width: '100%',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',

          fontFamily: 'Poppins',
          fontWeight: 600,

          fontSize: {
            xs: '13px',
            sm: '16px',
            md: '18px',
          },

          color: '#fff',
          textTransform: 'uppercase',
          lineHeight: 1.2,
          letterSpacing: {
            xs: '0.2px',
            sm: '0.5px',
          },

          textShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
        }}
      >
        {city}
      </Typography>

      <Typography
        component="p"
        sx={{
          fontFamily: 'Roboto Condensed',

          fontSize: {
            xs: '10px',
            sm: '12px',
            md: '13px',
          },

          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: 1.3,
          letterSpacing: '0.4px',
          whiteSpace: 'nowrap',
        }}
      >
        Today · {date}
      </Typography>
    </Box>
  );
};

export default CityDateDetail;