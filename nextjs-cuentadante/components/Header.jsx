'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useBienes } from '@/contexts/BieneContext'
import { LogOut, Menu } from 'lucide-react'

const Header = () => {
  const { user, logout } = useAuth()
  const { sidebarOpen, setSidebarOpen } = useBienes()

  const handleLogout = () => {
    if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
      logout()
    }
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="hamburger-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <div className="header-logo">
            <img 
              src="/logo-blanco.png" 
              alt="Logo SENA" 
              className="sena-logo-header"
            />
          </div>
          <div className="header-text">
            <h1>Sistema de Gestión de Bienes</h1>
            <p>SENA - Cuentadante</p>
          </div>
        </div>
        
        <div className="header-user">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="logout-button"
            title="Cerrar sesión"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
