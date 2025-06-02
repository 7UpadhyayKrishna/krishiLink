import React from 'react';
import { Search } from 'lucide-react';

const Transactions: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Transactions
      </h2>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 text-center py-16">
        <div className="max-w-md mx-auto">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Transaction Management
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This page will contain a comprehensive transaction history with advanced 
            filtering, search capabilities, and transaction management features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;