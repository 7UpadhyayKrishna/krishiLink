import React from 'react';
import { BarChart } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Reports
      </h2>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 text-center py-16">
        <div className="max-w-md mx-auto">
          <BarChart size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sales Reports
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This page will contain detailed sales reports with charts and graphs
            to help you analyze your business performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;