import { createSlice } from '@reduxjs/toolkit';

// Utility function to get the user from sessionStorage
const getUserFromSessionStorage = () => {
    const user = sessionStorage.getItem('user');
    
    // Safely handle the case when 'user' is undefined or null
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user from sessionStorage:", error);
      return null;
    }
  };
  

// Initial state based on sessionStorage
const initialState = {
  user: getUserFromSessionStorage(),
  token: sessionStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

// Authentication slice
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      sessionStorage.setItem('user', JSON.stringify(user));  // Save user in sessionStorage
      sessionStorage.setItem('token', token);               // Save token in sessionStorage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('user');   // Remove user from sessionStorage
      sessionStorage.removeItem('token');  // Remove token from sessionStorage
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Actions
export const { login, logout, setStatus, setError } = authenticationSlice.actions;

// Reducer
export default authenticationSlice.reducer;
