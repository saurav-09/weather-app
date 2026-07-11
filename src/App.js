import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  SvgIcon,
  Typography,
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import UTCDatetime from './components/Reusable/UTCDatetime';
import LoadingBox from './components/Reusable/LoadingBox';
import ErrorBox from './components/Reusable/ErrorBox';

import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';

import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from './utilities/DataUtils';

import { ALL_DESCRIPTIONS } from './utilities/DateConstants';

import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchChangeHandler = async (enteredData) => {
    if (!enteredData?.value) {
      return;
    }

    const [latitude, longitude] = enteredData.value.split(' ');

    setIsLoading(true);
    setError(false);

    try {
      const weatherData = await fetchWeatherData(latitude, longitude);

      if (!weatherData) {
        throw new Error('Unable to fetch weather data');
      }

      const [todayWeatherResponse, weekForecastResponse] = weatherData;

      const currentDate = transformDateFormat();
      const currentDatetime = Math.floor(Date.now() / 1000);

      const todayForecastList = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        currentDatetime
      );

      const weekForecastList = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast(todayForecastList);

      setTodayWeather({
        city: enteredData.label,
        ...todayWeatherResponse,
      });

      setWeekForecast({
        city: enteredData.label,
        list: weekForecastList,
      });
    } catch (error) {
      console.error('Weather search error:', error);

      setError(true);
      setTodayWeather(null);
      setTodayForecast([]);
      setWeekForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  let appContent;

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          width: '100%',
          minHeight: {
            xs: '400px',
            sm: '500px',
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingBox>
          <Typography
            sx={{
              fontSize: {
                xs: '11px',
                sm: '12px',
              },
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'Poppins',
            }}
          >
            Loading weather data...
          </Typography>
        </LoadingBox>
      </Box>
    );
  } else if (error) {
    appContent = (
      <Box
        sx={{
          width: '100%',
          minHeight: {
            xs: '350px',
            sm: '400px',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ErrorBox
          margin="3rem auto"
          flex="inherit"
          errorMessage="Unable to load weather data. Please try again."
        />
      </Box>
    );
  } else if (todayWeather && weekForecast) {
    appContent = (
      <>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minWidth: 0,
          }}
        >
          <TodayWeather
            data={todayWeather}
            forecastList={todayForecast}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minWidth: 0,
          }}
        >
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </>
    );
  } else {
    appContent = (
      <Box
        sx={{
          width: '100%',
          minHeight: {
            xs: '420px',
            sm: '500px',
          },

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          textAlign: 'center',

          padding: {
            xs: '1rem',
            sm: '2rem',
          },
        }}
      >
        <SvgIcon
          component={SplashIcon}
          inheritViewBox
          sx={{
            fontSize: {
              xs: '90px',
              sm: '120px',
              md: '140px',
            },

            filter:
              'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.2))',
          }}
        />

        <Typography
          sx={{
            fontSize: {
              xs: '12px',
              sm: '14px',
            },

            color: 'rgba(255, 255, 255, 0.75)',
            fontFamily: 'Poppins',

            marginTop: {
              xs: '1.5rem',
              sm: '2rem',
            },

            maxWidth: {
              xs: '280px',
              sm: '450px',
            },

            lineHeight: 1.8,
          }}
        >
          Explore current weather conditions and detailed forecasts for cities
          around the world.
        </Typography>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: {
          xs: '94%',
          sm: '90%',
          md: '92%',
          lg: '1100px',
        },

        maxWidth: '1100px',

        minHeight: '100vh',

        margin: '0 auto',

        padding: {
          xs: '1rem 0 2rem',
          sm: '1.25rem 1rem 3rem',
          md: '1.5rem 1.5rem 3rem',
        },

        borderRadius: {
          xs: 0,
          sm: '0 0 16px 16px',
        },

        boxSizing: 'border-box',

        boxShadow: {
          xs: 'none',
          sm: '0 10px 30px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Grid
        container
        columnSpacing={{
          xs: 0,
          md: 2,
        }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',

              marginBottom: {
                xs: '0.8rem',
                sm: '1rem',
              },

              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',

              gap: {
                xs: '8px',
                sm: '16px',
              },
            }}
          >
            <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
  }}
>
  <Typography
    sx={{
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: {
        xs: '18px',
        sm: '22px',
        md: '26px',
      },
      color: '#04C4E0',
      letterSpacing: '-0.5px',
      lineHeight: 1,
    }}
  >
    Sky
    <Box
      component="span"
      sx={{
        color: '#fff',
      }}
    >
      Cast
    </Box>
  </Typography>
</Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,

                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <UTCDatetime />
            </Box>

            <Link
              href="https://github.com/saurav-09"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              aria-label="GitHub profile"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <GitHubIcon
                sx={{
                  fontSize: {
                    xs: '20px',
                    sm: '22px',
                    md: '26px',
                  },

                  color: 'rgba(255, 255, 255, 0.8)',

                  transition:
                    'color 0.2s ease, transform 0.2s ease',

                  '&:hover': {
                    color: '#2d95bd',

                    transform: {
                      xs: 'none',
                      md: 'translateY(-2px)',
                    },
                  },
                }}
              />
            </Link>
          </Box>

          <Search onSearchChange={searchChangeHandler} />
        </Grid>

        {appContent}
      </Grid>
    </Container>
  );
}

export default App;