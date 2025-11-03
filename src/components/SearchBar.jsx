import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch({
      searchTerm,
      priceRange,
      date
    });
  };

  return (
    <div className="glass p-4 shadow-xl m-4 rounded-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          />
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="w-20 accent-white"
            />
            <span className="text-white font-semibold">${priceRange[0]} - ${priceRange[1]}</span>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-dark-peach">🔍</span> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
