# Comparación: Vite/React vs Next.js

## 📊 Tabla Comparativa

| Aspecto | Vite/React (Antes) | Next.js (Ahora) |
|---------|-------------------|-----------------|
| **Servidor** | Express separado (puerto 3000) | Integrado en Next.js |
| **Frontend** | Vite dev server (puerto 5173) | Next.js dev server (puerto 3000/3001) |
| **Procesos** | 2 procesos separados | 1 proceso único |
| **API Routes** | Express routes en `/server/routes/` | Next.js API routes en `/app/api/` |
| **Base de datos** | PostgreSQL (igual) | PostgreSQL (igual) |
| **Inicio** | `cd server && npm start` + `npm run dev` | `npm run dev` |
| **Build** | `npm run build` (solo frontend) | `npm run build` (todo incluido) |
| **Deploy** | Necesita 2 deploys separados | 1 deploy único |
| **Optimización** | Manual | Automática |
| **SSR** | No disponible | Disponible |
| **Imágenes** | Sin optimización | Optimización automática |

## 🔄 Cambios en la Estructura

### Antes (Vite):
```
proyecto/
├── server/                    # Backend Express
│   ├── routes/               # Rutas API
│   ├── db.js                 # Conexión DB
│   ├── index.js              # Servidor Express
│   └── package.json          # Dependencias backend
├── src/                      # Frontend React
│   ├── components/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
├── package.json              # Dependencias frontend
└── vite.config.js
```

### Ahora (Next.js):
```
nextjs-cuentadante/
├── app/                      # App Router
│   ├── api/                  # API Routes (backend integrado)
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/               # Componentes React
├── contexts/                 # Contextos
├── lib/
│   └── db.js                # Conexión DB
├── public/                   # Assets
├── package.json              # Todas las dependencias
└── next.config.js
```

## 🚀 Flujo de Trabajo

### Antes (Vite + Express):

#### Desarrollo:
```bash
# Terminal 1 - Backend
cd server
npm install
npm start                     # Puerto 3000

# Terminal 2 - Frontend  
npm install
npm run dev                   # Puerto 5173
```

#### Producción:
```bash
# Backend
cd server
npm start

# Frontend (separado)
npm run build
# Servir con nginx/apache
```

### Ahora (Next.js):

#### Desarrollo:
```bash
npm install
npm run dev                   # Puerto 3000 (todo incluido)
```

#### Producción:
```bash
npm run build
npm start
# O deploy en Vercel con un comando
```

## 📡 Rutas API

### Antes (Express):
```javascript
// server/routes/auth.routes.js
router.post('/login', async (req, res) => {
  // Lógica de login
})

// Acceso: http://localhost:3000/api/auth/login
```

### Ahora (Next.js):
```javascript
// app/api/auth/login/route.js
export async function POST(request) {
  // Lógica de login
}

// Acceso: http://localhost:3000/api/auth/login
```

## 🎨 Componentes

### Cambios mínimos:

#### Antes:
```javascript
import { useBienes } from '../context/BieneContext'
```

#### Ahora:
```javascript
'use client'  // Solo esta línea adicional

import { useBienes } from '@/contexts/BieneContext'
```

## 💾 Base de Datos

### Conexión (sin cambios significativos):

#### Antes:
```javascript
// server/db.js
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  // ...
})
```

#### Ahora:
```javascript
// lib/db.js
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: process.env.DB_USER,
  // ...
})
```

## 🔐 Variables de Entorno

### Antes:
```
# server/.env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cuentadante
DB_PASSWORD=chi123cha456
DB_PORT=5432
PORT=3000
```

### Ahora:
```
# .env.local
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cuentadante
DB_PASSWORD=chi123cha456
DB_PORT=5432
```

## 📦 Dependencias

### Antes (2 package.json):

#### Frontend:
```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "lucide-react": "^0.554.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^5.0.4"
  }
}
```

#### Backend:
```json
{
  "dependencies": {
    "express": "^4.19.2",
    "cors": "^2.8.5",
    "pg": "^8.11.5",
    "dotenv": "^16.4.5"
  }
}
```

### Ahora (1 package.json):
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.554.0",
    "pg": "^8.11.5"
  }
}
```

## ⚡ Rendimiento

### Vite:
- ✅ Hot Module Replacement rápido
- ✅ Build optimizado con Rollup
- ❌ Sin SSR
- ❌ Sin optimización de imágenes
- ❌ Sin code splitting automático

### Next.js:
- ✅ Fast Refresh (similar a HMR)
- ✅ Build optimizado con Webpack/Turbopack
- ✅ SSR/SSG disponible
- ✅ Optimización automática de imágenes
- ✅ Code splitting automático
- ✅ Prefetching de rutas
- ✅ Caché inteligente

## 🌐 Deploy

### Antes (Vite + Express):

#### Opciones:
1. **Frontend**: Netlify, Vercel, GitHub Pages
2. **Backend**: Heroku, Railway, DigitalOcean
3. **Problema**: Necesitas 2 deploys separados y configurar CORS

#### Pasos:
```bash
# Frontend
npm run build
# Subir dist/ a Netlify

# Backend
# Subir a Heroku/Railway
# Configurar variables de entorno
# Configurar CORS para el frontend
```

### Ahora (Next.js):

#### Opciones:
- Vercel (1 comando)
- Netlify
- Railway
- Render
- AWS Amplify
- DigitalOcean

#### Pasos:
```bash
# Todo en uno
vercel
# O conectar repo en Vercel dashboard
```

## 💰 Costos

### Antes:
- Frontend: Gratis (Netlify/Vercel)
- Backend: $5-10/mes (Heroku/Railway)
- **Total: $5-10/mes**

### Ahora:
- Todo incluido: Gratis (Vercel hobby plan)
- **Total: $0/mes** (para proyectos pequeños)

## 🎯 Conclusión

### Ventajas de Next.js:
1. ✅ Más simple (1 proceso vs 2)
2. ✅ Más rápido de desarrollar
3. ✅ Mejor rendimiento
4. ✅ Deploy más fácil
5. ✅ Más económico
6. ✅ Mejor DX (Developer Experience)
7. ✅ Escalable

### Cuándo usar Vite + Express:
- Necesitas un backend muy complejo
- Quieres separación total frontend/backend
- Tienes múltiples frontends para el mismo backend
- Necesitas WebSockets complejos

### Cuándo usar Next.js:
- Aplicación full-stack moderna
- Quieres simplicidad
- Necesitas SSR/SEO
- Quieres deploy fácil
- **Tu caso actual** ✅

## 📈 Migración Exitosa

Tu proyecto ahora tiene:
- ✅ Todas las funcionalidades originales
- ✅ Mismo diseño y colores SENA
- ✅ Mejor arquitectura
- ✅ Más fácil de mantener
- ✅ Más fácil de deployar
- ✅ Mejor rendimiento

¡La migración fue un éxito! 🎉
