import React, { useState } from 'react';
import { Search, Filter, SortDesc, MapPin } from 'lucide-react';
import { mockCropListings } from '../data/mockData';
import { CropCard } from '../components/marketplace';
import { FilterSidebar } from '../components/marketplace';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72`}>
          <FilterSidebar onClose={() => setShowFilters(false)} />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Crop Marketplace</h1>
            
            <div className="flex items-center gap-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search crops, locations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-1 py-2 px-4 border border-gray-300 rounded-lg bg-white"
              >
                <Filter size={18} />
                Filters
              </button>
              <div className="hidden md:flex items-center gap-1 py-2 px-4 border border-gray-300 rounded-lg bg-white">
                <SortDesc size={18} />
                <select className="bg-transparent outline-none">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-gray-700">Popular:</span>
              {['Rice', 'Wheat', 'Potatoes', 'Tomatoes', 'Onions'].map(crop => (
                <button 
                  key={crop} 
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                  onClick={() => setSearchTerm(crop)}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCropListings.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;