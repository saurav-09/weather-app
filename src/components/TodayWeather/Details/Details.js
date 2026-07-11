import React from 'react';
import { Grid } from '@mui/material';
import { getDayMonthFromDate } from '../../../utilities/DatetimeUtils';
import { weatherIcon } from '../../../utilities/IconsUtils';
import ErrorBox from '../../Reusable/ErrorBox';
import CityDateDetail from './CityDateDetail';
import TemperatureWeatherDetail from './TemperatureWeatherDetail';
import WeatherIconDetail from './WeatherIconDetail';
import Layout from '../../Reusable/Layout';

const Details = ({ data }) => {
  const dayMonth = getDayMonthFromDate();

  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    Number(data.cod) === 404;

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided) {
    content = (
      <Grid
        item
        container
        xs={12}
        sx={{
          minHeight: '120px',
          alignItems: 'center',

          background:
            'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))',

          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',

          padding: {
            xs: '12px 6px',
            sm: '16px 10px',
          },

          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',

          backdropFilter: 'blur(10px)',

          transition: 'transform 0.2s ease, border-color 0.2s ease',

          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: 'rgba(4, 196, 224, 0.2)',
          },
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            minHeight: '90px',
          }}
        >
          <CityDateDetail
            city={data.city}
            date={dayMonth}
          />
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            minHeight: '90px',
          }}
        >
          <TemperatureWeatherDetail
            temperature={data.main.temp}
            description={data.weather[0].description}
          />
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            minHeight: '90px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WeatherIconDetail
            src={weatherIcon(`${data.weather[0].icon}.png`)}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Layout
      title="CURRENT WEATHER"
      content={content}
      mb="0.8rem"
    />
  );
};

export default Details;