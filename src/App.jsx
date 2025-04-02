import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { MarketplaceProvider } from './contexts/MarketplaceContext'
import Navbar from './components/layout/Navbar.jsx'
import { useState, useEffect } from 'react'

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-medium">Loading...</h1>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <MarketplaceProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto py-8 px-4">
              <AppRoutes />
            </main>
          </div>
        </MarketplaceProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

