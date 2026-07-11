import React from 'react';
import { Grid } from '@mui/material';
import AirConditions from './AirConditions/AirConditions';
import DailyForecast from './Forecast/DailyForecast';
import Details from './Details/Details';

const TodayWeather = ({ data, forecastList }) => {
  return (
    <Grid
      container
      sx={{
        padding: {
          xs: '2rem 0 0',
          sm: '2.5rem 0 0',
          md: '3rem 0 0',
        },
      }}
    >
      <Details data={data} />

      <AirConditions data={data} />

      <DailyForecast
        data={data}
        forecastList={forecastList}
      />
    </Grid>
  );
};

export default TodayWeather;