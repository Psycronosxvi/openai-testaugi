const WEATHER_API_KEY = '85bd47759e552c123ab381c17be8dae3';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${WEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}