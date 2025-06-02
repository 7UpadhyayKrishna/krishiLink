import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Marketplace, Weather, CropDoctor, Dashboard, MandiPrices } from './pages';
import { Header, Footer } from './components/layout';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/crop-doctor" element={<CropDoctor />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mandi-prices" element={<MandiPrices />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;