'use client'

import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        onLogin(data.user, data.token, rememberMe)
      } else {
        setError(data.error || 'Credenciales inválidas')
      }
    } catch (error) {
      console.error('Error en login:', error)
      setError('Error de conexión. Verifique que el servidor esté funcionando.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <h1 className="brand-title">SENA</h1>
          <h2 className="brand-subtitle">Sistema de Gestión de Bienes</h2>
          <p className="brand-description">
            Plataforma integral para el control y administración de activos institucionales
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="login-box-header">
            <h3>Iniciar Sesión</h3>
            <p>Ingresa tus credenciales para continuar</p>
          </div>

          {error && (
            <div className="login-alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-box-form">
            <div className="login-form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="usuario@sena.edu.co"
                required
                disabled={loading}
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <div className="login-options">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Recordarme</span>
              </label>
              <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>

            <button 
              type="submit" 
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <div className="login-demo">
            <button 
              type="button"
              onClick={() => {
                setFormData({
                  email: 'cuentadante@sistema.edu.co',
                  password: 'cuentadante_1'
                })
              }}
              className="demo-btn"
              disabled={loading}
            >
              ¿Necesitas ayuda? Contacta soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

