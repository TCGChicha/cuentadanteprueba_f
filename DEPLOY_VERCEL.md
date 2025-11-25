# 🚀 Guía de Despliegue en Vercel

## ⚠️ Importante: Limitaciones de Vercel

Este proyecto tiene **frontend (React) y backend (Node.js/Express)** en el mismo repositorio. Vercel tiene algunas limitaciones:

1. **Vercel es principalmente para frontend** - El backend en Vercel tiene limitaciones
2. **No soporta PostgreSQL directamente** - Necesitas una base de datos externa
3. **Funciones serverless tienen timeout** - Máximo 10 segundos en plan gratuito

## 📋 Opciones de Despliegue

### Opción 1: Solo Frontend en Vercel (Recomendado)

Despliega solo el frontend en Vercel y el backend en otro servicio.

#### Frontend en Vercel:
1. Ve a https://vercel.com
2. Conecta tu repositorio de GitHub
3. Configura el proyecto:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### Backend en Render/Railway/Heroku:
El backend necesita estar en un servicio que soporte:
- Node.js persistente
- PostgreSQL
- Variables de entorno

### Opción 2: Separar Frontend y Backend

Crear dos repositorios separados:

#### Repositorio 1: Frontend
```bash
# Crear nuevo repo solo con frontend
git init cuentadante-frontend
cd cuentadante-frontend

# Copiar archivos del frontend
cp -r ../cuentadante_project/src .
cp -r ../cuentadante_project/public .
cp ../cuentadante_project/index.html .
cp ../cuentadante_project/package.json .
cp ../cuentadante_project/vite.config.js .

# Subir a GitHub
git add .
git commit -m "Initial commit: Frontend"
git remote add origin https://github.com/carlow222/cuentadante-frontend.git
git push -u origin main
```

#### Repositorio 2: Backend
```bash
# Crear nuevo repo solo con backend
git init cuentadante-backend
cd cuentadante-backend

# Copiar archivos del backend
cp -r ../cuentadante_project/server/* .
cp -r ../cuentadante_project/database .

# Subir a GitHub
git add .
git commit -m "Initial commit: Backend"
git remote add origin https://github.com/carlow222/cuentadante-backend.git
git push -u origin main
```

## 🗄️ Base de Datos PostgreSQL

Necesitas una base de datos PostgreSQL en la nube. Opciones gratuitas:

### 1. Neon (Recomendado)
- URL: https://neon.tech
- Plan gratuito: 0.5 GB
- Pasos:
  1. Crear cuenta
  2. Crear nuevo proyecto
  3. Copiar connection string
  4. Ejecutar el script SQL: `database/database_cuentadante.sql`

### 2. Supabase
- URL: https://supabase.com
- Plan gratuito: 500 MB
- Incluye interfaz gráfica

### 3. ElephantSQL
- URL: https://www.elephantsql.com
- Plan gratuito: 20 MB

### 4. Railway
- URL: https://railway.app
- Plan gratuito con límites

## 🔧 Configuración Paso a Paso

### Paso 1: Configurar Base de Datos

1. Crear cuenta en Neon (o tu preferencia)
2. Crear nueva base de datos
3. Obtener connection string:
   ```
   postgresql://user:password@host:5432/database
   ```
4. Conectar y ejecutar el script SQL

### Paso 2: Desplegar Backend (Render.com)

1. Ve a https://render.com
2. Conecta tu GitHub
3. Crear nuevo "Web Service"
4. Configuración:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Environment Variables:**
     ```
     DB_USER=tu_usuario
     DB_HOST=tu_host_neon
     DB_NAME=tu_database
     DB_PASSWORD=tu_password
     DB_PORT=5432
     PORT=3000
     NODE_ENV=production
     ```

### Paso 3: Desplegar Frontend (Vercel)

1. Ve a https://vercel.com
2. Importar proyecto desde GitHub
3. Configuración:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. Variables de entorno:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```

### Paso 4: Actualizar URLs en el Frontend

Crear archivo `src/config.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
```

Actualizar los fetch en los componentes:
```javascript
import { API_URL } from '../config'

// Antes:
fetch('http://localhost:3000/api/requests')

// Después:
fetch(`${API_URL}/api/requests`)
```

## 📝 Checklist de Despliegue

### Backend:
- [ ] Base de datos PostgreSQL creada
- [ ] Script SQL ejecutado
- [ ] Variables de entorno configuradas
- [ ] Backend desplegado y funcionando
- [ ] Endpoints accesibles

### Frontend:
- [ ] Variables de entorno configuradas
- [ ] URLs actualizadas al backend en producción
- [ ] Build exitoso
- [ ] Frontend desplegado
- [ ] Conexión con backend funcionando

## 🔒 Seguridad

### Variables de Entorno en Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agregar:
   - `VITE_API_URL` = URL de tu backend

### Variables de Entorno en Render:
1. Ve a tu servicio en Render
2. Environment → Add Environment Variable
3. Agregar todas las variables de `.env`

## 🧪 Probar el Despliegue

1. **Backend:**
   ```bash
   curl https://tu-backend.onrender.com/api/dashboard/stats
   ```

2. **Frontend:**
   - Abrir https://tu-proyecto.vercel.app
   - Intentar login
   - Verificar que carga datos

## ⚡ Alternativa Rápida: Vercel con Backend Serverless

Si quieres intentar con Vercel completo (con limitaciones):

### 1. Actualizar `server/index.js`:
```javascript
// Al final del archivo, agregar:
export default app;
```

### 2. Crear `api/index.js`:
```javascript
import app from '../server/index.js';

export default app;
```

### 3. Variables de entorno en Vercel:
- Agregar todas las variables de PostgreSQL
- Usar una base de datos externa (Neon, Supabase, etc.)

### Limitaciones:
- ⚠️ Timeout de 10 segundos
- ⚠️ No hay estado persistente
- ⚠️ Cold starts (arranque lento)

## 🎯 Recomendación Final

**Para este proyecto, lo mejor es:**

1. **Frontend en Vercel** ✅
   - Rápido y gratuito
   - Perfecto para React/Vite

2. **Backend en Render** ✅
   - Soporta Node.js persistente
   - Plan gratuito disponible
   - Fácil de configurar

3. **Base de datos en Neon** ✅
   - PostgreSQL gratuito
   - Fácil de usar
   - Buen rendimiento

## 📞 Ayuda

Si tienes problemas:
1. Revisa los logs en Vercel/Render
2. Verifica las variables de entorno
3. Prueba los endpoints individualmente
4. Revisa la consola del navegador

## 🔗 Enlaces Útiles

- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Neon: https://neon.tech/docs
- Vite: https://vitejs.dev/guide/env-and-mode.html
