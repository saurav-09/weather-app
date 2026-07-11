import React from 'react';
import { Box, Grid, SvgIcon, Typography } from '@mui/material';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

import { ReactComponent as HumidityIcon } from '../../../assets/humidity.svg';

const AirConditionsItem = ({ type, title, value }) => {
  const iconStyles = {
    fontSize: {
      xs: '17px',
      sm: '19px',
      md: '21px',
    },
  };

  const icons = {
    temperature: <ThermostatIcon sx={iconStyles} />,
    wind: <AirIcon sx={iconStyles} />,
    clouds: <FilterDramaIcon sx={iconStyles} />,
    humidity: (
      <SvgIcon
        component={HumidityIcon}
        inheritViewBox
        sx={iconStyles}
      />
    ),
  };

  return (
    <Grid
      item
      xs={6}
      sm={3}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: {
            xs: '90px',
            sm: '100px',
          },

          padding: {
            xs: '12px 6px',
            sm: '14px 8px',
          },

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          background:
            'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))',

          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',

          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',

          transition:
            'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',

          '&:hover': {
            transform: {
              xs: 'none',
              md: 'translateY(-3px)',
            },

            borderColor: 'rgba(4, 196, 224, 0.25)',

            background:
              'linear-gradient(145deg, rgba(255,255,255,0.11), rgba(255,255,255,0.04))',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            gap: {
              xs: '4px',
              sm: '6px',
            },

            marginBottom: {
              xs: '8px',
              sm: '10px',
            },

            color: 'rgba(255, 255, 255, 0.65)',
          }}
        >
          {icons[type] || null}

          <Typography
            component="span"
            sx={{
              fontFamily: 'Poppins',

              fontSize: {
                xs: '10px',
                sm: '11px',
                md: '12px',
              },

              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.65)',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
        </Box>

        <Typography
          component="p"
          sx={{
            fontFamily: 'Poppins',

            fontWeight: 600,

            fontSize: {
              xs: '14px',
              sm: '15px',
              md: '17px',
            },

            color: '#fff',
            lineHeight: 1,

            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AirConditionsItem;