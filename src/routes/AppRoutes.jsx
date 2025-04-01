import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CustomerDashboard from '../pages/customer/Dashboard';
import RequestForm from '../pages/customer/RequestForm';
import LiveBids from '../pages/customer/LiveBids';
import ProviderDashboard from '../pages/provider/Dashboard';
import PlaceBid from '../pages/provider/PlaceBid';  // Fixed import
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route
        path="/customer/dashboard"
        element={
          <PrivateRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </PrivateRoute>
        }
      />
      {/* ... other routes ... */}

      {/* Provider Routes */}
      <Route
        path="/provider/dashboard"
        element={
          <PrivateRoute allowedRoles={['provider']}>
            <ProviderDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/provider/requests/:requestId/bid"
        element={
          <PrivateRoute allowedRoles={['provider']}>
            <PlaceBid />
          </PrivateRoute>
        }
      />

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}