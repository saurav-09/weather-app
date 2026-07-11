import React from 'react';
import { Grid } from '@mui/material';
import ErrorBox from '../../Reusable/ErrorBox';
import AirConditionsItem from './AirConditionsItem';
import Layout from '../../Reusable/Layout';

const TodayWeatherAirConditions = ({ data }) => {
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
        spacing={1}
      >
        <AirConditionsItem
          title="Real Feel"
          value={`${Math.round(data.main.feels_like)} °C`}
          type="temperature"
        />

        <AirConditionsItem
          title="Wind"
          value={`${data.wind.speed} m/s`}
          type="wind"
        />

        <AirConditionsItem
          title="Clouds"
          value={`${Math.round(data.clouds.all)} %`}
          type="clouds"
        />

        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(data.main.humidity)} %`}
          type="humidity"
        />
      </Grid>
    );
  }

  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{
        marginTop: {
          xs: '2rem',
          sm: '2.5rem',
          md: '2.9rem',
        },
      }}
    />
  );
};

export default TodayWeatherAirConditions;