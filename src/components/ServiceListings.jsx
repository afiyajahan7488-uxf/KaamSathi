import React from 'react';

const ServiceListings = ({ selectedCategory, searchFilters, addToCart, bookService }) => {
  const services = [
    { id: 1, name: 'John Doe', category: 'Plumber', price: 50, days: 1, rating: 4.5 },
    { id: 2, name: 'Jane Smith', category: 'Carpenter', price: 75, days: 2, rating: 4.8 },
    { id: 3, name: 'Bob Johnson', category: 'Plumber', price: 60, days: 1, rating: 4.2 },
    { id: 4, name: 'Alice Brown', category: 'Carpenter', price: 80, days: 3, rating: 4.7 },
  ];

  const filteredServices = services.filter(service => {
    // Category filter
    if (selectedCategory && service.category !== selectedCategory) {
      return false;
    }

    // Search term filter
    if (searchFilters?.searchTerm) {
      const searchLower = searchFilters.searchTerm.toLowerCase();
      if (!service.name.toLowerCase().includes(searchLower) &&
          !service.category.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Price range filter
    if (searchFilters?.priceRange) {
      const [minPrice, maxPrice] = searchFilters.priceRange;
      if (service.price < minPrice || service.price > maxPrice) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-white text-center gradient-text">Available Service Providers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            className={`glass p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
              index % 5 === 0 ? 'animate-stagger-1' :
              index % 5 === 1 ? 'animate-stagger-2' :
              index % 5 === 2 ? 'animate-stagger-3' :
              index % 5 === 3 ? 'animate-stagger-4' :
              'animate-stagger-5'
            }`}
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-dark-peach">👨‍🔧</span>
              </div>
              <h3 className="font-bold text-xl text-white">{service.name}</h3>
              <p className="text-white/80 font-medium">{service.category}</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <span className="text-2xl font-bold text-green-300">${service.price}</span>
                <p className="text-white/60 text-sm">per service</p>
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-blue-300">{service.days}</span>
                <p className="text-white/60 text-sm">day(s)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(service)}
                className="flex-1 bg-blue-500/80 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => bookService(service)}
                className="flex-1 bg-green-500/80 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-green-500 transition-all duration-300 transform hover:scale-105"
              >
                📅 Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListings;
