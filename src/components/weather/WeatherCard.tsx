import React from 'react';

interface WeatherCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-600 ml-2">{title}</span>
      </div>
      <div className="text-lg font-semibold text-gray-800">{value}</div>
    </div>
  );
};

export default WeatherCard;