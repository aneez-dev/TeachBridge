import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useApp } from '../context/AppContext'

export function ProtectedRoute({
  children,
  allow,
}: {
  children: ReactNode
  allow: 'teacher' | 'student'
}) {
  const { auth } = useApp()
  if (!auth.role) return <Navigate to="/login" replace />
  if (auth.role !== allow) {
    // Logged in, but wrong role for this route — send them to their own dashboard.
    return <Navigate to={auth.role === 'teacher' ? '/' : '/student'} replace />
  }
  return <>{children}</>
}
