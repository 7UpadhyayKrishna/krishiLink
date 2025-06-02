import React, { useState } from 'react';
import { MapPin, Search, Cloud, Droplets, Wind, Thermometer, Sun, Calendar } from 'lucide-react';
import { mockWeatherData, mockLocations } from '../data/mockData';
import { WeatherCard, ForecastItem } from '../components/weather';

const Weather = () => {
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  const weatherData = mockWeatherData;
  
  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setShowLocationDropdown(false);
    setSearchQuery('');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather Forecast</h1>
      
      <div className="relative w-full max-w-md mb-8">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search location..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowLocationDropdown(true);
          }}
          onFocus={() => setShowLocationDropdown(true)}
        />
        {showLocationDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {mockLocations
              .filter(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '')
              .map((loc, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleLocationSelect(loc)}
                >
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    {loc}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      
      {/* Current Weather */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <h2 className="text-xl font-semibold">{location}</h2>
              </div>
              <p className="text-sm opacity-90">Updated: Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            <div className="mt-4 md:mt-0 text-4xl font-bold">{weatherData.current.temperature}°C</div>
          </div>
          
          <div className="flex items-center mt-6">
            <div className="text-5xl mr-4">
              <Cloud className="w-16 h-16" />
            </div>
            <div>
              <p className="text-xl font-medium">{weatherData.current.condition}</p>
              <p className="opacity-90">Feels like {weatherData.current.feelsLike}°C</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WeatherCard 
              icon={<Thermometer className="w-6 h-6 text-orange-500" />}
              title="High / Low"
              value={`${weatherData.current.high}° / ${weatherData.current.low}°`}
            />
            <WeatherCard 
              icon={<Droplets className="w-6 h-6 text-blue-500" />}
              title="Humidity"
              value={`${weatherData.current.humidity}%`}
            />
            <WeatherCard 
              icon={<Wind className="w-6 h-6 text-teal-500" />}
              title="Wind"
              value={`${weatherData.current.wind} km/h`}
            />
            <WeatherCard 
              icon={<Sun className="w-6 h-6 text-amber-500" />}
              title="UV Index"
              value={weatherData.current.uvIndex}
            />
          </div>
        </div>
      </div>
      
      {/* 5-day Forecast */}
      <div>
        <div className="flex items-center mb-4">
          <Calendar className="mr-2 text-gray-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">5-Day Forecast</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <ForecastItem key={index} forecast={day} />
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Farming Tip:</strong> Current conditions indicate good timing for wheat harvesting in your region. Consider scheduling in the next 2-3 days before expected rainfall.
        </p>
      </div>
    </div>
  );
};

export default Weather;