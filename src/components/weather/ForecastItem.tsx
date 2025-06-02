import React from 'react';
import { Cloud, CloudRain, Sun, CloudSun } from 'lucide-react';

interface ForecastItemProps {
  forecast: {
    day: string;
    date: string;
    temperature: {
      high: number;
      low: number;
    };
    condition: string;
    precipChance: number;
  };
}

const ForecastItem: React.FC<ForecastItemProps> = ({ forecast }) => {
  const getWeatherIcon = () => {
    switch (forecast.condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-10 h-10 text-amber-500" />;
      case 'partly cloudy':
        return <CloudSun className="w-10 h-10 text-blue-400" />;
      case 'cloudy':
        return <Cloud className="w-10 h-10 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="w-10 h-10 text-blue-500" />;
      default:
        return <Cloud className="w-10 h-10 text-gray-400" />;
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
      <p className="font-medium text-gray-800">{forecast.day}</p>
      <p className="text-xs text-gray-500 mb-3">{forecast.date}</p>
      
      <div className="flex justify-center mb-3">
        {getWeatherIcon()}
      </div>
      
      <p className="text-sm mb-1">{forecast.condition}</p>
      <div className="flex justify-center items-center gap-2">
        <span className="text-sm font-medium text-gray-800">{forecast.temperature.high}°</span>
        <span className="text-xs text-gray-500">|</span>
        <span className="text-sm text-gray-600">{forecast.temperature.low}°</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">Rain: {forecast.precipChance}%</p>
    </div>
  );
};

export default ForecastItem;