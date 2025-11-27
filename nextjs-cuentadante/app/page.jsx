'use client'

import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { BieneProvider } from '@/contexts/BieneContext'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import Login from '@/components/Login'
import Header from '@/components/Header'
import Loading from '@/components/Loading'

function AppContent() {
  const { user, loading, login, isAuthenticated } = useAuth()

  if (loading) {
    return <Loading message="Verificando autenticación..." />
  }

  if (!isAuthenticated()) {
    return <Login onLogin={login} />
  }

  return (
    <BieneProvider>
      <div className="app-with-header">
        <Header />
        <div className="app-body">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </BieneProvider>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
