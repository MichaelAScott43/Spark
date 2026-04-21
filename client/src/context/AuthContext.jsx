import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('anchor_user');
    return raw ? JSON.parse(raw) : null;
  });

  const saveAuth = (payload) => {
    localStorage.setItem('anchor_token', payload.token);
    localStorage.setItem('anchor_user', JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const register = async (email, password) => {
    const { data } = await api.post('/auth/register', { email, password });
    saveAuth(data);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    saveAuth(data);
  };

  const logout = () => {
    localStorage.removeItem('anchor_token');
    localStorage.removeItem('anchor_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, register, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
