// src/app/lib/auth.js
import api from './axios';
import Router from 'next/router';

export const login = async (username, password) => {
  try {
    const response = await api.post('token/', { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    api.defaults.headers.Authorization = `Bearer ${access}`;
    Router.push('/dashboard');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete api.defaults.headers.Authorization;
  Router.push('/login');
};

export const getToken = () => {
  return localStorage.getItem('access_token');
};

export const setToken = (token) => {
  localStorage.setItem('access_token', token);
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      const response = await api.post('token/refresh/', { refresh });
      const { access } = response.data;
      setToken(access);
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      logout(); // Call logout on refresh token error
    }
  };


