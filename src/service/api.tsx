import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  let basicToken: string | null = null;

  try {
    const raw = localStorage.getItem('@jobpost:user');
    if (raw) {
      const stored = JSON.parse(raw);
      basicToken = stored.token ?? null; 
    }
  } catch {
    basicToken = null;
  }

  const isRegisterRoute = config.url?.includes('/register');

  if (basicToken && !isRegisterRoute) {
    config.headers.Authorization = `Basic ${basicToken}`;
  }  
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data && typeof error.response.data === 'string') {
      error.response.data = { message: error.response.data };
    }
    return Promise.reject(error);
  }
);

export default api;