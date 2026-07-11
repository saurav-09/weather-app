const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function fetchWeatherData(lat, lon) {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    if (!weatherResponse.ok || !forecastResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    return [weatherData, forecastData];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchCities(input) {
  try {
    if (!input?.trim()) {
      return { data: [] };
    }

    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${encodeURIComponent(
        input.trim()
      )}`,
      GEO_API_OPTIONS
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}