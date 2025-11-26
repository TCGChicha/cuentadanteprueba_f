import './globals.css'

export const metadata = {
  title: 'Sistema de Gestión de Bienes - SENA',
  description: 'Plataforma integral para el control y administración de activos institucionales',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
