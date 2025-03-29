import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthContext'
import { MarketplaceProvider } from './contexts/MarketplaceContext'
import Navbar from 'src/components/layout/Navbar'

function App() {
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