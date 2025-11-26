'use client'

import { useState, useEffect } from 'react'
import { useBienes } from '@/contexts/BieneContext'

const NuevaSolicitud = () => {
  const { setActiveView } = useBienes()
  const [bienes, setBienes] = useState([])
  const [formData, setFormData] = useState({
    solicitante: '',
    bienId: '',
    motivo: '',
    prioridad: 'Media',
    expected_return_date: ''
  })

  useEffect(() => {
    fetchBienes()
  }, [])

  const fetchBienes = async () => {
    try {
      const response = await fetch('/api/assets')
      const data = await response.json()
      // Filtrar solo bienes disponibles
      const availableAssets = data.filter(asset => asset.status === 'Available')
      setBienes(availableAssets)
    } catch (error) {
      console.error('Error fetching assets:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicant_name: formData.solicitante,
          asset_id: parseInt(formData.bienId),
          reason: formData.motivo,
          priority: formData.prioridad,
          expected_return_date: formData.expected_return_date
        })
      })

      if (response.ok) {
        alert('Solicitud creada exitosamente')
        setFormData({
          solicitante: '',
          bienId: '',
          motivo: '',
          prioridad: 'Media',
          expected_return_date: ''
        })
        setActiveView('pendientes')
      } else {
        const error = await response.json()
        alert('Error: ' + error.error)
      }
    } catch (error) {
      console.error('Error creating request:', error)
      alert('Error al crear la solicitud')
    }
  }

  const selectedBien = bienes.find(b => b.id === parseInt(formData.bienId))

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>➕ Nueva Solicitud</h2>
        <p className="view-description">
          Complete el formulario para crear una nueva solicitud de bien
        </p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="modern-form">
          <div className="form-group">
            <label htmlFor="solicitante" className="form-label">
              👤 Solicitante
            </label>
            <input
              type="text"
              id="solicitante"
              name="solicitante"
              value={formData.solicitante}
              onChange={handleChange}
              className="form-input"
              placeholder="Ingrese el nombre del solicitante"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bienId" className="form-label">
              📦 Bien a solicitar
            </label>
            <select
              id="bienId"
              name="bienId"
              value={formData.bienId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione un bien</option>
              {bienes.map(bien => (
                <option key={bien.id} value={bien.id}>
                  {bien.name} - S/N: {bien.serial_number} ({bien.brand} {bien.model})
                </option>
              ))}
            </select>
          </div>

          {selectedBien && (
            <div className="bien-info">
              <h4>📋 Información del bien seleccionado:</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Número de Serie:</span>
                  <span className="info-value">{selectedBien.serial_number}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Número de Inventario:</span>
                  <span className="info-value">{selectedBien.inventory_number}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Marca/Modelo:</span>
                  <span className="info-value">{selectedBien.brand} {selectedBien.model}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ubicación:</span>
                  <span className="info-value">{selectedBien.location || 'No especificada'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="expected_return_date" className="form-label">
              📅 Fecha de devolución esperada
            </label>
            <input
              type="date"
              id="expected_return_date"
              name="expected_return_date"
              value={formData.expected_return_date}
              onChange={handleChange}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prioridad" className="form-label">
              ⚡ Prioridad de la solicitud
            </label>
            <select
              id="prioridad"
              name="prioridad"
              value={formData.prioridad}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Leve">🟢 Leve - No urgente</option>
              <option value="Media">🟡 Media - Importancia normal</option>
              <option value="Importante">🔴 Importante - Urgente</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="motivo" className="form-label">
              📝 Motivo de la solicitud
            </label>
            <textarea
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describa el motivo de la solicitud..."
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!selectedBien}
            >
              📤 Enviar Solicitud
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setFormData({
                solicitante: '',
                bienId: '',
                motivo: '',
                prioridad: 'Media',
                expected_return_date: ''
              })}
            >
              🔄 Limpiar Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NuevaSolicitud
