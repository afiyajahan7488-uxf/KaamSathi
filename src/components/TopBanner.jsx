import React, { useState } from 'react';
import LocationModal from './LocationModal';

const TopBanner = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('New York, NY');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const handleLocationSelect = (location) => {
    setCurrentLocation(location);
    localStorage.setItem('userLocation', location);
  };

  // Load saved location on component mount
  React.useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setCurrentLocation(savedLocation);
    }
  }, []);

  return (
    <div className="bg-custom-brown text-white p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute top-8 left-20 w-12 h-12 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-4 right-32 w-16 h-16 bg-white/8 rounded-full"></div>
      </div>

      <div className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center animate-slide-in-up">
          <span className="text-3xl font-bold gradient-text animate-pulse-gentle">KaamSathi</span>
          <div className="ml-3 animate-rotate-slow">⚡</div>
        </div>
        <div className="flex items-center animate-scale-in">
          {isLoggedIn && (
            <div className="mr-6 relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-1 animate-glow border border-white/20"
              >
                <span className="text-2xl mr-3 animate-bounce-subtle text-dark-peach">👤</span>
                <span className="font-medium">Profile</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-52 glass rounded-xl shadow-2xl z-20 border border-white/20 animate-fade-in-slide backdrop-blur-md">
                  <div className="py-2">
                    <button className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-all duration-200 rounded-lg mx-2 my-1">
                      👁️ View Profile
                    </button>
                    <button className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-all duration-200 rounded-lg mx-2 my-1">
                      ⚙️ Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/20 transition-all duration-200 rounded-lg mx-2 my-1"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center mr-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg animate-pulse-gentle">
            <span className="mr-2 animate-bounce-subtle">📍</span>
            <span className="font-medium">{currentLocation}</span>
          </div>
          <button
            onClick={() => setShowLocationModal(true)}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 ease-in-out transform hover:scale-105 border border-white/20 animate-shimmer"
          >
            📍 Change Location
          </button>
        </div>
      </div>
      {showDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
};

export default TopBanner;
