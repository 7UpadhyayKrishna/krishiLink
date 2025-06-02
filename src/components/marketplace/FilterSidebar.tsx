import React, { useState } from 'react';
import { X, Filter, Check } from 'lucide-react';

interface FilterSidebarProps {
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onClose }) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['vegetables']);
  const [organicOnly, setOrganicOnly] = useState(false);
  
  const cropCategories = [
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains & Cereals' },
    { id: 'pulses', name: 'Pulses' },
    { id: 'spices', name: 'Spices' },
  ];
  
  const popularCrops = [
    { id: 'rice', name: 'Rice', category: 'grains' },
    { id: 'wheat', name: 'Wheat', category: 'grains' },
    { id: 'potatoes', name: 'Potatoes', category: 'vegetables' },
    { id: 'tomatoes', name: 'Tomatoes', category: 'vegetables' },
    { id: 'onions', name: 'Onions', category: 'vegetables' },
    { id: 'apples', name: 'Apples', category: 'fruits' },
    { id: 'mangoes', name: 'Mangoes', category: 'fruits' },
    { id: 'chillies', name: 'Chillies', category: 'spices' },
    { id: 'turmeric', name: 'Turmeric', category: 'spices' },
    { id: 'lentils', name: 'Lentils', category: 'pulses' },
  ];
  
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const handleCropToggle = (cropId: string) => {
    if (selectedCrops.includes(cropId)) {
      setSelectedCrops(selectedCrops.filter(id => id !== cropId));
    } else {
      setSelectedCrops([...selectedCrops, cropId]);
    }
  };
  
  const filteredCrops = popularCrops.filter(crop => 
    selectedCategories.includes(crop.category)
  );
  
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };
  
  const handleReset = () => {
    setPriceRange([0, 200]);
    setSelectedCrops([]);
    setSelectedCategories(['vegetables']);
    setOrganicOnly(false);
  };
  
  const handleApply = () => {
    // In a real app, this would apply the filters to the marketplace
    onClose();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-medium text-gray-800">Filters</h3>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4 border-b">
        <h4 className="font-medium text-gray-700 mb-3">Price Range (per kg)</h4>
        <div className="mb-2 flex justify-between text-sm text-gray-600">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <div className="relative mb-4">
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full absolute top-0"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min Price</label>
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max Price</label>
            <input
              type="number"
              min={priceRange[0]}
              max="200"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-b">
        <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          {cropCategories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
              />
              <div className={`h-5 w-5 border rounded mr-2 flex items-center justify-center ${
                selectedCategories.includes(category.id) 
                  ? 'bg-green-600 border-green-600' 
                  : 'border-gray-300'
              }`}>
                {selectedCategories.includes(category.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-b">
        <h4 className="font-medium text-gray-700 mb-3">Popular Crops</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filteredCrops.map((crop) => (
            <label key={crop.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={selectedCrops.includes(crop.id)}
                onChange={() => handleCropToggle(crop.id)}
              />
              <div className={`h-5 w-5 border rounded mr-2 flex items-center justify-center ${
                selectedCrops.includes(crop.id) 
                  ? 'bg-green-600 border-green-600' 
                  : 'border-gray-300'
              }`}>
                {selectedCrops.includes(crop.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-gray-700">{crop.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-b">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={organicOnly}
            onChange={() => setOrganicOnly(!organicOnly)}
          />
          <div className={`h-5 w-5 border rounded mr-2 flex items-center justify-center ${
            organicOnly 
              ? 'bg-green-600 border-green-600' 
              : 'border-gray-300'
          }`}>
            {organicOnly && (
              <Check className="h-3 w-3 text-white" />
            )}
          </div>
          <span className="text-gray-700 font-medium">Organic Products Only</span>
        </label>
      </div>
      
      <div className="p-4 flex gap-2">
        <button
          className="flex-1 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
          onClick={handleApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;