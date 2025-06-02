import React from 'react';
import { Package } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Products
      </h2>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-5 text-center py-16">
        <div className="max-w-md mx-auto">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Product Management
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This page will contain product inventory management, allowing you to add,
            edit, and remove products from your catalog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;