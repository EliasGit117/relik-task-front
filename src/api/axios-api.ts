import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  async config => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
