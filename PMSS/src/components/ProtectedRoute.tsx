import { Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/useAuth"

export default function ProtectedRoute({ children, role }: any) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}