// src/api/axios.js
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

// -- просьба к бэку: не шлём токен на /auth/*
api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  const isAuth = config.url?.startsWith('/auth/');
  if (t && !isAuth) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

// -- единообразный выход в логин при 401 c НЕ /auth/*
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || '';
    if (status === 401 && !url.startsWith('/auth/')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      window.location.replace('/login');
      return; // прерываем
    }
    return Promise.reject(err);
  }
);

export default api; // <-- ОБЯЗАТЕЛЬНО!
