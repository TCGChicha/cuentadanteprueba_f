# 🔄 Actualizar URLs de API en el Frontend

## 📝 Archivos que necesitan actualización

Para que el frontend funcione en producción, necesitas actualizar las URLs en estos componentes:

### 1. Dashboard.jsx
```javascript
// Línea ~25
// Antes:
const response = await fetch('http://localhost:3000/api/dashboard/stats')

// Después:
import { API_URL } from '../config'
const response = await fetch(`${API_URL}/api/dashboard/stats`)
```

### 2. NuevaSolicitud.jsx
```javascript
// Línea ~20
// Antes:
const response = await fetch('http://localhost:3000/api/assets')

// Después:
import { API_URL } from '../config'
const response = await fetch(`${API_URL}/api/assets`)

// Línea ~50
// Antes:
const response = await fetch('http://localhost:3000/api/requests/create', {

// Después:
const response = await fetch(`${API_URL}/api/requests/create`, {
```

### 3. SolicitudesPendientes.jsx
```javascript
// Línea ~18
// Antes:
const response = await fetch('http://localhost:3000/api/requests')

// Después:
import { API_URL } from '../config'
const response = await fetch(`${API_URL}/api/requests`)

// Línea ~30
// Antes:
const response = await fetch(`http://localhost:3000/api/requests/${selectedSolicitud.id}/approve`, {

// Después:
const response = await fetch(`${API_URL}/api/requests/${selectedSolicitud.id}/approve`, {

// Línea ~55
// Antes:
const response = await fetch(`http://localhost:3000/api/requests/${selectedSolicitud.id}/reject`, {

// Después:
const response = await fetch(`${API_URL}/api/requests/${selectedSolicitud.id}/reject`, {
```

### 4. Inventario.jsx
```javascript
// Buscar todas las instancias de:
'http://localhost:3000/api/assets'

// Reemplazar con:
import { API_URL } from '../config'
`${API_URL}/api/assets`
```

### 5. BienesAsignados.jsx
```javascript
// Buscar todas las instancias de:
'http://localhost:3000/api/assets'

// Reemplazar con:
import { API_URL } from '../config'
`${API_URL}/api/assets`
```

### 6. Historial.jsx
```javascript
// Buscar todas las instancias de:
'http://localhost:3000/api/requests'

// Reemplazar con:
import { API_URL } from '../config'
`${API_URL}/api/requests`
```

### 7. MovimientosBienes.jsx
```javascript
// Buscar todas las instancias de:
'http://localhost:3000/api/movements'

// Reemplazar con:
import { API_URL } from '../config'
`${API_URL}/api/movements`
```

### 8. Login.jsx
```javascript
// Línea ~30
// Antes:
const response = await fetch('http://localhost:3000/api/auth/login', {

// Después:
import { API_URL } from '../config'
const response = await fetch(`${API_URL}/api/auth/login`, {
```

## 🔍 Buscar y Reemplazar Rápido

Puedes usar el buscador de tu editor (Ctrl+Shift+F o Cmd+Shift+F) para:

**Buscar:** `'http://localhost:3000`

**Reemplazar con:** `\`${API_URL}`

Luego agregar al inicio de cada archivo:
```javascript
import { API_URL } from '../config'
```

## ✅ Verificación

Después de actualizar, verifica que:
1. Todos los archivos importen `API_URL`
2. Todas las URLs usen template literals con `${API_URL}`
3. No queden URLs hardcodeadas de localhost

## 🧪 Probar Localmente

Antes de desplegar, prueba que funcione localmente:

1. Crear archivo `.env.local`:
```env
VITE_API_URL=http://localhost:3000
```

2. Reiniciar el servidor de desarrollo:
```bash
npm run dev
```

3. Verificar que todo funcione igual

## 🚀 Para Producción

En Vercel, configurar la variable de entorno:
```
VITE_API_URL=https://tu-backend.onrender.com
```

¡Listo! El frontend ahora usará la URL correcta según el entorno.
