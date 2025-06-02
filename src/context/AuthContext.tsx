import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: Omit<User, 'id'> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    role: 'farmer',
  });
  const navigate = useNavigate();
  
  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would call an API to authenticate
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: 'Ravi Kumar',
      email,
      role: 'farmer',
    });
  };
  
  const logout = (): void => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };
  
  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<void> => {
    // In a real app, this would call an API to register the user
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};