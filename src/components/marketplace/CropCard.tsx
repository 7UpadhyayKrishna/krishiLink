import React, { useState } from 'react';
import { Calendar, MapPin, Star, MessageSquare } from 'lucide-react';

interface CropCardProps {
  crop: {
    id: string;
    name: string;
    variety: string;
    image: string;
    pricePerKg: number;
    apmcMin: number;
    apmcMax: number;
    quantity: number;
    location: string;
    harvestDate: string;
    farmerName: string;
    farmerRating: number;
    organic: boolean;
  };
}

const CropCard: React.FC<CropCardProps> = ({ crop }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [offerPrice, setOfferPrice] = useState(crop.pricePerKg.toString());
  const [offerQuantity, setOfferQuantity] = useState(Math.min(100, crop.quantity).toString());
  
  const isPriceInRange = () => {
    const price = parseFloat(offerPrice);
    return price >= crop.apmcMin && price <= crop.apmcMax;
  };
  
  const handleMakeOffer = (e) => {
    e.preventDefault();
    // In a real app, this would submit the offer to the API
    alert(`Offer placed: ${offerQuantity}kg at ₹${offerPrice}/kg`);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
      <div 
        className="h-48 bg-cover bg-center relative" 
        style={{backgroundImage: `url(${crop.image})`}}
      >
        {crop.organic && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            Organic
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3">
          <h3 className="font-bold text-lg">{crop.name}</h3>
          <p className="text-sm">{crop.variety}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{crop.location}</span>
          </div>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-500 mr-1" />
            <span className="text-sm">{crop.farmerRating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-gray-800">₹{crop.pricePerKg}/kg</p>
            <p className="text-xs text-gray-500">APMC Range: ₹{crop.apmcMin}-{crop.apmcMax}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{crop.quantity} kg</p>
            <p className="text-xs text-gray-500">Available</p>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <Calendar size={14} className="mr-1" />
          <span>Harvested: {crop.harvestDate}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-200 mr-1"></div>
            <span>{crop.farmerName}</span>
          </div>
          <button 
            className="text-blue-600 hover:text-blue-800 flex items-center"
            onClick={() => {}}
          >
            <MessageSquare size={14} className="mr-1" />
            Contact
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Make an Offer'}
          </button>
          <button className="py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <form onSubmit={handleMakeOffer}>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Offer Price (per kg)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                  <input 
                    type="number"
                    step="0.01"
                    min={crop.apmcMin}
                    max={crop.apmcMax}
                    className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                      isPriceInRange() 
                        ? 'border-gray-300 focus:ring-green-500 focus:border-green-500' 
                        : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    }`}
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                  />
                </div>
                {!isPriceInRange() && (
                  <p className="text-xs text-red-600 mt-1">
                    Price must be within APMC range (₹{crop.apmcMin}-{crop.apmcMax})
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (kg)
                </label>
                <input 
                  type="number"
                  min="1"
                  max={crop.quantity}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                  value={offerQuantity}
                  onChange={(e) => setOfferQuantity(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  Total: <span className="font-medium">₹{(parseFloat(offerPrice) * parseFloat(offerQuantity)).toFixed(2)}</span>
                </p>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!isPriceInRange()}
                >
                  Send Offer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropCard;