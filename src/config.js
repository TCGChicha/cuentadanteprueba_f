// Configuración de la API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Configuración de la aplicación
export const APP_CONFIG = {
  apiUrl: API_URL,
  apiTimeout: 10000, // 10 segundos
  environment: import.meta.env.MODE || 'development'
}

export default APP_CONFIG
