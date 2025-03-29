import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(user.user_type)) {
    return <Navigate to={user.user_type === 'customer' ? '/customer/dashboard' : '/provider/dashboard'} replace />
  }

  return children
}