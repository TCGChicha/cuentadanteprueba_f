# Sistema de Gestión de Bienes - SENA (Next.js)

Plataforma integral para el control y administración de activos institucionales del SENA.

## Características

- ✅ Next.js 14 con App Router
- ✅ API Routes integradas (sin servidor Express separado)
- ✅ Conexión directa a PostgreSQL
- ✅ Autenticación de usuarios
- ✅ Gestión de inventario de bienes
- ✅ Sistema de solicitudes y aprobaciones
- ✅ Historial de movimientos
- ✅ Dashboard con estadísticas
- ✅ Diseño responsive con colores corporativos SENA

## Requisitos Previos

- Node.js 18+ instalado
- PostgreSQL instalado y corriendo
- Base de datos "cuentadante" configurada

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
Editar el archivo `.env.local` con tus credenciales de PostgreSQL:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=cuentadante
DB_PASSWORD=tu_password
DB_PORT=5432
```

3. Asegurarse de que la base de datos esté creada y poblada con las tablas necesarias.

## Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Ejecutar en Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
nextjs-cuentadante/
├── app/
│   ├── api/              # API Routes (reemplazan el servidor Express)
│   │   ├── auth/         # Autenticación
│   │   ├── requests/     # Solicitudes
│   │   ├── assets/       # Bienes
│   │   ├── movements/    # Movimientos
│   │   ├── cereals/      # Cereales
│   │   └── users/        # Usuarios
│   ├── layout.jsx        # Layout principal
│   ├── page.jsx          # Página principal
│   └── globals.css       # Estilos globales
├── components/           # Componentes React
├── contexts/             # Contextos de React
├── lib/                  # Utilidades
│   └── db.js            # Conexión a PostgreSQL
└── public/              # Archivos estáticos

```

## Credenciales de Prueba

- Email: `cuentadante@sistema.edu.co`
- Password: `cuentadante_1`

## Diferencias con la Versión Vite

- ✅ Servidor integrado (no necesita servidor Express separado)
- ✅ API Routes de Next.js en lugar de rutas Express
- ✅ Optimización automática de imágenes
- ✅ Server-side rendering disponible
- ✅ Mejor rendimiento en producción
- ✅ Deploy más sencillo (Vercel, etc.)

## Tecnologías

- Next.js 14
- React 18
- PostgreSQL
- Lucide React (iconos)
- CSS Modules

## Soporte

Para problemas o preguntas, contactar al equipo de desarrollo.
