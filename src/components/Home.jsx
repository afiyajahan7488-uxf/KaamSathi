import React, { useState } from 'react';
import TopBanner from './TopBanner';
import SearchBar from './SearchBar';
import CategoryCards from './CategoryCards';
import ServiceListings from './ServiceListings';
import BottomNavbar from './BottomNavbar';
import PaymentMethods from './PaymentMethods';
import Cart from './Cart';

const Home = ({ setIsLoggedIn, isLoggedIn }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    priceRange: [0, 1000],
    date: ''
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const addToCart = (service) => {
    setCart([...cart, service]);
  };

  const bookService = (service) => {
    addToCart(service);
    setShowCart(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleProceedToPayment = () => {
    setShowCart(false);
    setShowPayment(true);
  };

  return (
    <div className="flex-1">
      <TopBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <SearchBar onSearch={handleSearch} />
      <CategoryCards setSelectedCategory={setSelectedCategory} />
      <ServiceListings
        selectedCategory={selectedCategory}
        searchFilters={searchFilters}
        addToCart={addToCart}
        bookService={bookService}
      />
      {showPayment && (
        <PaymentMethods onClose={() => setShowPayment(false)} />
      )}
      <BottomNavbar
        cartCount={cart.length}
        bookingCount={0}
        onLogout={handleLogout}
        onCartClick={handleCartClick}
      />
      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemoveFromCart={removeFromCart}
          onProceedToPayment={handleProceedToPayment}
        />
      )}
    </div>
  );
};

export default Home;
