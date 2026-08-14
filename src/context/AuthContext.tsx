// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  rememberMe: boolean;
  login: (username: string, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth_state');
    if (savedAuth) {
      try {
        const { isLoggedIn: logged, username: user, rememberMe: remember } = JSON.parse(savedAuth);
        setIsLoggedIn(logged);
        setUsername(user);
        setRememberMe(remember);
      } catch (e) {
        console.error('Failed to restore auth state:', e);
      }
    }
  }, []);

  const login = (username: string, rememberMe: boolean) => {
    setUsername(username);
    setIsLoggedIn(true);
    setRememberMe(rememberMe);

    if (rememberMe) {
      localStorage.setItem('auth_state', JSON.stringify({
        isLoggedIn: true,
        username,
        rememberMe: true,
      }));
    }
  };

  const logout = () => {
    setUsername(null);
    setIsLoggedIn(false);
    setRememberMe(false);
    localStorage.removeItem('auth_state');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, rememberMe, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
