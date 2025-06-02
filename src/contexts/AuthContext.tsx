import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
  id: string;
  name: string;
  role: 'staff' | 'owner';
}

interface AuthContextType {
  user: User | null;
  login: (name: string, pin: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('pos_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log('Restored user session:', parsedUser);
      } catch (e) {
        console.error('Error parsing saved user:', e);
        localStorage.removeItem('pos_user');
      }
    }
  }, []);

  const login = async (name: string, pin: string): Promise<boolean> => {
    console.log('Login attempt:', { name, pin });
    
    // Only allow static credentials
    if (name.trim().toLowerCase() === 'staff' && pin === '1234') {
      console.log('Login successful');
      const newUser = {
        id: '1',
        name: 'staff',
        role: 'staff',
      } as User;
      
      // Save to localStorage first
      localStorage.setItem('pos_user', JSON.stringify(newUser));
      
      // Then update state
      setUser(newUser);
      setIsAuthenticated(true);
      
      console.log('User state updated:', { user: newUser, isAuthenticated: true });
      return true;
    }
    
    console.log('Login failed');
    return false;
  };

  const logout = () => {
    localStorage.removeItem('pos_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};