import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: attach token if present in localStorage as fallback
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('beeworks_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: handle global errors and 401 redirect
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'An unexpected error occurred';

    if (status === 401) {
      localStorage.removeItem('beeworks_token');
      localStorage.removeItem('beeworks_user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    } else if (status >= 500) {
      toast.error(`Server error: ${message}`);
    }

    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    register: async (data: any) => {
      const res = await apiClient.post('/auth/register', data);
      return res.data;
    },
    login: async (data: any) => {
      const res = await apiClient.post('/auth/login', data);
      return res.data;
    },
    logout: async () => {
      const res = await apiClient.post('/auth/logout');
      return res.data;
    },
    getMe: async () => {
      const res = await apiClient.get('/auth/me');
      return res.data;
    },
  },

  rooms: {
    getAll: async () => {
      const res = await apiClient.get('/rooms');
      return res.data;
    },
    getById: async (id: string) => {
      const res = await apiClient.get(`/rooms/${id}`);
      return res.data;
    },
    create: async (formData: FormData) => {
      const res = await apiClient.post('/rooms', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    uploadAnswerSheet: async (roomId: string, formData: FormData) => {
      const res = await apiClient.post(`/rooms/${roomId}/answer-sheets`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    delete: async (roomId: string) => {
      const res = await apiClient.delete(`/rooms/${roomId}`);
      return res.data;
    },
  },

  evaluations: {
    processSheet: async (sheetId: string) => {
      const res = await apiClient.post(`/evaluations/process/${sheetId}`);
      return res.data;
    },
    overrideStep: async (
      stepId: string,
      data: { awardedMarks: number; maxMarks?: number; stepFeedback: string }
    ) => {
      const res = await apiClient.patch(`/evaluations/step/${stepId}`, data);
      return res.data;
    },
    approveSheet: async (sheetId: string) => {
      const res = await apiClient.post(`/evaluations/sheet/${sheetId}/approve`);
      return res.data;
    },
    getSheet: async (sheetId: string) => {
      const res = await apiClient.get(`/evaluations/sheet/${sheetId}`);
      return res.data;
    },
  },

  analytics: {
    getDashboard: async () => {
      const res = await apiClient.get('/analytics/dashboard');
      return res.data;
    },
  },

  uploads: {
    getPresignedUrl: async (data: { fileName: string; fileType?: string; folder?: string }) => {
      const res = await apiClient.post('/uploads/presigned-url', data);
      return res.data;
    },
    uploadFile: async (formData: FormData) => {
      const res = await apiClient.post('/uploads/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
  },

  payments: {
    subscribe: async (planId: string, totalCount: number = 12) => {
      const res = await apiClient.post('/payments/subscribe', { planId, totalCount });
      return res.data;
    },
    verify: async (payload: {
      razorpay_payment_id: string;
      razorpay_subscription_id: string;
      razorpay_signature: string;
    }) => {
      const res = await apiClient.post('/payments/verify', payload);
      return res.data;
    },
  },
};
