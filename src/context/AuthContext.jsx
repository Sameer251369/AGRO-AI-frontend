import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Production Railway URL
  const BASE_URL = 'https://agro-ai-backend-production-8c2e.up.railway.app/api/v1';

  // State initialization with error handling for localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  });
  
  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);

  // Sync state with localStorage whenever user or token changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }, [token]);

  // LOGIN Function
  const login = async (username, password) => {
    const res = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.detail || 'Login failed');
    }

    // Adjusting based on standard DRF Token response
    setUser({ username: data.username || username });
    setToken(data.token);
    return data;
  };

  // REGISTER Function
  const register = async (username, email, password) => {
    const res = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    
    const data = await res.json();
    if (!res.ok) {
      // Handle nested error messages from Django if they exist
      const errorMsg = typeof data === 'object' ? JSON.stringify(data) : data.error;
      throw new Error(errorMsg || 'Register failed');
    }

    // Safety check for nested user object
    if (data.user) {
      setUser({ id: data.user.id, username: data.user.username });
    } else {
      setUser({ username: data.username || username });
    }
    
    setToken(data.token);
    return data;
  };

  // LOGOUT Function
  const logout = async () => {
    if (token) {
      try {
        await fetch(`${BASE_URL}/logout/`, {
          method: 'POST',
          headers: { 
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
        });
      } catch (e) {
        console.error("Logout request failed", e);
      }
    }
    // Always clear local state even if the server request fails
    setUser(null);
    setToken(null);
  };

  const value = { 
    user, 
    token, 
    login, 
    register, 
    logout,
    isAuthenticated: !!token 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;