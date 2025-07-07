import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favoriteGradients: string[];
  createdGradients: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  addToFavorites: (gradientId: string) => void;
  removeFromFavorites: (gradientId: string) => void;
  isFavorite: (gradientId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('gradient-gallery-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        favoriteGradients: [],
        createdGradients: []
      };
      setUser(mockUser);
      localStorage.setItem('gradient-gallery-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        favoriteGradients: [],
        createdGradients: []
      };
      setUser(mockUser);
      localStorage.setItem('gradient-gallery-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gradient-gallery-user');
  };

  const addToFavorites = (gradientId: string) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      favoriteGradients: [...user.favoriteGradients, gradientId]
    };
    setUser(updatedUser);
    localStorage.setItem('gradient-gallery-user', JSON.stringify(updatedUser));
  };

  const removeFromFavorites = (gradientId: string) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      favoriteGradients: user.favoriteGradients.filter(id => id !== gradientId)
    };
    setUser(updatedUser);
    localStorage.setItem('gradient-gallery-user', JSON.stringify(updatedUser));
  };

  const isFavorite = (gradientId: string): boolean => {
    return user?.favoriteGradients.includes(gradientId) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}