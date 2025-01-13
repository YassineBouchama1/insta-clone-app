import React, { createContext, useState, useContext, useEffect, useLayoutEffect } from 'react';
import { getData, storeData, removeData } from '../utils/storage';
import { AuthError, LoginSchema } from '~/types/auth';
import { router } from 'expo-router';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '~/utils/firebase';
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await getData('authToken');
      const acceptedTerms = await getData('acceptedTerms'); // chekc if user accept terms
      setIsAuthenticated(!!token);

    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };







  const login = async (email: string, password: string) => {
    try {
      const validatedCredentials = LoginSchema.safeParse({ email, password });
  
      if (!validatedCredentials.success) {
        throw new AuthError(
          'Validation failed',
          'VALIDATION_ERROR',
          validatedCredentials.error.flatten().fieldErrors
        );
      }
  
      // login with firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user) {
        await storeData('authToken', await user.getIdToken());
        setIsAuthenticated(true);
      }
  
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };



  const logout = async () => {
    try {
      await removeData('authToken');
      await removeData('acceptedTerms');

      signOut(auth)
      setIsAuthenticated(false);

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
        login,
        logout,
        checkAuth,
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
