import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Cloud, Loader, MapPin, Thermometer } from 'lucide-react';
import { WeatherData, getWeatherByCoords, getWeatherIconUrl } from '@/lib/weather';

export function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(data);
          } catch (err) {
            setError('Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Location access denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Card className="bg-[#232438] border-[#2A2B3F] p-6 flex items-center justify-center">
        <Loader className="w-6 h-6 text-[#00E5FF] animate-spin" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-[#232438] border-[#2A2B3F] p-6">
        <p className="text-red-400">{error}</p>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="bg-[#232438] border-[#2A2B3F] p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#FF1B6B]" />
            <h3 className="text-lg font-bold">{weather.name}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-2xl font-bold">
                {Math.round(weather.main.temp)}°C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">
                {weather.weather[0].description}
              </span>
            </div>
          </div>
        </div>
        <img
          src={getWeatherIconUrl(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="w-16 h-16"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-[#2A2B3F] p-3 rounded-lg">
          <span className="text-gray-400 text-sm">Humidity</span>
          <p className="text-lg font-bold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-[#2A2B3F] p-3 rounded-lg">
          <span className="text-gray-400 text-sm">Wind Speed</span>
          <p className="text-lg font-bold">{weather.wind.speed} m/s</p>
        </div>
      </div>
    </Card>
  );
}