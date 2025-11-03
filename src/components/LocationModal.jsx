import React, { useState, useEffect } from 'react';

const LocationModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Using OpenStreetMap Nominatim API (free, no API key required)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }

          const data = await response.json();

          const locationData = {
            lat: latitude,
            lng: longitude,
            display_name: data.display_name,
            city: data.address?.city || data.address?.town || data.address?.village,
            state: data.address?.state,
            country: data.address?.country
          };

          setCurrentLocation(locationData);
        } catch (err) {
          setError('Failed to get location details. Please try again.');
          console.error('Location fetch error:', err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const searchLocations = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchLocations(query);
  };

  const handleLocationSelect = (location) => {
    const locationString = location.city && location.state
      ? `${location.city}, ${location.state}`
      : location.display_name.split(',')[0];

    onLocationSelect(locationString);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold gradient-text">Change Location</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Current Location Section */}
          <div className="mb-6">
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="w-full bg-blue-500/80 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 mb-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                  <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-peach"></div>
                  Getting Location...
                </>
              ) : (
                <>
                  📍 Use Current Location
                </>
              )}
            </button>

            {currentLocation && (
              <div className="glass p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-white mb-2">Current Location:</h3>
                <p className="text-white/80 text-sm mb-3">{currentLocation.display_name}</p>
                <button
                  onClick={() => handleLocationSelect(currentLocation)}
                  className="w-full bg-green-500/80 backdrop-blur-sm text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-all duration-300"
                >
                  Use This Location
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 p-4 rounded-lg mb-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Search Section */}
          <div className="mb-4">
            <h3 className="font-semibold text-white mb-3">Or Search for a Location:</h3>
            <input
              type="text"
              placeholder="Search cities, addresses..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-h-48 overflow-y-auto">
              <h4 className="font-semibold text-white mb-2">Search Results:</h4>
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(result)}
                    className="w-full text-left p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10"
                  >
                    <p className="text-white font-medium">{result.display_name.split(',')[0]}</p>
                    <p className="text-white/60 text-sm">{result.display_name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
