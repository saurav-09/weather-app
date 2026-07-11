import React from "react";
import { Box, Grid } from "@mui/material";
import { weatherIcon } from "../../utilities/IconsUtils";
import WeeklyForecastItem from "./WeeklyForecastItem";
import ErrorBox from "../Reusable/ErrorBox";
import DayWeatherDetails from "./DayWeatherDetails";
import Layout from "../Reusable/Layout";

const WeeklyForecast = ({ data }) => {
  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    !data.list ||
    data.list.length === 0;

  let content = (
    <Box sx={{ width: "100%" }}>
      <ErrorBox type="error" />
    </Box>
  );

  if (!noDataProvided) {
    content = (
      <Grid
        item
        container
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: "7px",
            sm: "8px",
          },
        }}
      >
        {data.list.map((item, idx) => (
          <Grid
            item
            key={item.date || idx}
            xs={12}
            sx={{
              width: "100%",

              display: "flex",
              alignItems: "center",

              minHeight: {
                xs: "78px",
                sm: "82px",
                md: "86px",
              },

              padding: {
                xs: "7px 4px",
                sm: "8px 6px",
              },

              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(171,203,222,0.04) 100%)",

              border: "1px solid rgba(255, 255, 255, 0.06)",

              borderRadius: {
                xs: "10px",
                sm: "12px",
              },

              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",

              overflow: "hidden",

              transition:
                "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",

              "&:hover": {
                transform: {
                  xs: "none",
                  md: "translateY(-2px)",
                },

                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.11) 0%, rgba(171,203,222,0.06) 100%)",

                borderColor: "rgba(4, 196, 224, 0.2)",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "42%",
                  sm: "40%",
                },

                minWidth: 0,

                display: "flex",
                alignItems: "center",
              }}
            >
              <DayWeatherDetails
                day={
                  item.date === new Date().toLocaleDateString("en-CA")
                    ? "Today"
                    : new Date(`${item.date}T12:00:00`).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                        },
                      )
                }
                src={weatherIcon(item.icon)}
                description={item.description}
              />
            </Box>

            <Box
              sx={{
                width: {
                  xs: "29%",
                  sm: "30%",
                },

                minWidth: 0,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WeeklyForecastItem
                type="temperature"
                value={`${Math.round(item.temp)} °C`}
              />

              <WeeklyForecastItem type="clouds" value={`${item.clouds} %`} />
            </Box>

            <Box
              sx={{
                width: {
                  xs: "29%",
                  sm: "30%",
                },

                minWidth: 0,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WeeklyForecastItem type="wind" value={`${item.wind} m/s`} />

              <WeeklyForecastItem
                type="humidity"
                value={`${item.humidity} %`}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Layout
      title="WEEKLY FORECAST"
      content={content}
      mb="0.8rem"
      sx={{
        width: "100%",

        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",

        padding: {
          xs: "2rem 0 0",
          sm: "2.5rem 0 0",
          md: "3rem 0 0",
        },
      }}
    />
  );
};

export default WeeklyForecast;
