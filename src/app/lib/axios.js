// src/app/lib/axios.js
import axios from 'axios';

console.log('API URL:', process.env.NEXT_PUBLIC_API_URL); // Verificar se a variável está sendo lida corretamente

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL base do backend Django vinda do .env
});

export default api;
