 import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app load
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSetIsLoggedIn = (value) => {
    setIsLoggedIn(value);
    localStorage.setItem('isLoggedIn', value.toString());
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      {isLoggedIn ? (
        <>
          <div className="flex-1">
            <Home setIsLoggedIn={handleSetIsLoggedIn} isLoggedIn={isLoggedIn} />
          </div>
          <Footer />
        </>
      ) : showRegister ? (
        <Register setIsLoggedIn={handleSetIsLoggedIn} setShowRegister={setShowRegister} />
      ) : (
        <Login setIsLoggedIn={handleSetIsLoggedIn} setShowRegister={setShowRegister} />
      )}
    </div>
  );
}

export default App;
