# Inicio Rápido - Sistema de Gestión de Bienes SENA (Next.js)

## Pasos para ejecutar el proyecto

### 1. Verificar PostgreSQL

Asegúrate de que PostgreSQL esté corriendo y que la base de datos `cuentadante` esté creada con todas las tablas.

### 2. Configurar variables de entorno

El archivo `.env.local` ya está configurado con:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cuentadante
DB_PASSWORD=chi123cha456
DB_PORT=5432
```

Si tu configuración es diferente, edita este archivo.

### 3. Instalar dependencias (si no lo has hecho)

```bash
npm install
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 5. Abrir en el navegador

Abre [http://localhost:3000](http://localhost:3000)

### 6. Iniciar sesión

Usa las credenciales:
- **Email:** `cuentadante@sistema.edu.co`
- **Password:** `cuentadante_1`

## Comandos disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm start` - Ejecutar en modo producción
- `npm run lint` - Verificar código

## Diferencias con la versión Vite

### ✅ Ventajas de Next.js

1. **Servidor integrado**: No necesitas ejecutar un servidor Express separado
2. **API Routes**: Las rutas de API están en `app/api/` y se ejecutan automáticamente
3. **Optimización automática**: Next.js optimiza imágenes, código y assets
4. **Deploy sencillo**: Puedes deployar fácilmente en Vercel, Netlify, etc.
5. **Mejor rendimiento**: Server-side rendering y optimizaciones automáticas

### 📁 Estructura simplificada

```
Antes (Vite):
- Ejecutar servidor: cd server && npm start
- Ejecutar frontend: npm run dev
- Dos procesos separados

Ahora (Next.js):
- Ejecutar todo: npm run dev
- Un solo proceso
```

### 🔌 API Routes

Las rutas de API están en:
- `/api/auth/login` - Login
- `/api/requests` - Solicitudes
- `/api/assets` - Bienes
- `/api/movements` - Movimientos
- `/api/dashboard/stats` - Estadísticas
- `/api/cereals` - Cereales
- `/api/users` - Usuarios

Todo funciona automáticamente sin configuración adicional.

## Solución de problemas

### Error de conexión a la base de datos

Verifica que:
1. PostgreSQL esté corriendo
2. La base de datos `cuentadante` exista
3. Las credenciales en `.env.local` sean correctas
4. El puerto 5432 esté disponible

### Error "Cannot find module"

Ejecuta:
```bash
npm install
```

### Puerto 3000 ocupado

Cambia el puerto:
```bash
PORT=3001 npm run dev
```

## Próximos pasos

Una vez que el sistema esté funcionando:

1. Explora el dashboard
2. Crea nuevas solicitudes
3. Aprueba/rechaza solicitudes pendientes
4. Revisa el inventario de bienes
5. Consulta el historial de movimientos

¡Todo está listo para usar! 🚀
