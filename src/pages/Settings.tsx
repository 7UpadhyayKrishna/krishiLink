import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h2>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 text-center py-16">
        <div className="max-w-md mx-auto">
          <SettingsIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Shop Settings
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This page will contain settings for your shop, including user management,
            payment methods, and customization options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;