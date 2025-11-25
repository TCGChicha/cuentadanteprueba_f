# 🔧 Solución de Problemas con Vercel

## ❌ Problema Principal

**Vercel no es ideal para este proyecto** porque:
- Tienes frontend + backend en el mismo repo
- El backend necesita PostgreSQL persistente
- Las funciones serverless de Vercel tienen limitaciones

## ✅ Solución Recomendada

### Opción 1: Despliegue Separado (RECOMENDADO)

#### 1. Frontend en Vercel
- Solo despliega el frontend (React/Vite)
- Rápido y gratuito
- Perfecto para aplicaciones React

#### 2. Backend en Render.com
- Soporta Node.js + Express
- Incluye PostgreSQL gratuito
- Sin limitaciones de timeout

#### 3. Pasos Rápidos:

**A. Desplegar Backend en Render:**

1. Ve a https://render.com
2. Crea cuenta (puedes usar GitHub)
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio: `carlow222/cuentadante_project`
5. Configuración:
   ```
   Name: cuentadante-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

6. Variables de entorno (Environment):
   ```
   DB_USER=postgres
   DB_HOST=tu-host-de-neon
   DB_NAME=cuentadante_db
   DB_PASSWORD=tu-password
   DB_PORT=5432
   PORT=3000
   NODE_ENV=production
   ```

7. Click "Create Web Service"
8. Espera 5-10 minutos
9. Copia la URL: `https://cuentadante-backend.onrender.com`

**B. Configurar Base de Datos en Neon:**

1. Ve a https://neon.tech
2. Crea cuenta gratuita
3. Click "Create Project"
4. Nombre: `cuentadante-db`
5. Copia el connection string
6. En el dashboard de Neon:
   - Click en "SQL Editor"
   - Pega el contenido de `database/database_cuentadante.sql`
   - Click "Run"

**C. Desplegar Frontend en Vercel:**

1. Ve a https://vercel.com
2. Click "Add New..." → "Project"
3. Importa tu repo de GitHub
4. Configuración:
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. Variables de entorno:
   ```
   VITE_API_URL=https://cuentadante-backend.onrender.com
   ```

6. Click "Deploy"
7. Espera 2-3 minutos
8. ¡Listo! Tu app está en línea

## 🔄 Actualizar URLs en el Código

Antes de desplegar en Vercel, actualiza los componentes:

### Crear archivo `.env.local` (para desarrollo):
```env
VITE_API_URL=http://localhost:3000
```

### Crear archivo `.env.production` (para producción):
```env
VITE_API_URL=https://cuentadante-backend.onrender.com
```

### Actualizar componentes para usar la variable:

**Ejemplo en Dashboard.jsx:**
```javascript
// Al inicio del archivo
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// En el fetch
const response = await fetch(`${API_URL}/api/dashboard/stats`)
```

Repite esto en todos los componentes que hacen fetch.

## 🧪 Probar el Despliegue

### 1. Probar Backend:
```bash
curl https://cuentadante-backend.onrender.com/api/dashboard/stats
```

Deberías ver las estadísticas en JSON.

### 2. Probar Frontend:
- Abre tu URL de Vercel
- Intenta hacer login
- Verifica que cargue los datos

## ⚠️ Problemas Comunes

### Error: "Failed to fetch"
**Causa:** El frontend no puede conectarse al backend

**Solución:**
1. Verifica que la variable `VITE_API_URL` esté configurada en Vercel
2. Verifica que el backend esté corriendo en Render
3. Revisa la consola del navegador para ver la URL exacta

### Error: "CORS"
**Causa:** El backend no permite peticiones del frontend

**Solución:** En `server/index.js`, actualiza CORS:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tu-proyecto.vercel.app'
  ]
}));
```

### Error: "Database connection failed"
**Causa:** El backend no puede conectarse a PostgreSQL

**Solución:**
1. Verifica las variables de entorno en Render
2. Verifica que la base de datos en Neon esté activa
3. Revisa los logs en Render

### Backend muy lento
**Causa:** Render en plan gratuito "duerme" después de 15 minutos

**Solución:**
- Primera carga será lenta (30-60 segundos)
- Después será normal
- Considera plan de pago si necesitas velocidad constante

## 📊 Resumen de Servicios

| Servicio | Propósito | Plan Gratuito | URL |
|----------|-----------|---------------|-----|
| **Vercel** | Frontend | ✅ Ilimitado | vercel.com |
| **Render** | Backend | ✅ 750 hrs/mes | render.com |
| **Neon** | PostgreSQL | ✅ 0.5 GB | neon.tech |

## 🎯 Checklist Final

- [ ] Base de datos creada en Neon
- [ ] Script SQL ejecutado
- [ ] Backend desplegado en Render
- [ ] Variables de entorno configuradas en Render
- [ ] Backend funcionando (probar con curl)
- [ ] URLs actualizadas en el código
- [ ] Frontend desplegado en Vercel
- [ ] Variable VITE_API_URL configurada en Vercel
- [ ] Login funcionando
- [ ] Datos cargando correctamente

## 🚀 Resultado Final

Después de seguir estos pasos tendrás:

- ✅ Frontend en Vercel: `https://tu-proyecto.vercel.app`
- ✅ Backend en Render: `https://cuentadante-backend.onrender.com`
- ✅ Base de datos en Neon
- ✅ Todo funcionando en producción

## 💡 Alternativa: Todo en Render

Si prefieres tener todo en un solo lugar:

1. Despliega frontend y backend en Render
2. Render puede servir archivos estáticos
3. Más simple pero menos optimizado para frontend

## 📞 Ayuda Adicional

Si sigues teniendo problemas:
1. Revisa los logs en Render (Logs tab)
2. Revisa la consola del navegador (F12)
3. Verifica las variables de entorno
4. Prueba los endpoints individualmente

¡Buena suerte con el despliegue! 🎉
