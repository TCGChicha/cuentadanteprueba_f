# 📦 Sistema de Gestión de Bienes - SENA Cuentadante

Sistema web para la gestión y control de bienes institucionales del SENA, diseñado específicamente para el rol de Cuentadante.

## 🎯 Características Principales

- ✅ **Gestión de Solicitudes**: Crear, aprobar y rechazar solicitudes de bienes
- 📦 **Inventario de Bienes**: Control completo de bienes disponibles y asignados
- 📊 **Dashboard Estadístico**: Visualización en tiempo real del estado del inventario
- 🔄 **Historial de Movimientos**: Registro detallado de asignaciones y devoluciones
- 🔐 **Autenticación Segura**: Sistema de login para cuentadantes
- 📱 **Interfaz Responsiva**: Diseño adaptable a diferentes dispositivos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React** 18.3.1 - Biblioteca de interfaz de usuario
- **Vite** 5.4.10 - Build tool y dev server
- **CSS3** - Estilos personalizados

### Backend
- **Node.js** - Entorno de ejecución
- **Express** 4.19.2 - Framework web
- **PostgreSQL** - Base de datos relacional
- **pg** 8.11.5 - Cliente PostgreSQL para Node.js
- **CORS** 2.8.5 - Manejo de peticiones cross-origin
- **dotenv** 16.4.5 - Variables de entorno

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn
- Git

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/carlow222/cuentadante_project.git
cd cuentadante_project
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd server
npm install
cd ..
```

### 4. Configurar la base de datos

#### Crear la base de datos en PostgreSQL:
```sql
CREATE DATABASE cuentadante_db;
```

#### Ejecutar el script de inicialización:
```bash
psql -U postgres -d cuentadante_db -f database/database_cuentadante.sql
```

### 5. Configurar variables de entorno

Crear archivo `server/.env`:
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cuentadante_db
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=3000
```

### 6. Iniciar el servidor backend
```bash
cd server
npm run dev
```

### 7. Iniciar el frontend (en otra terminal)
```bash
npm run dev
```

## 🔑 Credenciales de Acceso

**Usuario de prueba:**
- Email: `cuentadante@sistema.edu.co`
- Password: `cuentadante_1`

## 📁 Estructura del Proyecto

```
cuentadante_project/
├── src/                          # Código fuente del frontend
│   ├── components/              # Componentes React
│   │   ├── Dashboard.jsx       # Panel principal
│   │   ├── NuevaSolicitud.jsx  # Formulario de solicitudes
│   │   ├── SolicitudesPendientes.jsx
│   │   ├── Inventario.jsx
│   │   ├── BienesAsignados.jsx
│   │   ├── Historial.jsx
│   │   └── ...
│   ├── context/                # Context API
│   ├── App.jsx                 # Componente principal
│   └── App.css                 # Estilos globales
├── server/                      # Código del backend
│   ├── routes/                 # Rutas de la API
│   │   ├── auth.routes.js     # Autenticación
│   │   ├── cuentadante.routes.js
│   │   ├── assets.routes.js
│   │   └── requests.routes.js
│   ├── db.js                   # Configuración de PostgreSQL
│   ├── index.js                # Servidor Express
│   └── .env                    # Variables de entorno
├── database/                    # Scripts SQL
│   └── database_cuentadante.sql
└── README.md
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token
- `POST /api/auth/logout` - Cerrar sesión

### Solicitudes
- `GET /api/requests` - Obtener todas las solicitudes
- `POST /api/requests/create` - Crear nueva solicitud
- `PUT /api/requests/:id/approve` - Aprobar solicitud
- `PUT /api/requests/:id/reject` - Rechazar solicitud

### Bienes
- `GET /api/assets` - Obtener todos los bienes
- `PUT /api/assets/:id/return` - Procesar devolución

### Dashboard
- `GET /api/dashboard/stats` - Obtener estadísticas
- `GET /api/dashboard/expiring-assets` - Bienes próximos a vencer

### Movimientos
- `GET /api/movements` - Obtener historial de movimientos

## 🧪 Scripts de Prueba

El proyecto incluye varios scripts de prueba en `server/`:

```bash
# Probar conexión a la base de datos
node server/test-connection.js

# Probar autenticación
node server/test-login.js

# Probar todos los endpoints
node server/test-all-endpoints.js

# Probar creación de solicitudes
node server/test-create-request.js
```

## 📊 Base de Datos

### Tablas Principales

- **users** - Usuarios del sistema (cuentadantes)
- **assets** - Inventario de bienes
- **requests** - Solicitudes de bienes
- **asset_movements** - Historial de movimientos

### Datos de Ejemplo

El script de inicialización incluye:
- 1 usuario cuentadante
- 12 bienes de ejemplo
- 6 solicitudes de prueba
- Movimientos de ejemplo

## 🎨 Funcionalidades por Vista

### 📊 Dashboard
- Estadísticas en tiempo real
- Acciones rápidas
- Resumen del sistema

### ➕ Nueva Solicitud
- Formulario completo
- Selección de bienes disponibles
- Validación de campos

### 📋 Solicitudes Pendientes
- Lista de solicitudes por aprobar
- Filtros de búsqueda
- Aprobar/Rechazar con observaciones

### 📦 Inventario
- Lista completa de bienes
- Búsqueda y filtros
- Información detallada

### 📤 Bienes Asignados
- Control de bienes prestados
- Fechas de devolución
- Proceso de devolución

### 📚 Historial
- Consulta de solicitudes procesadas
- Filtros por estado
- Exportación de datos

### 🔄 Movimientos
- Registro de asignaciones
- Registro de devoluciones
- Trazabilidad completa

## 🔒 Seguridad

- Autenticación basada en tokens
- Validación de datos en backend
- Protección contra SQL injection
- Variables de entorno para credenciales

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

**Carlos Low**
- GitHub: [@carlow222](https://github.com/carlow222)

## 📞 Soporte

Para reportar problemas o solicitar nuevas funcionalidades, por favor abre un issue en GitHub.

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
