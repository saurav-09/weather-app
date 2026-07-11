import React from 'react';
import { Box, Typography } from '@mui/material';

const DayWeatherDetails = ({ day, src, description }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        height: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',

        paddingLeft: {
          xs: '8px',
          sm: '14px',
          md: '20px',
        },

        gap: {
          xs: '5px',
          sm: '6px',
        },
      }}
    >
      <Typography
        sx={{
          width: '100%',
          minWidth: 0,

          fontFamily: 'Poppins',
          fontWeight: 600,

          fontSize: {
            xs: '11px',
            sm: '13px',
            md: '14px',
          },

          color: '#fff',
          lineHeight: 1.2,
          letterSpacing: '0.3px',

          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {day}
      </Typography>

      <Box
        sx={{
          width: '100%',
          minWidth: 0,

          display: 'flex',
          alignItems: 'center',

          gap: {
            xs: '4px',
            sm: '6px',
          },
        }}
      >
        <Box
          component="img"
          src={src}
          alt={`${description} weather`}
          sx={{
            width: {
              xs: '25px',
              sm: '30px',
              md: '34px',
            },

            flexShrink: 0,
            height: 'auto',
            objectFit: 'contain',

            filter:
              'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2))',
          }}
        />

        <Typography
          title={description}
          sx={{
            minWidth: 0,

            fontFamily: 'Roboto Condensed',

            fontSize: {
              xs: '10px',
              sm: '12px',
              md: '13px',
            },

            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.2,
            textTransform: 'capitalize',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default DayWeatherDetails;