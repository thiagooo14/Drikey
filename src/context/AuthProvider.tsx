import React, { useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/authService';
import { AuthContext } from './AuthContext';
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  AuthContextType,
} from '../types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário já está autenticado ao carregar a página
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    try {
      const response = await authService.login(credentials);

      if (response.success && response.user) {
        setUser(response.user);
      }

      return response;
    } catch {
      return {
        success: false,
        error: 'Erro inesperado durante o login',
      };
    }
  };

  const register = async (
    credentials: RegisterCredentials
  ): Promise<AuthResponse> => {
    try {
      const response = await authService.register(credentials);

      if (response.success && response.user) {
        setUser(response.user);
      }

      return response;
    } catch {
      return {
        success: false,
        error: 'Erro inesperado durante o registro',
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
