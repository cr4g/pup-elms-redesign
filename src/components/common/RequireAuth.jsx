import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

// Kapag hindi naka-login, ibabalik sa /login
export default function RequireAuth() {
  const { user } = useApp()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}