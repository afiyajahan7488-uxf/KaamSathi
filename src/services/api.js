const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiRequest('/services'),

  getByCategory: (category) => apiRequest(`/services/category/${category}`),
};

// Cart API
export const cartAPI = {
  getCart: () => apiRequest('/cart'),

  addToCart: (serviceId, quantity = 1) => apiRequest('/cart', {
    method: 'POST',
    body: JSON.stringify({ serviceId, quantity }),
  }),

  removeFromCart: (cartId) => apiRequest(`/cart/${cartId}`, {
    method: 'DELETE',
  }),
};

// Bookings API
export const bookingsAPI = {
  getBookings: () => apiRequest('/bookings'),

  createBooking: (serviceId) => apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify({ serviceId }),
  }),
};
