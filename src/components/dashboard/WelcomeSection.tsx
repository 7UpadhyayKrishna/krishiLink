import React from 'react';

const WelcomeSection: React.FC = () => {
  const currentHour = new Date().getHours();
  let greeting = 'Good evening';
  
  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {greeting}, <span className="text-teal-600 dark:text-teal-400">Krishna!</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        Here's what's happening with your shop today
      </p>
    </div>
  );
};

export default WelcomeSection;