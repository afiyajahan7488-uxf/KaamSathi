import React, { useState } from 'react';

const PaymentMethods = ({ onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const methods = [
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  ];

  const handlePayment = () => {
    // Handle payment logic here
    alert(`Payment processed via ${selectedMethod}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
        <div className="space-y-3">
          {methods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{method.icon}</span>
                <span className="font-medium">{method.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={!selectedMethod}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
