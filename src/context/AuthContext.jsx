import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Use your Railway production URL
  const BASE_URL = 'https://agro-ai-backend-production-8c2e.up.railway.app/api/v1';

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('auth_user')) || null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);

  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  }, [token]);

  const login = async (username, password) => {
    // Updated to /v1/login/
    const res = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    setUser({ id: data.user.id, username: data.user.username, email: data.user.email });
    setToken(data.token);
    return data;
  };

  const register = async (username, email, password) => {
    // Updated to /v1/register/
    const res = await fetch(`${BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Register failed');
    
    setUser({ id: data.user.id, username: data.user.username, email: data.user.email });
    setToken(data.token);
    return data;
  };

  const logout = async () => {
    try {
      // Updated to /v1/logout/
      await fetch(`${BASE_URL}/logout/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}` },
      });
    } catch (e) {
      console.error("Logout failed on server", e);
    }
    setUser(null);
    setToken(null);
  };

  const value = { user, token, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;