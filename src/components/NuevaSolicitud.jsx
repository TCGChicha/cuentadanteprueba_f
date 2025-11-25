import { useState, useEffect } from 'react'
import Loading from './Loading'

const NuevaSolicitud = ({ onClose, onSuccess }) => {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_position: '',
    asset_id: '',
    reason: '',
    priority: 'Media',
    expected_return_date: ''
  })

  useEffect(() => {
    fetchAvailableAssets()
  }, [])

  const fetchAvailableAssets = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/assets')
      const data = await response.json()
      // Filtrar solo bienes disponibles
      const available = data.filter(asset => asset.status === 'Available')
      setAssets(available)
    } catch (error) {
      console.error('Error fetching assets:', error)
    } finally {
      setLoading(false)
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
    setSubmitting(true)

    try {
      const response = await fetch('http://localhost:3000/api/requests/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('✅ Solicitud creada exitosamente')
        if (onSuccess) onSuccess()
        if (onClose) onClose()
      } else {
        const error = await response.json()
        alert('❌ Error: ' + error.error)
      }
    } catch (error) {
      console.error('Error creating request:', error)
      alert('❌ Error al crear la solicitud')
    } finally {
      setSubmitting(false)
    }
  }

  const selectedAsset = assets.find(a => a.id === parseInt(formData.asset_id))

  if (loading) {
    return <Loading message="Cargando bienes disponibles..." />
  }

  return (
    <div className="view-container">
      <div className="form-card">
        <div className="form-header">
          <h2>➕ Nueva Solicitud de Bien</h2>
          <p>Complete el formulario para solicitar un bien del inventario</p>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          {/* Información del Solicitante */}
          <div className="form-section">
            <h3 className="section-title">👤 Información del Solicitante</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="applicant_name">
                Nombre Completo del Solicitante *
              </label>
              <input
                type="text"
                id="applicant_name"
                name="applicant_name"
                value={formData.applicant_name}
                onChange={handleChange}
                className="form-input"
                placeholder="Ej: Juan Pérez García"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="applicant_position">
                Cargo o Posición
              </label>
              <input
                type="text"
                id="applicant_position"
                name="applicant_position"
                value={formData.applicant_position}
                onChange={handleChange}
                className="form-input"
                placeholder="Ej: Instructor de Programación"
              />
            </div>
          </div>

          {/* Selección del Bien */}
          <div className="form-section">
            <h3 className="section-title">📦 Selección del Bien</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="asset_id">
                Bien Solicitado *
              </label>
              <select
                id="asset_id"
                name="asset_id"
                value={formData.asset_id}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">-- Seleccione un bien --</option>
                {assets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} - {asset.brand} {asset.model} (S/N: {asset.serial_number})
                  </option>
                ))}
              </select>
              {assets.length === 0 && (
                <p className="text-sm text-red-600 mt-2">
                  ⚠️ No hay bienes disponibles en este momento
                </p>
              )}
            </div>

            {/* Información del bien seleccionado */}
            {selectedAsset && (
              <div className="asset-info-card">
                <h4>📋 Información del Bien Seleccionado</h4>
                <div className="asset-details">
                  <div className="detail-item">
                    <span className="detail-label">Nombre:</span>
                    <span className="detail-value">{selectedAsset.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Marca/Modelo:</span>
                    <span className="detail-value">{selectedAsset.brand} {selectedAsset.model}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Categoría:</span>
                    <span className="detail-value">{selectedAsset.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ubicación:</span>
                    <span className="detail-value">{selectedAsset.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Condición:</span>
                    <span className="detail-value">{selectedAsset.condition}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Número de Serie:</span>
                    <span className="detail-value font-mono">{selectedAsset.serial_number}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Número de Inventario:</span>
                    <span className="detail-value font-mono">{selectedAsset.inventory_number}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Detalles de la Solicitud */}
          <div className="form-section">
            <h3 className="section-title">📝 Detalles de la Solicitud</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="reason">
                Motivo de la Solicitud *
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Describa detalladamente el motivo por el cual necesita este bien..."
                rows="4"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                💡 Sea específico: mencione el proyecto, curso, evento o actividad para la cual necesita el bien
              </p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="priority">
                  Prioridad *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="Leve">🟢 Leve - No urgente</option>
                  <option value="Media">🟡 Media - Normal</option>
                  <option value="Importante">🟠 Importante - Prioridad alta</option>
                  <option value="Alta">🔴 Alta - Urgente</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="expected_return_date">
                  Fecha de Devolución Esperada *
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
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || assets.length === 0}
            >
              {submitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Enviando solicitud...
                </>
              ) : (
                <>
                  ✅ Enviar Solicitud
                </>
              )}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={submitting}
              >
                🚫 Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default NuevaSolicitud
