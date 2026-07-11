export function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      const { date, ...rest } = obj;

      acc[property] = acc[property] || [];
      acc[property].push(rest);

      return acc;
    }, {});
  };
}

export function getAverage(array, isRound = true) {
  if (!array || array.length === 0) {
    return 0;
  }

  const average =
    array.reduce((sum, value) => sum + value, 0) / array.length;

  return isRound ? Math.round(average) : Number(average.toFixed(2));
}

export function getMostFrequentWeather(array) {
  if (!array || array.length === 0) {
    return "unknown";
  }

  const frequencyMap = array.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(frequencyMap).reduce((a, b) =>
    frequencyMap[a] > frequencyMap[b] ? a : b
  );
}

export const descriptionToIconName = (description, descriptionsList) => {
  const matchedDescription = descriptionsList.find(
    (item) => item.description === description
  );

  return matchedDescription?.icon || "unknown";
};
export const getWeekForecastWeather = (response, descriptionsList) => {
  if (
    !response ||
    Object.keys(response).length === 0 ||
    Number(response.cod) === 404 ||
    !response.list
  ) {
    return [];
  }

  const forecastData = [];
  const descriptionsData = [];

  // Get today's local date in YYYY-MM-DD format
  const today = new Date();

  const todayDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  response.list.forEach((item) => {
    const date = item.dt_txt.substring(0, 10);

    // Skip previous dates
    if (date < todayDate) {
      return;
    }

    descriptionsData.push({
      description: item.weather[0].description,
      date,
    });

    forecastData.push({
      date,
      temp: item.main.temp,
      humidity: item.main.humidity,
      wind: item.wind.speed,
      clouds: item.clouds.all,
    });
  });

  const groupByDate = groupBy('date');

  const groupedForecastData = groupByDate(forecastData);
  const groupedForecastDescriptions = groupByDate(descriptionsData);

  const descriptionKeys = Object.keys(groupedForecastDescriptions);

  const dayDescriptionList = descriptionKeys.map((key) => {
    const descriptions = groupedForecastDescriptions[key].map(
      (item) => item.description
    );

    return getMostFrequentWeather(descriptions);
  });

  const forecastKeys = Object.keys(groupedForecastData);

  const dayAveragesList = forecastKeys.map((key, index) => {
    const dayData = groupedForecastData[key];

    const temperatures = dayData.map((item) => item.temp);
    const humidity = dayData.map((item) => item.humidity);
    const wind = dayData.map((item) => item.wind);
    const clouds = dayData.map((item) => item.clouds);

    return {
      date: key,
      temp: getAverage(temperatures),
      humidity: getAverage(humidity),
      wind: getAverage(wind, false),
      clouds: getAverage(clouds),

      description: dayDescriptionList[index],

      icon: descriptionToIconName(
        dayDescriptionList[index],
        descriptionsList
      ),
    };
  });

  return dayAveragesList;
};

export const getTodayForecastWeather = (
  response,
  currentDate,
  currentDatetime
) => {
  if (
    !response ||
    Object.keys(response).length === 0 ||
    Number(response.cod) === 404 ||
    !response.list
  ) {
    return [];
  }

  const todayForecasts = response.list
    .filter(
      (item) =>
        item.dt_txt.startsWith(currentDate.substring(0, 10)) &&
        item.dt > currentDatetime
    )
    .map((item) => ({
      time: item.dt_txt.split(" ")[1].substring(0, 5),
      icon: item.weather[0].icon,
      temperature: `${Math.round(item.main.temp)} °C`,
    }));

  return todayForecasts.length > 6
    ? todayForecasts.slice(0, 6)
    : todayForecasts;
};