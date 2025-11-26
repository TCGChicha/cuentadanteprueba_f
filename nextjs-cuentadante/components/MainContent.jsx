'use client'

import { useBienes } from '@/contexts/BieneContext'
import Dashboard from '@/components/Dashboard'
import SolicitudesPendientes from '@/components/SolicitudesPendientes'
import NuevaSolicitud from '@/components/NuevaSolicitud'
import Historial from '@/components/Historial'
import Inventario from '@/components/Inventario'
import BienesAsignados from '@/components/BienesAsignados'
import MovimientosBienes from '@/components/MovimientosBienes'
import { Home } from 'lucide-react'

const MainContent = () => {
  const { activeView } = useBienes()

  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return { title: 'Panel de Control', description: 'Resumen general del sistema de gestión de bienes' }
      case 'nueva-solicitud':
        return { title: 'Nueva Solicitud', description: 'Crear una nueva solicitud de bien' }
      case 'pendientes':
        return { title: 'Solicitudes Pendientes', description: 'Aprobar o rechazar solicitudes de bienes' }
      case 'inventario':
        return { title: 'Inventario de Bienes',  description: 'Gestionar bienes disponibles para asignación' }
      case 'asignados':
        return { title: 'Bienes Asignados', description: 'Controlar bienes actualmente prestados' }
      case 'historial':
        return { title: 'Historial de Solicitudes', description: 'Consultar solicitudes procesadas anteriormente' }
      case 'movimientos':
        return { title: 'Movimientos de Bienes',  description: 'Registro de asignaciones y devoluciones' }
      default:
        return { title: 'Panel de Control',  description: 'Resumen general del sistema de gestión de bienes' }
    }
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'nueva-solicitud':
        return <NuevaSolicitud />
      case 'pendientes':
        return <SolicitudesPendientes />
      case 'inventario':
        return <Inventario />
      case 'asignados':
        return <BienesAsignados />
      case 'historial':
        return <Historial />
      case 'movimientos':
        return <MovimientosBienes />
      default:
        return <Dashboard />
    }
  }

  const viewInfo = getViewTitle()

  return (
    <main className="main-content">
      <div className="content-header">
        <div className="breadcrumb">
          <span className="breadcrumb-item">
            <Home size={14} style={{ marginRight: '4px' }} />
            Inicio
          </span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item active">
            {viewInfo.title}
          </span>
        </div>
        <div className="view-info">
          <h1 className="view-title">
            {viewInfo.title}
          </h1>
          <p className="view-description">{viewInfo.description}</p>
        </div>
      </div>
      
      <div className="content-body">
        {renderView()}
      </div>
    </main>
  )
}

export default MainContent
