import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, TrendingUp, CloudSun, Stethoscope } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Full-page background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg')",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 transform transition-transform hover:scale-102">
              Connecting Farmers and Buyers Directly
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 hover:opacity-100 transition-opacity">
              Negotiate fair prices for crops within market standards, access weather forecasts, and get expert advice on crop health.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/marketplace" 
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-medium flex items-center transition-all transform hover:translate-x-1 hover:shadow-lg text-lg"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/dashboard" 
                className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg font-medium transition-all hover:shadow-lg transform hover:-translate-y-0.5 text-lg"
              >
                My Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800 hover:text-green-700 transition-colors">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Sprout className="w-12 h-12 text-green-600 transition-transform group-hover:scale-110" />}
              title="List Your Crops"
              description="Farmers can easily list their crops with detailed information and set a base price."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-12 h-12 text-amber-500 transition-transform group-hover:scale-110" />}
              title="Negotiate Prices"
              description="Buyers can make offers within the APMC price range for listed crops."
            />
            <FeatureCard 
              icon={<CloudSun className="w-12 h-12 text-blue-500 transition-transform group-hover:scale-110" />}
              title="Weather Forecasts"
              description="Access real-time weather data to plan harvesting and transportation."
            />
            <FeatureCard 
              icon={<Stethoscope className="w-12 h-12 text-red-500 transition-transform group-hover:scale-110" />}
              title="Crop Doctor"
              description="Get expert advice on crop health issues and recommendations."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4 hover:text-green-100 transition-colors">
            Ready to get started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-green-100 hover:text-white transition-colors">
            Join thousands of farmers and buyers already using our platform to trade crops efficiently.
          </p>
          <Link 
            to="/marketplace" 
            className="inline-block bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg font-medium transition-all transform hover:-translate-y-1 hover:shadow-xl text-lg"
          >
            Visit Marketplace
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-green-600 transition-colors">{title}</h3>
      <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{description}</p>
    </div>
  );
};

export default Home;