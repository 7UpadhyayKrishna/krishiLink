import React from 'react';
import { User, Bell, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TopbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-teal-700 dark:text-teal-500 lg:hidden">PaanPOS</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isDarkMode ? (
            <Sun size={20} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon size={20} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
            {user?.phone.charAt(0)}
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
            {user?.role === 'owner' ? 'Owner' : 'Staff'}
          </span>
        </div>

        <button
          onClick={handleSignOut}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;