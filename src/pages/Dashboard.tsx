import React, { useState } from 'react';
import { Tabs, Tab } from '../components/ui';
import { 
  ShoppingBag, 
  Sprout, 
  Clock, 
  CheckCircle, 
  Ban, 
  TrendingUp, 
  BarChart4, 
  Calendar
} from 'lucide-react';
import { 
  mockFarmerListings, 
  mockBuyerOffers, 
  mockTransactions 
} from '../data/mockData';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [userType, setUserType] = useState('farmer'); // or 'buyer'
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Manage your crops, offers, and transactions</p>
        </div>
        
        {/* User type toggle */}
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              userType === 'farmer'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
            onClick={() => setUserType('farmer')}
          >
            <div className="flex items-center gap-2">
              <Sprout size={16} />
              <span>Farmer View</span>
            </div>
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              userType === 'buyer'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
            onClick={() => setUserType('buyer')}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={16} />
              <span>Buyer View</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={<Sprout className="w-10 h-10 text-green-500" />}
          title="Active Listings"
          value={userType === 'farmer' ? '12' : '—'}
          change="+2 this week"
          isPositive={true}
        />
        <StatCard 
          icon={<ShoppingBag className="w-10 h-10 text-amber-500" />}
          title={userType === 'farmer' ? 'Offers Received' : 'Offers Made'}
          value="8"
          change="+3 this week"
          isPositive={true}
        />
        <StatCard 
          icon={<CheckCircle className="w-10 h-10 text-blue-500" />}
          title="Completed Deals"
          value="47"
          change="+5 this month"
          isPositive={true}
        />
        <StatCard 
          icon={<TrendingUp className="w-10 h-10 text-purple-500" />}
          title="Total Value"
          value="₹245,850"
          change="+12% vs last month"
          isPositive={true}
        />
      </div>
      
      {/* Main content tabs */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <Tab id="listings" label={userType === 'farmer' ? "My Listings" : "Available Crops"} icon={<Sprout size={18} />} />
          <Tab id="offers" label="Offers" icon={<ShoppingBag size={18} />} />
          <Tab id="transactions" label="Transactions" icon={<CheckCircle size={18} />} />
          <Tab id="analytics" label="Analytics" icon={<BarChart4 size={18} />} />
        </Tabs>
        
        <div className="p-6">
          {activeTab === 'listings' && (
            <div>
              {userType === 'farmer' ? (
                <FarmerListings listings={mockFarmerListings} />
              ) : (
                <AvailableCrops />
              )}
            </div>
          )}
          
          {activeTab === 'offers' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {userType === 'farmer' ? 'Offers Received' : 'Your Offers'}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {userType === 'farmer' ? 'Buyer' : 'Seller'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (per Kg)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">APMC Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockBuyerOffers.map((offer) => (
                      <tr key={offer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-cover bg-center mr-3" style={{backgroundImage: `url(${offer.cropImage})`}}></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{offer.cropName}</div>
                              <div className="text-sm text-gray-500">{offer.cropVariety}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{userType === 'farmer' ? offer.buyerName : offer.sellerName}</div>
                          <div className="text-sm text-gray-500">{offer.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {offer.quantity} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">₹{offer.pricePerKg}</div>
                          {offer.status === 'pending' && (
                            <div className={`text-xs ${
                              offer.pricePerKg > offer.originalPrice ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {offer.pricePerKg > offer.originalPrice 
                                ? `+₹${(offer.pricePerKg - offer.originalPrice).toFixed(2)}` 
                                : `-₹${(offer.originalPrice - offer.pricePerKg).toFixed(2)}`}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{offer.apmcMin} - ₹{offer.apmcMax}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${offer.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                              offer.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {offer.status === 'accepted' ? 'Accepted' : 
                             offer.status === 'rejected' ? 'Rejected' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {offer.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button className="text-green-600 hover:text-green-900">Accept</button>
                              {userType === 'farmer' && <button className="text-blue-600 hover:text-blue-900">Counter</button>}
                              <button className="text-red-600 hover:text-red-900">Reject</button>
                            </div>
                          )}
                          {offer.status !== 'pending' && (
                            <button className="text-gray-600 hover:text-gray-900">View Details</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {userType === 'farmer' ? 'Buyer' : 'Seller'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (per Kg)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-cover bg-center mr-3" style={{backgroundImage: `url(${transaction.cropImage})`}}></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{transaction.cropName}</div>
                              <div className="text-sm text-gray-500">{transaction.cropVariety}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{userType === 'farmer' ? transaction.buyerName : transaction.sellerName}</div>
                          <div className="text-sm text-gray-500">{transaction.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.quantity} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{transaction.pricePerKg}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{transaction.totalValue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'}`}>
                            {transaction.status === 'completed' ? 'Completed' : 
                             transaction.status === 'pending' ? 'Pending' : 'In Transit'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Price Trends</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Price trend chart visualization would appear here</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Seasonal Calendar</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Seasonal crop calendar would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      {change && (
        <div className={`mt-2 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      )}
    </div>
  );
};

const FarmerListings = ({ listings }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">My Crop Listings</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + Add New Listing
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center" 
              style={{backgroundImage: `url(${listing.image})`}}
            >
              <div className="flex justify-end p-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {listing.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{listing.name}</h3>
                  <p className="text-gray-600 text-sm">{listing.variety}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">₹{listing.pricePerKg}/kg</p>
                  <p className="text-xs text-gray-500">APMC: ₹{listing.apmcMin}-{listing.apmcMax}</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Harvested: {listing.harvestDate}</span>
                </div>
                <div>
                  {listing.quantity} kg available
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="text-center py-1 bg-gray-100 rounded text-xs font-medium">
                  {listing.offerCount} Offers
                </div>
                <div className="text-center py-1 bg-gray-100 rounded text-xs font-medium">
                  {listing.viewCount} Views
                </div>
              </div>
              
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-2 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded font-medium">
                  View Offers
                </button>
                <button className="flex-1 py-2 text-xs border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-medium">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AvailableCrops = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Crops</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          View Saved Filters
        </button>
      </div>
      
      <p className="text-gray-600 mb-4">This section would display available crops for buyers to browse and make offers on.</p>
      
      <div className="flex justify-center">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
          Go to Marketplace
        </button>
      </div>
    </div>
  );
};

export default Dashboard;