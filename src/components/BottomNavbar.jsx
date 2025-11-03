import React, { useState } from 'react';

const BottomNavbar = ({ cartCount, bookingCount, onLogout, onCartClick }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  return (
    <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/20 backdrop-blur-md animate-slide-in-up">
      <div className="flex justify-around items-center py-3">
        <button className="flex flex-col items-center text-white/80 hover:text-white transition-all duration-300 transform hover:scale-110">
          <span className="text-xl text-dark-peach">🏠</span>
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={onCartClick}
          className="flex flex-col items-center text-white/80 hover:text-white transition-all duration-300 transform hover:scale-110 relative"
        >
          <span className="text-xl text-dark-peach">🛒</span>
          <span className="text-xs font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
        <button className="flex flex-col items-center text-white/80 hover:text-white transition-all duration-300 transform hover:scale-110 relative">
          <span className="text-xl text-dark-peach">📅</span>
          <span className="text-xs font-medium">Bookings</span>
          {bookingCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {bookingCount}
            </span>
          )}
        </button>
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex flex-col items-center text-white/80 hover:text-white transition-all duration-300 transform hover:scale-110 relative"
          >
            <span className="text-xl text-dark-peach">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
          {showProfileDropdown && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 glass rounded-xl shadow-2xl z-20 border border-white/20 animate-fade-in-slide backdrop-blur-md">
              <div className="py-2">
                <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-all duration-200 rounded-lg mx-2 my-1">
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-red-500/20 transition-all duration-200 rounded-lg mx-2 my-1"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowProfileDropdown(false)}
        ></div>
      )}
    </div>
  );
};

export default BottomNavbar;
