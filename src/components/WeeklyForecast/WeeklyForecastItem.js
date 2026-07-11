import React from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';

import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ThermostatIcon from '@mui/icons-material/Thermostat';

import { ReactComponent as HumidityIcon } from '../../assets/humidity.svg';

const WeeklyForecastItem = ({ value, type }) => {
  const iconSize = {
    fontSize: {
      xs: '14px',
      sm: '16px',
      md: '18px',
    },
  };

  const icons = {
    temperature: <ThermostatIcon sx={iconSize} />,
    wind: <AirIcon sx={iconSize} />,
    clouds: <FilterDramaIcon sx={iconSize} />,
    humidity: (
      <SvgIcon
        component={HumidityIcon}
        inheritViewBox
        sx={iconSize}
      />
    ),
  };

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,

        minHeight: {
          xs: '29px',
          sm: '31px',
        },

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        gap: {
          xs: '3px',
          sm: '5px',
          md: '6px',
        },

        color: 'rgba(255, 255, 255, 0.65)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icons[type] || null}
      </Box>

      <Typography
        component="p"
        sx={{
          minWidth: 0,

          fontFamily: 'Poppins',

          fontSize: {
            xs: '10px',
            sm: '12px',
            md: '13px',
          },

          fontWeight: {
            xs: 500,
            sm: 600,
          },

          color: '#fff',
          lineHeight: 1,

          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default WeeklyForecastItem;