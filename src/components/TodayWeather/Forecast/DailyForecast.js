import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import DailyForecastItem from './DailyForecastItem';
import ErrorBox from '../../Reusable/ErrorBox';
import Layout from '../../Reusable/Layout';

const DailyForecast = ({ data, forecastList }) => {
  const noDataProvided =
    !data ||
    !forecastList ||
    Object.keys(data).length === 0 ||
    Number(data.cod) === 404;

  let subHeader = null;
  let content = null;

  if (noDataProvided) {
    content = <ErrorBox flex="1" type="error" />;
  } else if (forecastList.length === 0) {
    content = (
      <ErrorBox
        flex="1"
        type="info"
        margin="1rem auto"
        errorMessage="No available forecasts for tonight."
      />
    );
  } else {
    subHeader = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: {
            xs: '0.8rem',
            sm: '1rem',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: '10px',
              sm: '11px',
              md: '12px',
            },
            fontFamily: 'Roboto Condensed',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.65)',
            letterSpacing: '0.5px',
            padding: '5px 12px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {forecastList.length === 1
            ? '1 available forecast'
            : `${forecastList.length} available forecasts`}
        </Typography>
      </Box>
    );

    content = (
      <Grid
        item
        container
        xs={12}
        spacing={1}
        sx={{
          justifyContent: 'center',
        }}
      >
        {forecastList.map((item, idx) => (
          <Grid
            key={`${item.time}-${idx}`}
            item
            xs={6}
            sm={4}
            md={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <DailyForecastItem item={item} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Layout
      title="TODAY'S FORECAST"
      content={content}
      sectionSubHeader={subHeader}
      sx={{
        marginTop: {
          xs: '2rem',
          sm: '2.5rem',
        },
      }}
      mb="0.5rem"
    />
  );
};

export default DailyForecast;