import React from 'react';

const Cart = ({ cart, onClose, onRemoveFromCart, onProceedToPayment }) => {
  const totalPrice = cart.reduce((total, service) => total + service.price, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white gradient-text">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-white/80 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((service, index) => (
                <div key={index} className="flex justify-between items-center bg-white/10 p-4 rounded-lg">
                  <div>
                    <h3 className="font-bold text-white">{service.name}</h3>
                    <p className="text-white/60">{service.category}</p>
                    <p className="text-green-300 font-bold">${service.price}</p>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(index)}
                    className="text-red-400 hover:text-red-300 text-xl"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold text-white">
                <span>Total:</span>
                <span className="text-green-300">${totalPrice}</span>
              </div>
            </div>

            <button
              onClick={onProceedToPayment}
              className="w-full bg-green-500/80 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-green-500 transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
