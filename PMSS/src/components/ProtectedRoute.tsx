// import { Navigate } from "react-router-dom"
// import { useAuth } from "@/contexts/useAuth"

// export default function ProtectedRoute({ children, role }: any) {
//   const { user } = useAuth()

//   if (!user) {
//     return <Navigate to="/" replace />
//   }

//   if (role && user.role !== role) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// export default function ProtectedRoute({ children }: any) {
//   const { user } = useAuth()
//   const token = localStorage.getItem("token");

//   if (!user) {
//     return <Navigate to="/" replace />
//   }

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   return children
// }

// import { Navigate } from "react-router-dom"

// export default function ProtectedRoute({
//   children
// }: any) {

//   const token = localStorage.getItem("token")

//   if (!token) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// import { Navigate } from "react-router-dom"
// import { useAuth } from "@/contexts/useAuth"

// type Props = {
//   children: React.ReactNode
//   allowedRoles?: string[]
// }

// export default function ProtectedRoute({
//   children,
//   allowedRoles
// }: Props) {

//   const { user } = useAuth()

//   const token = localStorage.getItem("token")

//   if (!token || !user) {
//     return <Navigate to="/" replace />
//   }

//   if (
//     allowedRoles &&
//     !allowedRoles.includes(user.role)
//   ) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

import { Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/useAuth"

type Props = {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({
  children,
  allowedRoles
}: Props) {

  const {
    user,
    authLoading
  } = useAuth()

  const token = localStorage.getItem("token")

  // WAIT until auth finishes loading
  if (authLoading) {
    return <div>Loading...</div>
  }

  if (!token || !user) {
    return <Navigate to="/" replace />
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />
  }

  return children
}