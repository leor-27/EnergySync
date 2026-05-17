// import { createContext, useContext, useState } from "react"

// type Role = "admin" | "superadmin"

// type User = {
//   username: string
//   email: string
//   password: string
//   role: Role
// }

// type AuthContextType = {
//   user: User | null
//   login: (username: string, password: string) => User | null
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | null>(null)

// const defaultUsers: User[] = [
//   { username: "admin", email: "admin@gmail.com", password: "password", role: "admin" },
//   { username: "super", email: "superadmin@gmail.com", password: "password", role: "superadmin" },
// ]

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)

//   const login = (username: string, password: string) => {
//     const found = defaultUsers.find(
//       (u) => (u.username === username || u.email === username) && u.password === password
//     )

//     if (found) {
//       setUser(found)
//       return found
//     }

//     return null
//   }

//   const logout = () => setUser(null)

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext)
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
//   return ctx
// }

// import { createContext, useContext, useEffect, useState } from "react"

// type User = {
//   admin_id: number
//   username: string
//   email: string
//   role: "admin" | "superadmin"
// }

// type AuthContextType = {
//   user: User | null
//   setUser: React.Dispatch<React.SetStateAction<User | null>>
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | null>(null)

// export function AuthProvider({
//   children
// }: {
//   children: React.ReactNode
// }) {

//   const [user, setUser] = useState<User | null>(null)

//   useEffect(() => {

//     const storedUser = localStorage.getItem("user")

//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }

//   }, [])

//   const logout = () => {

//     localStorage.removeItem("token")
//     localStorage.removeItem("user")

//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {

//   const ctx = useContext(AuthContext)

//   if (!ctx) {
//     throw new Error("useAuth must be used inside AuthProvider")
//   }

//   return ctx
// }

// import { createContext, useContext, useEffect, useState } from "react"

// type User = {
//   admin_ID: number
//   username: string
//   email: string
//   first_name: string
//   last_name: string
//   role: string
// }

// type AuthContextType = {
//   user: User | null
//   setUser: React.Dispatch<React.SetStateAction<User | null>>
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | null>(null)

// export function AuthProvider({
//   children
// }: {
//   children: React.ReactNode
// }) {

//   const [user, setUser] = useState<User | null>(null)

//   useEffect(() => {

//     const storedUser = localStorage.getItem("user")

//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }

//   }, [])

//   const logout = () => {

//     localStorage.removeItem("token")
//     localStorage.removeItem("user")

//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {

//   const ctx = useContext(AuthContext)

//   if (!ctx) {
//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     )
//   }

//   return ctx
// }

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

type User = {
  admin_ID: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  image_path?: string | null
  stage_name?: string | null
  dj_ID?: number | null
}

type AuthContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  logout: () => void
  authLoading: boolean
}

const AuthContext =
  createContext<AuthContextType | null>(null)

export function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [user, setUser] = useState<User | null>(null)

  const [authLoading, setAuthLoading] =
    useState(true)

  useEffect(() => {

    const validateToken = async () => {
  const token = localStorage.getItem("token")

  if (!token) {
    setAuthLoading(false)
    return
  }

  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await res.json()

    if (data.success) {
      setUser(data.user)
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )
    } else {
      logout()
    }

  } catch {
    logout()
  } finally {
    setAuthLoading(false)
  }
}

validateToken();

    const storedUser =
      localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setAuthLoading(false)

  }, [])

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        authLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {

  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    )
  }

  return ctx
}