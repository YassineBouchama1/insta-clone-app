import React, { createContext, useState, useContext, useEffect, useLayoutEffect } from 'react';
import { getData, storeData, removeData } from '../utils/storage';
import { AuthError, LoginSchema } from '~/types/auth';
import { router } from 'expo-router';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  acceptedTerms: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  handleAcceptedTerms: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const checkAuth = async () => {
    try {
      const token = await getData('authToken');
      const acceptedTerms = await getData('acceptedTerms'); // chekc if user accept terms
      setIsAuthenticated(!!token);
      setAcceptedTerms(!!acceptedTerms);

    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };





  // handle AcceptedTerms function to store the accepted terms in AsyncStorage
  const handleAcceptedTerms = async () => {
    try {
      await storeData('acceptedTerms', true);
      setAcceptedTerms(true);
    } catch (error) {
      console.error('Error accepting terms:', error);
    }
  };


  const login = async (username: string, password: string) => {
    try {



      //TODO : Added Validation with Zod
      const validatedCredentials = LoginSchema.safeParse({ username, password });

      if (!validatedCredentials.success) {
        throw new AuthError(
          'Validation failed',
          'VALIDATION_ERROR',
          validatedCredentials.error.flatten().fieldErrors
        );
      }




      await storeData('authToken', 'dummy-token');
      setIsAuthenticated(true);


    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };



  const logout = async () => {
    try {
      await removeData('authToken');
      await removeData('acceptedTerms');
      setIsAuthenticated(false);
      setAcceptedTerms(false);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };



  useLayoutEffect(() => {
    checkAuth();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        acceptedTerms,
        login,
        logout,
        checkAuth,
        handleAcceptedTerms,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
