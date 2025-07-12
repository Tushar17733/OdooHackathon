import axios from 'axios';

// Base URL for your backend API
// <--- UPDATED LINE BELOW
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/auth';


const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;