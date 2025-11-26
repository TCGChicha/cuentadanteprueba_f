'use client'

import { useBienes } from '@/contexts/BieneContext'
import { useAuth } from '@/contexts/AuthContext'
import { Home, ClipboardList, Package, Send, History, RefreshCw, User, Calendar, Monitor, BarChart3 } from 'lucide-react'

const Sidebar = () => {
  const { activeView, setActiveView, sidebarOpen } = useBienes()
  const { user } = useAuth()

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Panel de Control', 
      icon: Home,
      description: 'Resumen del sistema'
    },
    { 
      id: 'pendientes', 
      label: 'Solicitudes Pendientes', 
      icon: ClipboardList,
      description: 'Aprobar o rechazar solicitudes'
    },
    { 
      id: 'inventario', 
      label: 'Inventario de Bienes', 
      icon: Package,
      description: 'Gestionar bienes disponibles'
    },
    { 
      id: 'asignados', 
      label: 'Bienes Asignados', 
      icon: Send,
      description: 'Controlar bienes prestados'
    },
    { 
      id: 'historial', 
      label: 'Historial de Solicitudes', 
      icon: History,
      description: 'Ver solicitudes procesadas'
    },
    { 
      id: 'movimientos', 
      label: 'Movimientos de Bienes', 
      icon: RefreshCw,
      description: 'Registro de asignaciones y devoluciones'
    }
  ]

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <img 
              src="/logo.png" 
              alt="Logo SENA" 
              className="sena-logo-sidebar"
            />
          </div>
          <div className="logo-text">
            <h2>Sistema de Bienes</h2>
            <p>SENA - Cuentadante</p>
          </div>
        </div>
      </div>
      
      <div className="role-selector">
        <label>
          <User size={16} className="role-icon" />
          Usuario Autenticado:
        </label>
        <div className="user-card">
          <div className="user-avatar-sidebar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info-sidebar">
            <div className="user-name-sidebar">{user?.name}</div>
            <div className="user-email-sidebar">{user?.email}</div>
          </div>
        </div>
        <div className="role-display">
          <span className="role-badge">
            <BarChart3 size={16} />
            Cuentadante SENA
          </span>
        </div>
        <div className="role-description">
          <p>Gestión y control de bienes institucionales</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Funciones del Cuentadante</h3>
          {menuItems.map(item => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                onClick={() => setActiveView(item.id)}
                title={item.description}
              >
                <IconComponent size={20} className="nav-icon" />
                <div className="nav-content">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
              </button>
            )
          })}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="system-info">
          <div className="info-item">
            <Calendar size={16} className="info-icon" />
            <span className="info-text">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="info-item">
            <Monitor size={16} className="info-icon" />
            <span className="info-text">v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

