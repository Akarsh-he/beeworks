import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'TEACHER' | 'ADMIN' | 'STUDENT' | 'School Admin' | 'Teacher';
  schoolName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; name: string; role?: string; schoolName?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('beeworks_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuthStatus = async () => {
    try {
      const res = await api.auth.getMe();
      if (res.success && res.user) {
        const normalizedUser: User = {
          id: res.user.id,
          email: res.user.email,
          name: res.user.name,
          role: res.user.role,
          schoolName: res.user.schoolName || 'BeeWorks Partner School',
        };
        setUser(normalizedUser);
        localStorage.setItem('beeworks_user', JSON.stringify(normalizedUser));
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem('beeworks_user');
      localStorage.removeItem('beeworks_token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await api.auth.login({ email, password });
      if (res.success && res.user) {
        const normalizedUser: User = {
          id: res.user.id,
          email: res.user.email,
          name: res.user.name,
          role: res.user.role,
          schoolName: res.user.schoolName || 'BeeWorks Partner School',
        };
        setUser(normalizedUser);
        if (res.token) {
          localStorage.setItem('beeworks_token', res.token);
        }
        localStorage.setItem('beeworks_user', JSON.stringify(normalizedUser));
        toast.success(`Welcome back, ${normalizedUser.name}!`);
        return true;
      }
      return false;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { email: string; password: string; name: string; role?: string; schoolName?: string }): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await api.auth.register(data);
      if (res.success && res.user) {
        const normalizedUser: User = {
          id: res.user.id,
          email: res.user.email,
          name: res.user.name,
          role: res.user.role,
          schoolName: data.schoolName || 'BeeWorks Partner School',
        };
        setUser(normalizedUser);
        if (res.token) {
          localStorage.setItem('beeworks_token', res.token);
        }
        localStorage.setItem('beeworks_user', JSON.stringify(normalizedUser));
        toast.success('Registration successful!');
        return true;
      }
      return false;
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Registration failed.';
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (e) {
      // Ignore API logout errors
    } finally {
      setUser(null);
      localStorage.removeItem('beeworks_user');
      localStorage.removeItem('beeworks_token');
      toast.info('Logged out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
